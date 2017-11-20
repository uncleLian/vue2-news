<template>
    <transition name='fadeIn'>
        <div id='reply'>
            <!-- 头部 -->
            <my-header fixed title='回复'>
                <a slot='left' class='close-black' @click.stop="$router.go(-1)"></a>
            </my-header>
            <!-- 正文 -->
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight="'close'" v-swiper:all="'blur'">
                    <!-- 评论摘要 -->
                    <div class="reply-full">
                        <comment-item comment='reply' :itemJson='json'></comment-item>
                    </div>
                    <!-- 我的回复 -->
                    <div class="reply-self" v-if='myReply.length > 0'>
                        <h2>我的回复</h2>
                        <comment-item comment='reply' type='userself' v-for='(item,index) in myReply' :itemJson='item' :key='index' @reply="replyCallBack" @delete='deleteCallBack'></comment-item>
                    </div>
                    <!-- 全部回复 -->
                    <div class="reply-all" v-if='allReply.length > 0'>
                        <h2>全部回复({{allReply.length}})</h2>
                        <comment-item comment='reply' type='all'  v-for='(item,index) in allReply' :itemJson='item' :key='index' @reply="replyCallBack"></comment-item>
                    </div>
                    <!-- 没有回复 -->
                    <div class="reply-nothing" v-if='!(myReply.length > 0) && !(allReply.length > 0)'>
                        <h2>抢先回复!</h2>
                    </div>
                </div>
            </div>
            <!-- 底部工具栏 -->
            <my-tool comment='reply' @publish='publishCallBack' :remarkid='json.remarkid'></my-tool>
        </div>
    </transition>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'reply',
    data() {
        return {
            json: '',       // 回复的评论数据
            myReply: [],    // 我的回复
            allReply: []    // 全部回复
        }
    },
    methods: {
        ...mapMutations('detail', [
            'set_talkReply'
        ]),
        ...mapActions('detail', [
            'get_Reply_data'
        ]),
        // 获取我的回复数据
        get_myReply() {
            let params = {
                'remarkid': this.json.remarkid,
                'type': 'userself',
                'page': 1
            }
            this.get_Reply_data(params).then(res => {
                if (res) {
                    this.myReply = res
                } else {
                    this.myReply = []
                }
            })
        },
        // 获取全部回复数据
        get_allReply() {
            let params = {
                'remarkid': this.json.remarkid,
                'type': 'all',
                'page': 1
            }
            this.get_Reply_data(params).then(res => {
                if (res) {
                    this.allReply = res
                } else {
                    this.allReply = []
                }
            })
        },
        // 发布回复
        publishCallBack(item) {
            this.myReply.unshift(item)
            $('#reply .container').scrollTop(0)
            this.json.plnum = this.myReply.length + this.allReply.length
        },
        // 回复TA
        replyCallBack(item) {
            this.set_talkReply(item)
            $('#reply .tool #input').focus()
        },
        // 删除回复
        deleteCallBack(item) {
            let index = this.myReply.findIndex(n => n.replyid === item.replyid)
            this.myReply.splice(index, 1)
            this.json.plnum = this.myReply.length
        }
    },
    created() {
        this.json = this.$route.params.json
        this.get_myReply()
        this.get_allReply()
    }
}
</script>
<style lang='stylus'>
#reply {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1112;
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
        z-index: 1112;
    }
    .content {
        padding-bottom: 48px;
        .container {
            h2 {
                font-weight: bold;
                font-size: 14px;
                padding: 10px 16px;
                color: #333;
            }
        }
        .comment_item:last-of-type {
            border:none;
        }
    }
}
</style>
