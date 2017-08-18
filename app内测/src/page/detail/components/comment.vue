<template>
    <transition name='fadeIn'>
        <div id='comment' v-if="visible">
            <my-header fixed title='评论'>
                <a slot="left" class='close-black' @click.stop="visible = false"></a>
            </my-header>

            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight="'close'" v-swiper:all="'blur'">

                    <!-- 文章摘要 -->
                    <div class="abstract">
                        <h1 class="title">{{currentArticle.title}}</h1>
                        <span class="befrom">{{currentArticle.befrom}}</span>
                        <span class="newstime">{{currentArticle.newstime}}</span>
                    </div>

                    <!-- 我的评论 -->
                    <div class="comment-self" v-if=" myComment.length > 0">
                        <h2 class="comment_title">我的评论({{myComment.length}})</h2>
                        <comment-item comment='remark' type='userself' v-for='item in myComment'  :itemJson='item' :key='item' @click.stop.native="$refs.reply.open(item)" @delSuccess='delCallBack'></comment-item>
                    </div>

                    <!-- 全部评论 -->
                    <div class="comment-all" v-if="comment.length > 0">
                        <h2 class="comment_title">全部评论({{comment.length}})</h2>
                        <comment-item comment='remark' type='all' v-for='item in comment' :itemJson='item' :key='item' @click.stop.native="$refs.reply.open(item)"></comment-item>
                    </div>

                    <!-- 没有评论 -->
                    <div class="comment-nothing" v-if="!(comment.length > 0) && !(myComment.length > 0)">
                        <h2 class="comment_title">抢先评论！</h2>
                    </div>

                    <tool comment='remark' @publishStatus='publishCallBack'></tool>
                </div>
            </div>

            <reply ref="reply" @openStatus='replyCallBack'></reply>
        </div>
    </transition>
</template>
<script>
import reply from './reply'
import tool from './tool'
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
            'listArticle',
            'currentArticle',
            'myComment',
            'comment'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_listArticle',
            'set_myComment'
        ]),
        ...mapActions('detail', [
            'get_Comment_data'
        ]),
        open() {
            this.visible = true
            this.get_Comment_data({'type': 'userself', 'page': 1})
            this.get_Comment_data({'type': 'all', 'page': 1})
        },
        publishCallBack(data) {
            this.myComment.unshift(data)
            this.set_myComment(this.myComment)
            $('#comment .container').scrollTop(0)
            this.currentArticle.plnum = this.myComment.length + this.comment.length
            if (this.listArticle) {
                this.listArticle.plnum++
                this.set_listArticle(this.listArticle)
            }
        },
        delCallBack() {
            this.currentArticle.plnum = this.myComment.length + this.comment.length
        },
        commentClose() {
            if (this.visible) {
                this.visible = false
            }
        },
        replyCallBack(val) {
            if (val) {
                document.removeEventListener('backbutton', this.commentClose, false)
            } else {
                document.addEventListener('backbutton', this.commentClose, false)
            }
        }
    },
    watch: {
        visible(val) {
            if (val) {
                document.addEventListener('backbutton', this.commentClose, false)
            } else {
                document.removeEventListener('backbutton', this.commentClose, false)
            }
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
    background: #fff;
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
    .tool{
        z-index: 888;
    }
    .content {
        padding-bottom: 48px;
        .container {
            .abstract{
                padding: 15px 16px 22px;
                border-bottom: 1px solid #eee;
                .title {
                    color: #000;
                    font-size: 18px;
                    font-weight: bold;
                    padding-bottom: 15px;
                }
                .befrom {
                    margin-right: 5px;
                }
            }
            .comment_title{
                font-weight: bold;
                padding: 10px 16px;
                font-size: 14px;
                color: #333;
            }
        }
        .comment_item:last-of-type {
            border:none;
        }
    }
}

.flicker-enter-active {
    animation: flickerEnter 1.5s linear;
}

@keyframes flickerEnter {
  0% {
    background: #fff;
  }
  50% {
    background: #ffff8f;
  }
  100% {
    background: #fff;
  }
}
</style>
