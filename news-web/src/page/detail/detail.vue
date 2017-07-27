<template>
    <div id="detail">
        <my-header fixed>
            <a slot="left" @click.stop='$router.go(-1)'><i class="icon-back"></i></a>
            <a slot="mid" v-goTop:click='true'>{{title}}</a>
            <a slot="right" @click.stop='$refs.share.toggle()'><i class="icon-menu"></i></a>
        </my-header>
        
        <div class="content">
            <div class="container" v-swiper:swiperRight='true'>
                <!-- 文章 -->
                <my-article  :json='currentArticle'></my-article>
                <!-- 标签 -->
                <tags  v-if='currentArticle.infotags' :json='currentArticle.infotags'></tags>
                <!--  推荐 -->
                <recommend  :json='recommend'></recommend>
                <!-- 下载 -->
                <a class="downLoad" href='../toutiaojk.apk'>都翻到这儿了，就下载个头条呗~</a>

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
            this.get_Article_data(this.id)
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
        background: #fdfdfd;
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        i {
            font-size: 20px;
            vertical-align: middle;
        }
    }
    .content {
        width: 100%;
        height: 100%;
        padding-top: 44px;
        position: relative;
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }
        .downLoad {
            display: block;
            width: 100%;
            height: 36px;
            line-height: 36px;
            background: #f67373;
            color: #fff;
            text-align: center;
            font-size: 14px;
            text-decoration: none;
        }
    }
}
</style>
