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

export default {
    data() {
        return {
            transitionName: ''
        }
    },
    beforeRouteUpdate(to, from, next) {
        let isBack = this.$router.isBack
        if (isBack) {
            this.transitionName = 'slide-right'
        } else {
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false
        next()
    },
    methods: {
        phoneSystem() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                this.$store.commit('apkURLChange', '') //ios
            } else if (/android/.test(ua)) {
                this.$store.commit('apkURLChange', '../toutiaojk.apk') //android
            }
        },
        dataCollection() {
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?87e080ee32b19db3f8adcacfb178347a";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        }
    },
    mounted() {
        $(function() {
            fastClick.attach(document.body);
        })
        this.phoneSystem();
        this.dataCollection();
    },
}
</script>
<style>
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
