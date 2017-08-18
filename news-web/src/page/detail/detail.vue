<template>
    <div id="detail" :title='title'>
        <my-header fixed :title='title' v-goTop:click='true'>
            <a slot="left" class="back-black" @click.stop='$router.go(-1)'></a>
            <a slot="right" class="menu" @click.stop='$refs.share.toggle()'></a>
        </my-header>
        
        <div class="content">
            <div class="container" v-swiper:swiperRight='true'>

                <!-- 文章 -->
                <my-article  :json='currentArticle'></my-article>

                <!-- 标签 -->
                <tags  v-if='currentArticle.infotags' :json='currentArticle.infotags'></tags>
                
                <!-- 分割线 -->
                <div class="bg_line" v-if='currentArticle.comment'></div>
                <!-- 热点评论 -->
                <div class="comment-hot" v-if='currentArticle.comment'>
                    <div class="comment_title">
                        <div class="Line">
                            <div class="title">用户热评</div>
                        </div>
                    </div>
                    <comment-item v-for='item in currentArticle.comment' :itemJson='item' :key='item'></comment-item>
                    <a href='http://m.toutiaojk.com/guide.html' class="comment_more" v-if="currentArticle.plnum > 0 ">下载健康头条阅读全部{{currentArticle.plnum}}条评论<i class="icon-detail"></i></a>
                </div>

                <!-- 分割线 -->
                <div class="bg_line"></div>

                <!--  推荐 -->
                <recommend  :json='recommend'></recommend>
                
                <!-- 下载 -->
                <a class="downLoad" href='http://m.toutiaojk.com/guide.html'>都翻到这儿了，下载个头条呗~</a>

                <loading :visible='loading'></loading>

                <error fixed :visible='error' :method='init'></error>
            </div>
        </div>
        <!-- 分享 -->
        <share ref="share"></share>
        <!-- 加载 -->
        <loading :visible='loading'></loading>
    </div>
</template>
<script>
import myArticle from './components/article'
import tags from './components/tags'
import recommend from './components/recommend'
import share from './components/share'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name:'detail',
    components: { myArticle, tags, recommend, share },
    data() {
        return {
            id: null,
            classid: null,
            datafrom: null,
            title: '健康头条',
            loading: true, 
            error: false,
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexColumn'
        ]),
        ...mapGetters('detail', [
            'currentArticle',
            'recommend',
            'localtion'
        ])
    },
    methods: {
        ...mapActions('index', [
            'get_indexColumn_data',
        ]),
        ...mapMutations('detail', [
            'set_id',
            'set_currentArticle',
            'set_localtion'
        ]),
        ...mapActions('detail', [
            'get_Article_data',
            'get_Recommend_data',
        ]),
        async init(){
            this.classid = this.$route.query.classid;
            this.id = this.$route.query.id;
            this.datafrom = this.$route.query.datafrom;
            this.set_id(this.id)
            $("#detail .container").scrollTop(0);
            if (!(this.indexColumn.length > 1 )) {
                await this.get_indexColumn_data();
            }
            let index = this.indexColumn.findIndex(n => n.classid == this.classid);
            if (index > -1) {
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
            this.get_Article(); // 获取 文章数据
            this.get_Recommend(); // 获取 推荐数据
            this.visitCollect(); // 浏览数据统计
        },
        get_Article() {
            this.loading = true;
            this.get_Article_data({'id': this.id, 'datafrom': this.datafrom})
            .then(res => {
                if (res) {
                    this.set_currentArticle(res)
                    this.loading = false
                }
                this.error = false
            })
            .catch(err => {
                console.log(err)
                this.error = true
                this.loading = false
            })
        },
        get_Recommend() {
            this.get_Recommend_data({'classid': this.classid, 'id': this.id})
        },
        visitCollect() {
            $.ajax({
                url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
                type: 'GET'
            })
        },
        handleLocaltion(type) {
            if (type === 'get') {
                if (this.localtion && this.localtion[this.id]) {
                    $('#detail .container').scrollTop(this.localtion[this.id])
                }
            } else if (type === 'set') {
                let scrollTop = $('#detail .container').scrollTop()
                this.localtion[this.id] = scrollTop
                this.set_localtion(this.localtion)
            }
        },
    },
    watch: {
        $route(val) {
            if (val.query.id) {
                this.init()
            }
        }
    },
    mounted() {
        this.init();
        this.handleLocaltion('get')
    },
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        next()
    }
}
</script>
<style scoped lang='stylus'>
#detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f8f8f8;
    header {
        background: #fff;
        color: #333;
        font-size: 16px;
        .menu {
            background: url(../../assets/img/menu.png) no-repeat center center;
            background-size: 20px;
        }
    }
    .downLoad {
        display: block;
        width: 100%;
        height: 36px;
        line-height: 36px;
        background: #00939c;
        color: #fff;
        text-align: center;
        font-size: 14px;
        text-decoration: none;
    }
    .comment-hot {
        padding: 0.533rem 0 0;
        background: #f9f9f9;
        .comment_title {
            margin-bottom: 0.4rem;
            position: relative;
            .Line {
                position: relative;
                width: 2.8rem;
                margin: 0 auto;
                text-align: center &:before {
                    content: "";
                    border-top: 2px solid #aaa;
                    display: block;
                    position: absolute;
                    width: 0.4rem;
                    top: 50%;
                    left: 0
                }
                &:after {
                    content: "";
                    border-top: 2px solid #aaa;
                    display: block;
                    position: absolute;
                    width: 0.4rem;
                    top: 50%;
                    right: 0
                }
            }
            .title {
                font-size: 14px;
                font-weight: bold;
            }
        }
        .comment_more {
            display: block;
            text-align: center;
            font-size: 12px;
            color: #00939c;
            padding: 0.533rem 0;
            vertical-align: middle;
            i {
                display: inline-block;
                vertical-align: middle;
                margin-left: 2px;
                margin-top: -2px;
                padding: 0 2px;
                font-size: 12px;
            }
        }
    }
    .bg_line {
        height: 0.1333rem;
        background: #eee;
    }
}
</style>
