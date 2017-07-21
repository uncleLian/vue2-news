<template>
    <div class='tool' :class="{'focus': focus}" @keyup.enter.prevent="sendComment">
        <div class="left">
            <a v-show='!focus' class="text" @click.stop="inputFocus">
                <i class="icon-write"></i>
                <span v-if="comment === 'reply'">写回复...</span>
                <span v-else>写评论...</span>
            </a>
            <!-- 回复页 -->
            <input id='input' name='input' type="text" v-model.trim='inputVal' @focus.stop="replyFocus" @blur.stop="focus = false" :placeholder="placeholderVal" v-if="comment === 'reply'">
            <!-- 评论页 -->
            <input id='input' name='input' type="text" v-model.trim='inputVal' @focus.stop="focus = true" @blur.stop="focus = false"  v-else>
        </div>
        <div class="right" v-show='!focus' v-if='icon'>
            <slot name='tool_btn'></slot>
        </div>
        <span v-show='focus' class="publish_btn">发送</span>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import {Toast} from 'mint-ui'
export default {
    props: {
        ele: {
            default: ''
        },
        comment: String,
        icon: Boolean,
        remarkid: {
            default: ''
        }
    },
    data() {
        return {
            focus: false,
            inputVal: '',
            keepInputVal: '',
            placeholderVal: ''
        }
    },
    watch: {
        focus(val) {
            if (val) {
                if (this.keepInputVal) {
                    this.inputVal = this.keepInputVal
                }
            } else {
                this.placeholderVal = ''
                this.set_talkReply('')
                if (this.inputVal) {
                    this.keepInputVal = this.inputVal
                    this.inputVal = ''
                } else {
                    this.keepInputVal = ''
                }
            }
        }
    },
    computed: {
        ...mapGetters('detail', [
            'talkReply'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_talkReply'
        ]),
        ...mapActions('detail', [
            'post_Comment_data',
            'post_Reply_data'
        ]),
        inputFocus() {
            $('.tool #input').focus()
        },
        replyFocus() {
            this.focus = true
            if (this.talkReply) {
                this.placeholderVal = `回复 ${this.talkReply.nickname}`
            }
        },
        sendComment() {
            if (this.inputVal) {
                if (this.comment === 'remark') {
                    // 评论页
                    this.post_Comment_data({'content': this.inputVal})
                    .then(res => {
                        if (this.ele) {
                            this.ele.open()
                        }
                        if (res.err) {
                            this.inputVal = ''
                            this.keepInputVal = ''
                            this.focus = false
                            this.$emit('publishStatus', res.data)
                            Toast({message: '发送成功', duration: 1500})
                            $('.tool #input').blur()
                        }
                    })
                } else if (this.comment === 'reply') {
                    // 回复页
                    let params = {
                        'content': this.inputVal,
                        'remarkid': this.remarkid,
                        'altUserId': this.talkReply.replyid
                    }
                    this.post_Reply_data(params)
                    .then(res => {
                        if (res.err) {
                            this.inputVal = ''
                            this.keepInputVal = ''
                            this.focus = false
                            this.$emit('publishStatus', res.data)
                            Toast({message: '发送成功', duration: 1500})
                            $('.tool #input').blur()
                        }
                    })
                }
            }
        }
    },
    mounted() {
        $(this.$el.querySelector('.tool .publish_btn')).on('touchend', () => {
            this.sendComment()
        })
    }
}
</script>
<style scoped lang='stylus'>
.tool {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 666;
    height: 48px;
    line-height: 47px;
    display: flex;
    background: #fdfdfd;
    border-top: 1px solid #ddd;
    padding: 0 16px;
    .left {
        flex: 1;
        position: relative;
        font-size: 0;
        .text {
            position: absolute;
            left: 16px;
            top: 0;
            z-index: 111;
            font-size: 12px;
        }
        #input {
            width: 100%;
            height: 32px;
            line-height: 32px;
            margin: 6px 0 8px;
            border-radius: 30px;
            border: 1px solid #ddd;
            background: #eee;
            font-size: 14px;
            padding: 0 16px;
        }
    }
    .right {
        flex: 1;
        text-align: right;
        font-size: 0;
        a {
            display: inline-block;
            text-align: center;
            width: 33.3%;
            font-size: 20px;
            padding-left: 16px;
            text-decoration: none;
        }
    }
    .publish_btn {
        display: inline-block;
        padding-left: 15px;
        font-size: 16px;
        color: #aaa;
        user-select:none;
    }
}
</style>
