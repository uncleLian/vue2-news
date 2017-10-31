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
import { Toast } from 'mint-ui'
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
            'login'
        ])
    },
    methods: {
        ...mapMutations([
            'set_device',
            'set_userid',
            'set_firstTime',
            'set_deviceUa'
        ]),
        ...mapActions('login', [
            'get_user'
        ]),
        ...mapActions('detail', [
            'get_historyArticle_cache'
        ]),
        init () {
            this.firstEnterTime()
            this.checkOS()
            this.cache_init()
        },
        cache_init() {
            this.get_historyArticle_cache()
        },
        firstEnterTime () {
            let time = new Date().getTime()
            this.set_firstTime(time)
        },
        checkOS () {
            var ua = navigator.userAgent.toLowerCase()
            this.set_deviceUa(ua)
            if (/iphone|ipad|ipod/.test(ua)) {
                this.set_device('ios')
            }
        },
        onBackKeyDown() {
            Toast({
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
        }
    },
    created () {
        this.get_user()
        document.addEventListener('deviceready', () => {
            if (!this.login) {
                this.set_userid(device.uuid)
            }
        }, false)
        this.init()
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
