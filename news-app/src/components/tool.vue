<template>
    <div class='tool' :class="{'focus': focus}">
        <!-- 左边 -->
        <div class="left">
            <div class="text" v-show='!focus'  @click.stop="inputFocus">
                <a class="icon-write"> 写评论...</a>
            </div>
            <!-- 回复可以@功能，加上placeholder属性 -->
            <textarea id='input'  :class="{ normal: !focus }" v-model.trim='inputVal' @focus.stop="onFocus" @blur.stop="onBlur" :placeholder="placeholderVal"><br/></textarea>
        </div>
        <!-- 右边 -->
        <div class="right" v-show='!focus' v-if='icon'>
            <!-- 内容分发 -->
            <slot name='tool_btn'></slot>
        </div>
        <!-- 发送按钮 -->
        <span v-show='focus' class="publish_btn" :class="{ hasVal: inputVal.length > 0 ? true : false }">发送</span>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { autoTextarea } from '@/config/autoTextarea.js'
export default {
    props: {
        comment: String,    // 评论类型
        icon: Boolean,      // 是否icon布局
        remarkid: {         // 评论数据的id，回复需要知道是哪条评论
            default: ''
        }
    },
    data() {
        return {
            focus: false,       // input是否聚焦
            inputVal: '',       // input的内容
            keepInputVal: '',   // 失焦持久的input内容
            placeholderVal: ''  // @的内容
        }
    },
    computed: {
        ...mapGetters('detail', [
            'talkReply'         // @的数据
        ]),
        ...mapGetters('login', [
            'isLogin'           // 是否登录
        ])
    },
    watch: {
        focus(val) {
            // 聚焦
            if (val) {
                // 是否有持久内容
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
            'set_talkReply'     // 设置被@的数据
        ]),
        ...mapActions('detail', [
            'post_Comment_data',    // 提交评论数据
            'post_Reply_data'       // 提交回复数据
        ]),
        // 发送评论
        sendComment() {
            if (this.isLogin) {
                if (this.inputVal) {
                    if (this.comment === 'remark') {
                        this.post_Comment_data(this.inputVal)
                        .then(res => {
                            if (res.err) {
                                this.inputVal = ''
                                this.keepInputVal = ''
                                this.focus = false
                                this.$emit('publish', res.data)
                                this.$toast({message: '发送成功', duration: 1500})
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
                                this.$toast({message: '发送成功', duration: 1500})
                                $('.tool #input').blur()
                            }
                        })
                    }
                }
            } else {
                this.$msgBox({
                    title: '提示',
                    message: '你还未登录，跳转到登录页？',
                    showCancelButton: true,
                    closeOnClickModal: false
                })
                .then(action => {
                    if (action !== 'cancel') {
                        this.$router.push('/login')
                    }
                })
            }
        },
        // 聚焦
        inputFocus() {
            $('.tool #input').focus()
        },
        // 聚焦时候的钩子
        onFocus() {
            this.focus = true
            setTimeout(() => {
                // 移动端聚焦打开键盘的时候，让tool元素位于视图中。ios系统下会被盖住。
                this.$el.scrollIntoView(true)
            }, 100)
            if (this.comment === 'reply' && this.talkReply) {
                this.placeholderVal = `回复 ${this.talkReply.nickname}`
            }
            // 聚焦的时候，监听物理返回键，让input可以按物理键隐藏键盘
            document.addEventListener('backbutton', this.backButtonFocus, false)
        },
        // 失焦时候的钩子
        onBlur() {
            this.focus = false
            // 失焦的时候，移除监听物理返回键
            document.removeEventListener('backbutton', this.backButtonFocus, false)
        },
        // 隐藏键盘
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
        // 用touched来代替click，是为了解决click事件和blur事件的冲突，blur事件触发顺序比click事件早
        this.$el.querySelector('.tool .publish_btn').addEventListener('touchend', (e) => {
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

