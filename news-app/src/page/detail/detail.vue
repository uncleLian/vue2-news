<template>
    <div id="detail">
        <!-- 头部 -->
        <my-header fixed :title='title' v-goTop:click='true'>
            <a slot="left" class="back-black" @click.stop='$router.go(-1)'></a>
            <a slot="right" class="menu" @click.stop='$refs.share.toggle()'></a>
        </my-header>
        <!-- 正文 -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container" v-swiper:swiperRight='true' v-swiper:all="'blur'">
                <!-- 正文 -->
                <my-article v-if="currentArticle" :json='currentArticle'></my-article>
                <!-- 标签 -->
                <my-tags v-if='currentArticle.infotags' :json='currentArticle.infotags'></my-tags>
                <!-- 喜欢/收藏 -->
                <div class="article_favorite">
                    <my-like :json="currentArticle"></my-like>
                    <my-collect type='btn' :json="currentArticle"></my-collect>
                </div>
                <!-- 热点评论 -->
                <template v-if='currentArticle.comment'>
                    <!-- 分割线 -->
                    <div class="bg_line" ></div>
                    <div class="comment-hot">
                        <div class="comment_title">
                            <div class="Line">
                                <div class="title">用户热评</div>
                            </div>
                        </div>
                        <!-- 评论列表 -->
                        <comment-item layout='topFooter' comment='remark' type='all' v-for='(item,index) in currentArticle.comment' :itemJson='item' :key='index'></comment-item>
                        <!-- 更多评论 -->
                        <router-link class="comment_more" v-if="currentArticle.plnum > 0 " tag='div' :to="{name: 'comment'}">全部{{currentArticle.plnum}}条评论<i class="icon-detail"></i></router-link>
                    </div>
                </template>
                <!-- 分割线 -->
                <div class="bg_line"></div>
                <!--  推荐 -->
                <my-recommend :json='currentArticle.recommend'></my-recommend>
            </div>
        </div>
        <!-- 底部工具栏 -->
        <my-tool icon comment='remark' @publish='publishCallBack'>
            <!-- 按钮栏 -->
            <template slot='tool_btn'>
                <!-- 评论按钮 -->
                <router-link class="comment_btn" :to="{name:'comment'}">
                    <span class="comment_num" v-if="currentArticle.plnum > 0">{{currentArticle.plnum}}</span>
                </router-link>
                <!-- 收藏按钮 -->
                <my-collect type='icon' :json='currentArticle'></my-collect>
                <!-- 分享按钮 -->
                <a class="share_btn" @click.stop='$refs.share.toggle()'></a>
            </template>
        </my-tool>
        <!-- 分享组件 -->
        <my-share :json='currentArticle' ref="share"></my-share>
        <!-- 提示组件 -->
        <my-loading :visible='loading'></my-loading>
        <my-error fixed :visible='error' :method='init'></my-error>
        <!-- 子页面视图 -->
        <router-view></router-view>
    </div>
</template>
<script>
import myArticle from './components/article'
import myTags from './components/tags'
import myRecommend from './components/recommend'
import myShare from './components/share'
import myLike from './components/like'
import myCollect from './components/collect'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'detail',
    components: { myArticle, myTags, myRecommend, myShare, myLike, myCollect },
    data() {
        return {
            title: '健康头条',   // header的title
            id: '',             // 文章id
            classid: '',        // 文章classid（分类）
            datafrom: '',       // 数据来源
            articleJson: {},    // 文章数据
            enterTime: '',      // 即进入页面时间
            loading: true,
            error: false
        }
    },
    computed: {
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
    watch: {
        $route(val) {
            if (val.query.id) {
                this.init() // 自己调用自己，重新初始化
            }
        }
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
            'post_user_data'
        ]),
        async init() {
            this.classid = this.$route.query.classid
            this.id = this.$route.query.id
            this.datafrom = this.$route.query.datafrom
            this.enterTime = new Date().getTime()
            $('#detail .container').scrollTop(0)
            await this.handleTitle()
            this.get_Article()
        },
        // 获取title分类
        async handleTitle() {
            if (!(this.indexColumn.length > 1)) {
                await this.get_indexColumn_data()
            }
            let index = this.indexColumn.findIndex(n => n.classid === this.classid)
            if (index > -1) {
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
        },
        // 获取文章
        get_Article() {
            this.loading = true
            let params = {
                'id': this.id,
                'datafrom': this.datafrom
            }
            this.get_Article_data(params)
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
        // 发表回调
        publishCallBack() {
            this.$router.push({name: 'comment'})
            this.currentArticle.plnum++
            this.set_historyArticle(this.historyArticle)
            if (this.listArticle) {
                this.listArticle.plnum++
                this.set_listArticle(this.listArticle)
            }
        }
    },
    mounted() {
        this.init()
        this.handleLocaltion('get')
    },
    beforeRouteUpdate(to, from, next) {
        this.handleLocaltion('set')
        if (!to.path.includes('comment')) {
            this.set_currentArticle({})
        }
        this.post_user_data(this.enterTime)
        next()
    },
    beforeRouteLeave(to, from, next) {
        this.handleLocaltion('set')
        if (to.path.includes('index')) {
            this.set_currentArticle({})
        }
        this.post_user_data(this.enterTime)
        next()
    }
}
</script>
<style lang='stylus'>
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
<style>
#detail .comment_btn {
    background: url(~@/assets/img/comment.png) no-repeat center center;
    background-size: 18.5px;
}
#detail .share_btn {
    background: url(~@/assets/img/share.png) no-repeat center center;
    background-size: 18.5px;
}
</style>
