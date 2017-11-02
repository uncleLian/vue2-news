<template>
    <div class='tool' :class="{'focus': focus}">
         
        <div class="left">
            <div class="text" v-show='!focus'  @click.stop="inputFocus">
                <a class="icon-write"> 写评论...</a>
            </div>
            <textarea id='input' v-if="comment === 'reply'"  :class="{ normal: !focus }" v-model.trim='inputVal' @focus.stop="onFocus" @blur.stop="onBlur" :placeholder="placeholderVal" ><br/></textarea>

            <textarea  id='input' v-else :class="{ normal: !focus }" v-model.trim='inputVal' @focus.stop="onFocus" @blur.stop="onBlur"><br/></textarea>
        </div>
        <div class="right" v-show='!focus' v-if='icon'>
            <slot name='tool_btn'></slot>
        </div>
        <span v-show='focus' class="publish_btn" :class="{ hasVal: inputVal.length > 0 ? true : false }">发送</span>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
import { autoTextarea } from '@/config/autoTextarea.js'
export default {
    props: {
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
    computed: {
        ...mapGetters('detail', [
            'talkReply'
        ]),
        ...mapGetters('login', [
            'isLogin'
        ])
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
        onFocus() {
            this.focus = true
            setTimeout(() => {
                this.$el.scrollIntoView(true)
            }, 100)
            if (this.comment === 'reply' && this.talkReply) {
                this.placeholderVal = `回复 ${this.talkReply.nickname}`
            }
            document.addEventListener('backbutton', this.backButtonFocus, false)
        },
        onBlur() {
            this.focus = false
            document.removeEventListener('backbutton', this.backButtonFocus, false)
        },
        sendComment() {
            if (this.isLogin) {
                if (this.inputVal) {
                    if (this.comment === 'remark') {
                        this.post_Comment_data(this.inputVal)
                        .then(res => {
                            if (res.err) {
                                this.$emit('publish', res.data)
                                this.inputVal = ''
                                this.keepInputVal = ''
                                this.focus = false
                                Toast({message: '发送成功', duration: 1500})
                                $('.tool #input').blur()
                            }
                        })
                    } else if (this.comment === 'reply') {
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
                                this.$emit('publish', res.data)
                                Toast({message: '发送成功', duration: 1500})
                                $('.tool #input').blur()
                            }
                        })
                    }
                }
            } else {
                MessageBox({
                    title: '提示',
                    message: '你还未登录，跳转到登录页？',
                    showCancelButton: true,
                    closeOnClickModal: false
                })
                .then(action => {
                    console.log(action)
                    if (action !== 'cancel') {
                        this.$router.push('/login')
                    }
                })
            }
        },
        backButtonFocus() {
            let isFocus = $('.tool #input').is(':focus')
            if (isFocus) {
                $('.tool #input').blur()
            }
        }
    },
    mounted() {
        let text = this.$el.querySelector('.tool #input')
        autoTextarea(text, 0, 80)
        $(this.$el.querySelector('.tool .publish_btn')).on('touchend', () => {
            this.sendComment()
        })
    }
}
</script>
<style lang='stylus'>
.tool {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 666;
    display: flex;
    background: #fdfdfd;
    border-top: 1px solid #ddd;
    padding-right: 16px;
    font-size: 0;
    align-items: center;
    .left {
        flex: 1;
        position: relative;
        padding-left: 16px;
        font-size: 0;
        .text {
            position: absolute;
            left: 32px;
            top: 0;
            z-index: 111;
            font-size: 12px;
            a{
                height: 48px;
                display: table-cell;
                vertical-align: middle;
                white-space: nowrap;
            }
        }
        #input {
            width: 100%;
            height: 36px;
            font-size: 14px;
            line-height: 24px;
            border-radius: 20px;
            border: 1px solid #ddd;
            background: #f4f5f6;
            -webkit-appearance: none;
            outline: none;
            resize: none;
            overflow-y: auto !important;
            margin: 6px 0;
            padding: 6px 15px;
            word-break:break-all;
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }
            &.normal{
                height: 36px !important;
            }
        }
    }
    .right {
        flex: 1;
        font-size: 0;
        padding-left: 15px;
        a {
            display: inline-block;
            text-align: center;
            width: 33.3%;
            height: 48px;
            font-size: 20px;
            text-decoration: none;
            vertical-align: top;
            
        }
        .comment_btn{
            position: relative;
            .comment_num{
                position: absolute;
                top: 8px;
                padding: 2px 4px 1px;
                text-align: center;
                border-radius: 100%;
                font-size: 10px;
                color: #fff;
                background: #d43d3d;
                line-height: 1;
            }
        }
    }
    .publish_btn {
        display: table-cell;
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #aaa;
        user-select:none;
        vertical-align: middle;
        &.hasVal{
            color: #00939c
        }
    }
}
</style>

