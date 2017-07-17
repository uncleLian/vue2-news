<template>
    <transition name='fadeIn'>
        <div id='comment' v-if="visible">
            <my-header fixed title='评论'>
                <a slot="left" @click.stop="visible = false"><i class="icon-close"></i></a>
            </my-header>

            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight='true'>

                    <!-- 文章摘要 -->
                    <div class="abstract">
                        <h1 class="title">{{currentArticle.title}}</h1>
                        <div class="info">
                            <span class="author"><i class="icon-author"></i> 文 / {{currentArticle.befrom}}</span>
                            <span class="time">{{currentArticle.newstime}}</span>
                        </div>
                    </div>

                    <!-- 我的评论 -->
                    <div class="comment-self" v-if=" myComment.length > 0">
                        <h2 class="comment_title">我的评论</h2>
                        <comment-item v-for='item in myComment' type='userself' :itemJson='item' :key='item' @click.stop.native="$refs.reply.open(item)"></comment-item>
                    </div>

                    <!-- 全部评论 -->
                    <div class="comment-all" v-if="comment.length > 0">
                        <h2 class="comment_title">全部评论({{comment.length}})</h2>
                        <comment-item v-for='item in comment' :itemJson='item' :key='item' @click.stop.native="$refs.reply.open(item)"></comment-item>
                    </div>

                    <!-- 没有评论 -->
                    <div class="comment-nothing" v-if="comment.length === 0 && myComment.length === 0">
                        <h2 class="comment_title">抢先评论！</h2>
                    </div>

                    <tool type='remark' @publishStatus='commentCallBack'></tool>
                </div>
            </div>

            <reply ref="reply"></reply>
        </div>
    </transition>
</template>
<script>
import reply from './reply'
import tool from './tool'
import { mapGetters, mapMutations, mapActions } from 'vuex'
// import { Toast } from 'mint-ui'
export default {
    components: { reply, tool },
    data() {
        return {
            visible: false,
            page: 1
        }
    },
    computed: {
        ...mapGetters('detail', [
            'myComment',
            'comment',
            'currentArticle'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_myComment'
        ]),
        ...mapActions('detail', [
            'get_MyComment_data',
            'get_Comment_data'
        ]),
        open() {
            this.visible = true
            this.get_MyComment_data()
            this.get_Comment_data(this.page)
        },
        commentCallBack(data) {
            this.myComment.unshift(data)
            this.set_myComment(this.myComment)
        }
    }
}
</script>
<style scoped lang='stylus'>
#comment {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 888;
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
        height: 100%;
        padding-top: 44px;
        padding-bottom: 48px;
        background-color: #f8f8f8;
        &.isIOS {
            padding-top: 64px;
        }
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
            .abstract{
                padding: 15px 16px;
                border-bottom: 1px solid #ddd;
                .title {
                    color: #000;
                    font-size: 18px;
                    font-weight: bold;
                    padding-bottom: 15px;
                }
                .info {
                    color: #999;
                    font-size: 12px;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                }
            }
            .comment_title{
                padding: 10px 16px;
                font-size: 12px;
                color: #333;
            }
        }
    }
}
</style>
