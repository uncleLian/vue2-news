<template>
    <transition name='slideIn' mode='in-out'>
        <div id="index">
            <template v-if="!advertisement">
                <!-- 视图 -->
                <transition name='fade'>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <!-- 底部导航栏 -->
                <nav-bar></nav-bar>
            </template>

            <!-- 广告页 -->
            <div class="coverAd" v-if="advertisement">
                <img class="coverOne"  v-if="coverImg" :src="coverImg">
                <img src="~@/assets/icon/1.png">
                <button @click.stop="advertisement = false">
                    <span>跳过</span>
                </button>
            </div>
        </div>
    </transition>
</template>
<script>
import navBar from './navBar'
import { mapActions } from 'vuex'
export default {
    name: 'index',
    components: { navBar },
    data() {
        return {
            advertisement: false,   // 广告状态
            time: 3000,             // 广告倒计时
            coverImg: ''            // 广告图片
        }
    },
    methods: {
        ...mapActions('index', [
            'get_coverImg_data'     // 获取广告图片
        ]),

        // 广告初始化
        addvertisement_init() {
            // 如果网络畅通，请求广告图片，否则直接进入主页
            if (navigator.onLine) {
                this.advertisement = true
                this.get_coverImg_data()
                .then(res => {
                    if (res) {
                        this.coverImg = res.data
                    }
                    let timer = setTimeout(() => {
                        this.advertisement = false
                        clearTimeout(timer)
                    }, this.time)
                })
                .catch(() => {
                    this.$toast('请求图片错误')
                    console.log('请求图片数据错误')
                    this.advertisement = false
                })
            } else {
                this.advertisement = false
            }
        },
        // 极光推送
        // newsPush() {
        //     document.addEventListener('deviceready', () => {
        //         window.plugins.jPushPlugin.init()
        //         window.plugins.jPushPlugin.setDebugMode(true)
        //         window.plugins.jPushPlugin.openNotificationInAndroidCallback = (data) => {
        //             this.$router.push(`/detail?classid=${data.extras.classid}&id=${data.extras.id}&datafrom=${data.extras.datafrom}`)
        //             window.plugins.jPushPlugin.resetBadge()
        //             window.plugins.jPushPlugin.setBadge(0)
        //             window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0)
        //         }
        //         window.plugins.jPushPlugin.resetBadge()
        //         window.plugins.jPushPlugin.setBadge(0)
        //         window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0)
        //         window.plugins.jPushPlugin.clearLocalNotifications()
        //     }, false)
        // },
        // 版本更新
        versionUpdate() {
            document.addEventListener('chcp_updateLoadFailed', (eventData) => {
                let error
                error = eventData.detail.error
                if (error.code === -2) {
                    MessageBox.confirm('有新的版本，点击确认前往更新').then(action => {
                        document.addEventListener('deviceready', () => {
                            window.open('http://m.toutiaojk.com/download.html', '_system', 'location=yes')
                        }, false)
                    })
                }
            }, false)
        }
    },
    created() {
        this.addvertisement_init()   // 广告初始化
        this.versionUpdate()         // 版本更新
    }
}
</script>
<style lang='stylus'>
#index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .coverAd {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        .coverOne {
            width: 100%;
            height: 80%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
        }
        img {
            width: 100%;
            height: 100%;
        }
        button {
            position: absolute;
            width: 55px;
            height: 26px;
            top: 75%;
            right: 10px;
            background: #333;
            border-radius: 5px;
            -moz-opacity: 0.7;
            opacity: 0.7;
            margin: 0 auto;
            border: 1px solid #e2e2e2;
            z-index: 1000;
            span {
                color: #ffffff;
                width: 55px;
                height: 24px;
                margin: 0 auto;
                text-align: center;
                font-size 12px;
                display: table-cell;
                vertical-align: middle;
            }
        }
    }
}
</style>
