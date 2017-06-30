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
import '@/assets/css/reset.css'
import '@/assets/css/icon.css'
import fastClick from 'fastclick'
import { mapGetters,mapMutations, mapActions } from 'vuex'
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            transitionName: ''
        }
    },
    // beforeRouteEnter(to, from, next){
    //     Indicator.open();
    //     document.addEventListener("deviceready", () => {
    //         Indicator.close();
    //         next();
    //     }, false);
    // },
    beforeRouteUpdate(to, from, next) {
        let isBack = this.$router.isBack;
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    },
    computed:{
        ...mapGetters('login',[
            'login',
            'wx',
            'qq',
        ])
    },
    methods: {
        ...mapMutations([
            'set_device',
            'set_userid',
            'set_firstTime',
        ]),
        ...mapActions('login',[
            'get_user',
        ]),
        init(){
            this.firstEnterTime();
            this.checkOS();
            this.baiduCollect();
            $(function() {
                fastClick.attach(document.body);
            })
        },
        checkOS() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                this.set_device('ios');
            }
        },
        baiduCollect() {
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?87e080ee32b19db3f8adcacfb178347a";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        },
        onBackKeyDown() {
            window.plugins.toast.showShortBottom('再点击一次退出程序');
            document.removeEventListener("backbutton", this.onBackKeyDown, false);
            document.addEventListener("backbutton", this.exitApp, false);
            var timer = setTimeout(function() {
                document.removeEventListener("backbutton", this.exitApp, false);
                document.addEventListener("backbutton", this.onBackKeyDown, false);
                clearTimeout(timer);
            }, 2000);
        },
        exitApp() {
            navigator.app.exitApp();
        },
        firstEnterTime(){ 
            let time = new Date().getTime();
            this.set_firstTime(time);
        },
    },
    watch: {
        // $route(val) {
        //     if (this.$route.name != 'index') {
        //         document.removeEventListener("backbutton", this.onBackKeyDown, false);
        //         document.removeEventListener("backbutton", this.exitApp, false);
        //     }
        // }
    },
    // activated() {
    //     document.addEventListener("backbutton", this.onBackKeyDown, false);
    // },
    created(){
        this.get_user();
        document.addEventListener("deviceready", () => {
            if(!this.login){
                this.set_userid(device.uuid);
            }
        }, false);
        this.init();
    },
}
</script>
<style>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: #f8f8f8;
}

.child-view {
    transition: all .3s ease;
}

.slide-left-enter,
.slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    transform: translate3d(-100%, 0, 0);
}

</style>
