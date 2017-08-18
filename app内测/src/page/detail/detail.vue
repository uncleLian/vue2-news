<template>
    <div id="detail">
        <!-- header -->
        <my-header fixed :title='title' v-goTop:click='true'>
            <a slot="left" class="back-black" @click.stop='$router.go(-1)'></a>
            <a slot="right" class="menu" @click.stop='$refs.share.toggle()'></a>
        </my-header>
        <!-- content -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container" v-swiper:swiperRight='true' v-swiper:all="'blur'">
                <!-- 文章 -->
                <my-article :json='currentArticle'></my-article>
                <!-- 标签 -->
                <my-tags v-if='currentArticle.infotags' :json='currentArticle.infotags'></my-tags>
                <!-- 喜欢 -->
                <div class="article_favorite">
                    <like :json="currentArticle"></like>
                    <collect btn :json="currentArticle"></collect>
                </div>

                <!-- 分割线 -->
                <div class="bg_line" v-if='currentArticle.comment'></div>
                <!-- 热点评论 -->
                <div class="comment-hot" v-if='currentArticle.comment'>
                    <div class="comment_title">
                        <div class="Line">
                            <div class="title">用户热评</div>
                        </div>
                    </div>
                    <comment-item layout='topFooter' comment='remark' type='all' v-for='item in currentArticle.comment' :itemJson='item' :key='item' @click.native.stop='$refs.comment.open()'></comment-item>
                    <div class="comment_more" v-if="currentArticle.plnum > 0 " @click.stop="$refs.comment.open()">全部{{currentArticle.plnum}}条评论<i class="icon-detail"></i></div>
                </div>

                <!-- 分割线 -->
                <div class="bg_line"></div>
                <!--  推荐 -->
                <my-recommend :json='currentArticle.recommend'></my-recommend>
                <loading :visible='loading'></loading>
                <error fixed :visible='error' :method='init'></error>
            </div>
        </div>
        <!-- 底部工具条 -->
        <tool icon comment='remark' @publishStatus='publishCallBack'>
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
import myTags from './components/tags'
import myRecommend from './components/recommend'
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
        myTags,
        myRecommend,
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
            'localtion'
        ])
    },
    methods: {
        ...mapActions('index', [
            'get_indexColumn_data'
        ]),
        ...mapMutations('detail', [
            'set_listArticle',
            'set_currentArticle',
            'set_historyArticle',
            'set_localtion'
        ]),
        ...mapActions('detail', [
            'get_Article_data',
            'send_user_data'
        ]),
        async init() {
            this.classid = this.$route.query.classid
            this.id = this.$route.query.id
            this.from = this.$route.query.datafrom
            $('#detail .container').scrollTop(0)
            if (!(this.indexColumn.length > 1)) {
                await this.get_indexColumn_data()
            }
            let index = this.indexColumn.findIndex(n => n.classid === this.classid)
            if (index > -1) {
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
            this.get_Article()
        },
        get_Article() {
            this.loading = true
            this.enterTime = new Date().getTime()
            this.get_Article_data({ 'id': this.id, 'datafrom': this.from })
            .then(res => {
                if (res) {
                    this.set_currentArticle(res)
                    this.loading = false
                    this.handleLocaltion('get')
                }
                this.error = false
            })
            .catch(err => {
                console.log(err)
                this.error = true
                this.loading = false
            })
        },
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    if (this.localtion && this.localtion[this.id]) {
                        $('#detail .container').scrollTop(this.localtion[this.id])
                    }
                })
            } else if (type === 'set') {
                let scrollTop = $('#detail .container').scrollTop()
                this.localtion[this.id] = scrollTop
                this.set_localtion(this.localtion)
            }
        },
        publishCallBack() {
            this.$refs.comment.open()
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
    beforeRouteUpdate(to, from, next) {
        this.handleLocaltion('set')
        this.send_user_data(this.enterTime)
        next()
    },
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        this.send_user_data(this.enterTime)
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
    .content {
        padding-bottom: 48px;
        .article_favorite {
            text-align: center;
            padding: 0.4rem 0;
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
                text-align: center;
                font-size: 12px;
                color: #888;
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
}
</style>
<style scoped>
.comment_btn {
    background: url(~@/assets/img/comment.png) no-repeat center center;
    background-size: 18.5px;
}

.share_btn {
    background: url(~@/assets/img/share.png) no-repeat center center;
    background-size: 18.5px;
}
</style>
