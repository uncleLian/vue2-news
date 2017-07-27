<template>
    <div id="detail">

        <my-header fixed :title='title' v-goTop:click='true'>
            <a slot="left" class="back-black" @click.stop='$router.go(-1)'></a>
            <a slot="right" class="menu" @click.stop='$refs.share.toggle()'></a>
        </my-header>

        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container" v-swiper:swiperRight='true' v-swiper:all="'blur'">
                <!-- 文章 -->
                <my-article :json='currentArticle'></my-article>

                <!-- 标签 -->
                <tags v-if='currentArticle.infotags' :json='currentArticle.infotags'></tags>

                <!-- 喜欢 -->
                <div class="article_favorite">
                    <like :json="currentArticle"></like>
                    <collect btn :json="currentArticle"></collect>
                </div>

                <!-- 热点评论 -->
                <div class="comment-hot" v-if='currentArticle.comment'>
                    <div class="comment_title">
                        <div class="Line">
                            <div class="title">热点评论</div>
                            <div class="subtitle">comments</div>
                        </div>
                    </div>
                    <comment-item comment='remark' type='all' v-for='item in currentArticle.comment' :itemJson='item' :key='item' @click.native.stop="$refs.reply.open(item)" ></comment-item>

                    <div class="comment_more" v-if='currentArticle.plnum > 2 '@click.stop="$refs.comment.open()">共{{currentArticle.plnum}}条评论<i>></i></div>
                </div>

                <!--  推荐 -->
                <recommend :json='recommend'></recommend>

                <loading :visible='loading'></loading>

                <error fixed :visible='error' :method='init'></error>
            </div>
        </div>
        
        <!-- 底部工具条 -->
            <tool :ele='$refs.comment' comment='remark' icon @publishStatus='publishCallBack'>
                <template slot='tool_btn'>
                    <a class="comment_btn" @click.stop="$refs.comment.open()">
                        <span class="comment_num" v-if="currentArticle.plnum > 0">{{currentArticle.plnum}}</span>
                    </a>
                    <collect icon :json='currentArticle'></collect>
                    <a class="share_btn" @click.stop='$refs.share.toggle()'></a>
                </template>
            </tool>
                
        <!-- 评论页 -->
        <comment ref='comment'></comment>
        
        <!-- 回复页 -->
        <reply ref="reply"></reply>

        <!-- 分享 -->
        <share :detailJson='currentArticle' ref="share"></share>

    </div>
</template>
<script>
import myArticle from './components/article'
import tags from './components/tags'
import recommend from './components/recommend'
import share from './components/share'
import like from './components/like'
import collect from './components/collect'
import comment from './components/comment'
import tool from './components/tool'
import reply from './components/reply'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'detail',
    components: {
        myArticle,
        tags,
        recommend,
        share,
        like,
        collect,
        comment,
        tool,
        reply
    },
    data() {
        return {
            id: null,
            classid: null,
            from: null,
            title: '健康头条',
            enterTime: '',
            loading: true,
            error: false,
            focus: false,
            inputVal: '',
            keepInputVal: '',
            replyJson: {}
        }
    },
    computed: {
        ...mapGetters([
            'userid'
        ]),
        ...mapGetters('index', [
            'indexColumn'
        ]),
        ...mapGetters('detail', [
            'listArticle',
            'currentArticle',
            'historyArticle',
            'datafrom',
            'recommend',
            'localtion'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_id',
            'set_datafrom',
            'set_listArticle',
            'set_currentArticle',
            'set_historyArticle',
            'set_localtion'
        ]),
        ...mapActions('index', [
            'get_indexColumn_data'
        ]),
        ...mapActions('detail', [
            'get_Article_data',
            'get_Recommend_data',
            'send_user_data'
        ]),
        async init() {
            this.classid = this.$route.query.classid
            this.id = this.$route.query.id
            this.from = this.$route.query.datafrom
            this.set_id(this.id)
            this.set_datafrom(this.from)
            $('#detail .container').scrollTop(0)
            if (!(this.indexColumn.length > 1)) {
                await this.get_indexColumn_data()
            }
            let index = this.indexColumn.findIndex(n => n.classid === this.classid)
            if (index > -1) {
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
            this.get_Article()
            this.get_Recommend()
        },
        get_Article() {
            this.loading = true
            this.enterTime = new Date().getTime()
            this.get_Article_data({'id': this.id, 'datafrom': this.from})
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
            this.get_Recommend_data({'classid': this.classid, 'id': this.id, 'datafrom': this.from})
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
        publishCallBack() {
            this.currentArticle.plnum++
            this.set_historyArticle(this.historyArticle)
            if (this.listArticle) {
                this.listArticle.plnum++
                this.set_listArticle(this.listArticle)
            }
        }
    },
    watch: {
        $route(val) {
            if (val.query.id) {
                this.init()
            }
        }
    },
    mounted() {
        this.init()
        this.handleLocaltion('get')
    },
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        this.send_user_data(this.enterTime)
        next()
    }
}
</script>
<style scoped lang='stylus'>
#detail .content.isIOS {
    padding-top: 64px;
}

#detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    header {
        background: #fdfdfd;
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        .menu{
            background: url(../../assets/img/menu.png) no-repeat center center;
            background-size: 20px;
        }
    }
    .content {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 44px;
        padding-bottom: 48px;
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }
        .article_favorite{
            text-align: center;
            margin: 30px 0;
        }
        .comment-hot {
            margin: 40px 0 20px;
            .comment_title {
                margin-bottom: 15px;
                position: relative;
                .Line {
                    position: relative;
                    width: 6.25rem;
                    margin: 0 auto;
                    text-align: center 
                    &:before {
                        content: "";
                        border-top: 1px solid #ccc;
                        display: block;
                        position: absolute;
                        width: 1.25rem;
                        top: 50%;
                        left: 0
                    }
                    &:after {
                        content: "";
                        border-top: 1px solid #ccc;
                        display: block;
                        position: absolute;
                        width: 1.25rem;
                        top: 50%;
                        right: 0
                    }
                }
                .title {
                    font-size: 18px;
                    font-weight: bold;
                    letter-spacing: 4px;
                }
                .subtitle {
                    font-size: 12px;
                    letter-spacing: 4px;
                    color: #666;
                }
            }
            .comment_more{
                text-align: center;
                font-size: 12px;
                i{
                    background: #666;
                    color: #fff;
                    padding: 0 2px;
                }
            }
        }
    }
}
</style>
<style scoped>
.comment_btn{
    background: url(~@/assets/img/comment.png) no-repeat center center;
    background-size: 18.5px;
}
.share_btn{
    background: url(~@/assets/img/share.png) no-repeat center center;
    background-size: 18.5px;
}
</style>
