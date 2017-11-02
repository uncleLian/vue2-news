<template>
    <div id="app">
        <transition :name='transitionName'>
            <keep-alive exclude='detail'>
                <router-view class='child-view'></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { get_local_cache } from '@/config/cache'
export default {
    data () {
        return {
            transitionName: ''
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     document.addEventListener('deviceready', () => {
    //         next()
    //     }, false)
    // },
    beforeRouteUpdate (to, from, next) {
        let isBack = this.$router.isBack
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    },
    computed: {
        ...mapGetters('login', [
            'isLogin'
        ])
    },
    watch: {
        $route (val) {
            if (this.$route.name === 'home' || this.$route.name === 'video' || this.$route.name === 'collect' || this.$route.path === '/index/user') {
                document.addEventListener('backbutton', this.onBackKeyDown, false)
                document.removeEventListener('backbutton', this.exitApp, false)
            } else {
                document.removeEventListener('backbutton', this.onBackKeyDown, false)
                document.removeEventListener('backbutton', this.exitApp, false)
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_device',
            'set_userid',
            'set_firstTime',
            'set_deviceUa'
        ]),
        ...mapMutations('login', [
            'set_isLogin'
        ]),
        ...mapMutations('user', [
            'set_userInfo'
        ]),
        ...mapActions('detail', [
            'get_historyArticle_cache'
        ]),
        ...mapActions('collect', [
            'get_collectArticle_cache'
        ]),
        // 记录打开APP时间
        firstEnterTime () {
            let time = new Date().getTime()
            this.set_firstTime(time)
        },
        // 判断设备系统
        checkOS () {
            var ua = navigator.userAgent.toLowerCase()
            this.set_deviceUa(ua)
            if (/iphone|ipad|ipod/.test(ua)) {
                this.set_device('ios')
            }
        },
        // 获取登录状态
        get_loginState_cache() {
            if (!this.isLogin) {
                let isLogin = get_local_cache('isLogin')
                if (isLogin) {
                    this.set_isLogin(isLogin)
                    if (isLogin === 'wx') {
                        let userInfo = JSON.parse(get_local_cache('userInfo'))
                        this.set_userInfo(userInfo)
                        this.set_userid(userInfo.unionid)
                    }
                } else {
                    document.addEventListener('deviceready', () => {
                        this.set_userid(device.uuid)
                    }, false)
                }
            }
        },
        // 监听物理返回键
        onBackKeyDown() {
            this.$toast({
                message: '再点击一次退出程序',
                position: 'bottom',
                duration: 2000
            })
            document.removeEventListener('backbutton', this.onBackKeyDown, false)
            document.addEventListener('backbutton', this.exitApp, false)
            var timer = setTimeout(() => {
                document.removeEventListener('backbutton', this.exitApp, false)
                document.addEventListener('backbutton', this.onBackKeyDown, false)
                clearTimeout(timer)
            }, 2000)
        },
        exitApp() {
            navigator.app.exitApp()
        },
        app_init () {
            this.firstEnterTime()
            this.checkOS()
        },
        cache_init() {
            this.get_loginState_cache()
            this.get_historyArticle_cache()
            this.get_collectArticle_cache()
        }
    },
    created () {
        this.app_init()
        this.cache_init()
    }
}
</script>
<style lang='stylus'>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #f8f8f8;
    .child-view {
        transition: all .3s ease;
    }
}
</style>
