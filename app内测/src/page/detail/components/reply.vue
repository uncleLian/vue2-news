<template>
    <transition name='fadeIn'>
        <div id='reply' v-if='visible'>
            <my-header fixed title='回复'>
                <a slot='left' @click.stop="visible = false"><i class="icon-close"></i></a>
            </my-header>

            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight='true'>

                    <!-- 评论摘要 -->
                    <div class="reply-full">
                        <comment-item :itemJson='json'></comment-item>
                    </div>
                    
                    <!-- 全部回复 -->
                    <div class="reply-all" v-if='reply.length > 0'>
                        <h2>全部回复</h2>
                        <comment-item v-for='item in reply' :itemJson='item' @click.native.stop="" :key='item'></comment-item>
                    </div>
                    
                    <!-- 没有回复 -->
                    <div class="reply-nothing" v-if='!(reply.length > 0)'>
                        <h2>抢先回复!</h2>
                    </div>

                    <tool type='reply' @publishStatus='replyCallBack' :remarkid='json.remarkid'></tool>
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
            json: '',
            remarkid: ''
        }
    },
    computed: {
        ...mapGetters('detail', [
            'reply'
        ])
    },
    methods: {
        ...mapMutations('detail', [
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
            this.get_Reply_data({'remarkid': this.json.remarkid, 'page': 1})
        },
        replyCallBack(data) {
            this.reply.unshift(data)
            this.set_reply(this.reply)
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
        background-color: #f8f8f8;
        &.isIOS {
            padding-top: 64px;
        }
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
            h2 {
                font-size: 12px;
                padding: 10px 16px;
                color: #333;
            }
            .reply-full {
                border-bottom: 1px solid #ddd;
            }
        }
    }
}
</style>
