<template>
    <transition name='fadeIn'>
        <div id="feedback">
            <!-- 头部 -->
            <my-header fixed title='意见反馈'>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            <!-- 正文 -->
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}" v-swiper:swiperRight='true'>
                <div class="container">
                    <div class="list">
                        <template v-for="(item,index) in json">
                             <!-- 机器人 -->
                            <div class="item robot" v-if="item.type === 'robot'">
                                <img src="~@/assets/img/myColorp.png">
                                <span>{{item.text}}</span>
                            </div>
                            <!-- 用户 -->
                            <div class="item user" v-if="item.type === 'user'">
                                <span>{{item.text}}</span>
                                <img src="~@/assets/img/myColorp.png">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="fb_tool">
                <textarea id='input' v-model.trim='inputVal' placeholder="请填写反馈意见"></textarea>
                <span class="publish_btn" :class="{ hasVal: inputVal.length > 0 ? true : false }">发送</span>
            </div>
        </div>
    </transition>
</template>
<script>
import { autoTextarea } from '@/config/autoTextarea.js'
import { get_local_cache, set_local_cache } from '@/config/cache.js'
// 后台没有做接口，这里只是模拟一下
export default {
    name: 'feedback',
    data() {
        return {
            json: [
                {
                    type: 'robot',
                    text: '您好，欢迎反馈！请填写你对我们的建议，我们会根据用户的需求做出修改'
                }
            ],
            feebBack: '您的反馈我们已经收到了，我们会尽快处理',
            inputVal: ''
        }
    },
    methods: {
        // 获取反馈信息
        get_feedBack_data() {
            let data = JSON.parse(get_local_cache('feedBack'))
            if (data) {
                this.json = data
            }
        },
        // 提交反馈信息
        post_feedBack_data() {
            set_local_cache('feedBack', this.json)
        },
        // 发表
        publish() {
            if (this.inputVal) {
                let user = {
                    type: 'user',
                    text: this.inputVal
                }
                let robot = {
                    type: 'robot',
                    text: this.feebBack
                }
                this.json.push(user)
                this.json.push(robot)
                this.inputVal = ''
                this.post_feedBack_data()
                this.$toast({message: '发送成功', duration: 1500})
                this.$nextTick(() => {
                    $('#feedback .container').scrollTop($('#feedback .list').height())
                })
            }
        }
    },
    mounted() {
        let text = this.$el.querySelector('.fb_tool #input')
        autoTextarea(text, 0, 80)
        this.$el.querySelector('.fb_tool .publish_btn').addEventListener('touchend', () => {
            this.publish()
        })
        this.get_feedBack_data()
    }
}
</script>
<style lang='stylus'>
#feedback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 1000;
    background: #fff;
    overflow: hidden;
    .content {
        padding-bottom: 48px;
        background: #eee;
        .item{
            position: relative;
            width: auto;
            margin: 20px 10px;
            img{
                position: absolute;
                top: 0;
                width: 36px;
                height: 36px;
            }
            span{
                display: inline-block;
                font-size: 16px;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 5px;
                text-align: justify;
            }
            &.robot{
                text-align: left;
                img{
                    left: 0;
                }
                span{
                    margin-left: 50px;
                    margin-right: 20px;
                    background: #fff;
                }
            }
            &.user{
                text-align: right;
                img{
                    right: 0;
                }
                span{
                    margin-right: 50px;
                    margin-left: 20px;
                    background: #b5e648;
                }
           }
        }
    }
    .fb_tool {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 48px;
        z-index: 999;
        display: flex;
        background: #d9d9d9;
        border-top: 1px solid #ddd;
        #input {
            width: 84%;
            height: 40px !important;
            line-height: 40px;
            font-size: 14px;
            border-radius: 10px;
            border: 1px solid #ddd;
            -webkit-appearance: none;
            outline: none;
            resize: none;
            overflow-y: auto !important;
            word-break: break-all;
            margin: 3px;
            padding: 0 6px;
            text-align: center;
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }
        }
        .publish_btn {
            display: table-cell;
            padding-left: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #aaa;
            user-select: none;
            vertical-align: middle;
            &.hasVal {
                color: #00939c;
            }
        }
        span {
            height: 47px;
            line-height: 47px;
            color: #00939c;
        }
    }
}
</style>
