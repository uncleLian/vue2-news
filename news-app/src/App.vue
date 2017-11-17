<template>
    <div id="app">
        <transition :name='transitionName'>
            <keep-alive exclude='detail,login'>
                <router-view class='child-view'></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { get_local_cache } from '@/config/cache'
import { get_uuid, onBackKeyDown, exitApp } from '@/config/cordova'
export default {
    data () {
        return {
            transitionName: ''
        }
    },
    computed: {
        ...mapGetters('login', [
            'isLogin'
        ])
    },
    watch: {
        $route (val) {
            if (this.$route.name === 'home' || this.$route.name === 'video' || this.$route.name === 'collect' || this.$route.path === '/index/user') {
                document.addEventListener('backbutton', onBackKeyDown, false)
                document.removeEventListener('backbutton', exitApp, false)
            } else {
                document.removeEventListener('backbutton', onBackKeyDown, false)
                document.removeEventListener('backbutton', exitApp, false)
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_device',
            'set_userid',
            'set_firstTime'
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
        // App初始化
        app_init () {
            this.firstEnterTime()
            this.checkOS()
        },
        // 缓存初始化
        cache_init() {
            this.get_loginState_cache()
            this.get_historyArticle_cache()
            this.get_collectArticle_cache()
        },
        // 记录打开APP时间
        firstEnterTime () {
            let time = new Date().getTime()
            this.set_firstTime(time)
        },
        // 判断设备系统
        checkOS () {
            var ua = navigator.userAgent.toLowerCase()
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
                    let uuid = get_uuid()   // 获取设备uuid
                    if (uuid) {
                        this.set_userid(uuid)
                    } else {
                        this.set_userid('1')
                    }
                }
            }
        }
    },
    created () {
        this.app_init()
        this.cache_init()
    },
    // 开发环境下不要打开，因为没有cordova的监听事件，页面不能next
    // 线上环境需要打开，保证cordova插件在cordova加载完成之后开始运行
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
