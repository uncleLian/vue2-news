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
        isBrowser() {
            var u = navigator.userAgent.toLowerCase();
            if (u.indexOf('iphone') >= 0 || u.indexOf("ipod") >= 0 || u.indexOf("ipad") >= 0) {
                this.$store.commit('isIOSMutation', true);
            } else if (u.indexOf("android") >= 0) {
                this.$store.commit('isIOSMutation', false);
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
        this.isBrowser();
        this.dataCollection();
    }

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
