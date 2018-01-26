<template>
    <transition name='fadeIn'>
        <div id='comment'>
            <!-- 头部 -->
            <my-header fixed title='评论'>
                <a slot="left" class='close-black' @click.stop="$router.go(-1)"></a>
            </my-header>
            <!-- 正文 -->
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
                        <comment-item comment='remark' type='userself' v-for="(item,index) in myComment"  :itemJson='item' :key='index' @reply="replyCallBack" @delete="deleteCallBack"></comment-item>
                    </div>
                    <!-- 全部评论 -->
                    <div class="comment-all" v-if="allComment.length > 0">
                        <h2 class="comment_title">全部评论({{allComment.length}})</h2>
                        <comment-item comment='remark' type='all' v-for='(item,index) in allComment' :itemJson='item' :key='index' @reply="replyCallBack"></comment-item>
                    </div>
                    <!-- 没有评论 -->
                    <div class="comment-nothing" v-if="allComment.length === 0 && myComment.length === 0">
                        <h2 class="comment_title">抢先评论！</h2>
                    </div>
                </div>
            </div>
            <!-- 底部工具栏 -->
            <my-tool comment='remark' @publish='publishCallBack'></my-tool>
            <!-- 子页面视图 -->
            <router-view></router-view>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'comment',
    data() {
        return {
            myComment: [],  // 我的评论
            allComment: []  // 全部评论
        }
    },
    computed: {
        ...mapGetters('detail', [
            'currentArticle',
            'listArticle'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_listArticle'
        ]),
        ...mapActions('detail', [
            'get_Comment_data'
        ]),
        // 获取我的评论数据
        get_myComment() {
            this.get_Comment_data({'type': 'userself', 'page': 1})
            .then(res => {
                if (res) {
                    this.myComment = res
                }
            })
        },
        // 获取全部评论数据
        get_allComment() {
            this.get_Comment_data({'type': 'all', 'page': 1})
            .then(res => {
                if (res) {
                    this.allComment = res
                }
            })
        },
        // 发布评论
        publishCallBack(item) {
            this.myComment.unshift(item)
            $('#comment .container').scrollTop(0)   // 滚回顶部
            this.currentArticle.plnum = this.myComment.length + this.allComment.length  // 更改详情页的评论数量
            if (this.listArticle) {
                this.listArticle.plnum++
                this.set_listArticle(this.listArticle)
            }
        },
        // 回复评论
        replyCallBack(item) {
            this.$router.push({name: 'reply', params: {json: item}})
        },
        // 删除评论
        deleteCallBack(item) {
            let index = this.myComment.findIndex(n => n.remarkid === item.remarkid)
            this.myComment.splice(index, 1)
            this.currentArticle.plnum = this.myComment.length + this.allComment.length
        }
    },
    created() {
        this.get_myComment()
        this.get_allComment()
    }
}
</script>
<style lang='stylus'>
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
                font-size: 12px;
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

/*.flicker-enter-active {
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
}*/
</style>
