<template>
    <form class='tool' :class="{'focus': focus}" @keyup.enter.prevent="sendComment">
        <div class="left">
            <span v-show='!focus' @click.stop="inputFocus" class="text">
                <i class="icon-write"></i>
                <span v-if="type === 'reply'">写回复...</span>
                <span v-else>写评论...</span>
            </span>
            <input id='input' type="text" v-model.trim='inputVal' @focus.stop="focus = true" @blur.stop="focus = false">
        </div>
        <div class="right" v-show='!focus' v-if='right'>
            <slot name='tool_btn'></slot>
        </div>
        <span v-show='focus' class="publish_btn" @click.stop='sendComment'>发送</span>
    </form>
</template>
<script>
import {mapActions} from 'vuex'
import {Toast} from 'mint-ui'
export default {
    props: {
        ele: {
            default: ''
        },
        type: String,
        right: Boolean,
        remarkid: {
            default: ''
        }
    },
    data() {
        return {
            focus: false,
            inputVal: '',
            keepInputVal: ''
        }
    },
    watch: {
        focus(val) {
            if (val) {
                if (this.keepInputVal) {
                    this.inputVal = this.keepInputVal
                }
            } else {
                if (this.inputVal) {
                    this.keepInputVal = this.inputVal
                    this.inputVal = ''
                } else {
                    this.keepInputVal = ''
                }
            }
        }
    },
    methods: {
        ...mapActions('detail', [
            'send_comment_data',
            'send_reply_data'
        ]),
        inputFocus() {
            $('#input').focus()
        },
        inputBlur() {
            this.focus = false
        },
        sendComment() {
            if (this.inputVal) {
                if (this.type === 'remark') {
                    this.send_comment_data({'content': this.inputVal})
                    .then(res => {
                        if (this.ele) {
                            this.ele.open()
                        }
                        if (res.data) {
                            this.inputVal = ''
                            this.keepInputVal = ''
                            this.focus = false
                            this.$emit('publishStatus', res.data)
                            Toast({
                                message: '发送成功',
                                duration: 1500
                            })
                        }
                    })
                } else if (this.type === 'reply') {
                    this.send_reply_data({'remarkid': this.remarkid, 'content': this.inputVal})
                    .then(res => {
                        if (this.ele) {
                            this.ele.open()
                        }
                        if (res.data) {
                            this.inputVal = ''
                            this.keepInputVal = ''
                            this.focus = false
                            this.$emit('publishStatus', res.data)
                            Toast({
                                message: '发送成功',
                                duration: 1500
                            })
                        }
                    })
                }
            }
        }
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
    line-height: 48px;
    display: flex;
    background: #fdfdfd;
    border-top: 1px solid #ddd;
    padding: 0 16px;
    .left {
        flex: 1;
        position: relative;
        .text {
            position: absolute;
            left: 16px;
            top: 2px;
            z-index: 111;
        }
        #input {
            width: 100%;
            height: 32px;
            line-height: 32px;
            margin: 6px 0 8px;
            border-radius: 30px;
            border: 1px solid #ddd;
            background: #eee;
            position: relative;
            font-size: 14px;
            padding: 0 16px;
        }
    }
    .right {
        flex: 1;
        text-align: right;
        a {
            display: inline-block;
            text-align: center;
            width: 33%;
            font-size: 20px;
            padding-left: 16px;
            text-decoration: none;
        }
        .comment_btn i{
    		position: relative;
        	.comment_num{
        		position: absolute;
        		right: -15px;
        		top: -5px;
        		padding: 0 5px;
        		text-align: center;
        		border-radius: 15px;
        		font-size: 12px;
        		color: #fff;
        		background: #d43d3d;
        	}
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
