<template>
    <transition name='fadeIn'>
        <div id='reply' v-if='visible'>
            <my-header fixed title='回复'>
                <a slot='left' class='close-black' @click.stop="visible = false"></a>
            </my-header>

            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight="'close'" v-swiper:all="'blur'">

                    <!-- 评论摘要 -->
                    <div class="reply-full">
                        <comment-item comment='reply' :itemJson='json'></comment-item>
                    </div>

                    <!-- 我的回复 -->
                    <div class="reply-self" v-if='myReply.length > 0'>
                        <h2>我的回复</h2>
                        <comment-item comment='reply' type='userself' v-for='item in myReply' :itemJson='item' :key='item' @delSuccess='delCallBack'></comment-item>
                    </div>

                    <!-- 全部回复 -->
                    <div class="reply-all" v-if='reply.length > 0'>
                        <h2>全部回复({{reply.length}})</h2>
                        <comment-item comment='reply' type='all'  v-for='item in reply' :itemJson='item' @click.native.stop="" :key='item'></comment-item>
                    </div>
                    
                    <!-- 没有回复 -->
                    <div class="reply-nothing" v-if='!(myReply.length > 0) && !(reply.length > 0)'>
                        <h2>抢先回复!</h2>
                    </div>

                    <tool comment='reply' @publishStatus='publishCallBack' :remarkid='json.remarkid'></tool>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import tool from './tool'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    components: { tool },
    data() {
        return {
            visible: false,
            json: ''
        }
    },
    computed: {
        ...mapGetters('detail', [
            'myReply',
            'reply'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_myReply',
            'set_reply'
        ]),
        ...mapActions('detail', [
            'get_Reply_data'
        ]),
        open(item) {
            this.visible = true
            this.json = item
            this.get_Reply()
        },
        get_Reply() {
            this.set_reply([])
            this.get_Reply_data({'remarkid': this.json.remarkid, 'type': 'userself', 'page': 1})
            this.get_Reply_data({'remarkid': this.json.remarkid, 'type': 'all', 'page': 1})
        },
        publishCallBack(data) {
            this.myReply.unshift(data)
            this.set_myReply(this.myReply)
            $('#reply .container').scrollTop(0)
            this.json.plnum = this.myReply.length
        },
        delCallBack(data) {
            this.json.plnum = this.myReply.length
        },
        replyClose() {
            if (this.visible) {
                this.visible = false
            }
        }
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('openStatus', true)
                document.addEventListener('backbutton', this.replyClose, false)
            } else {
                this.$emit('openStatus', false)
                document.removeEventListener('backbutton', this.replyClose, false)
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
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
        background-color: #f8f8f8;
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
