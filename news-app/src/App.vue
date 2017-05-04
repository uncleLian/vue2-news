<template>
  <div id="app">
    <transition name='fade'>
        <keep-alive exclude='detail'>
          <router-view></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>

import '@/assets/css/reset.css'
import '@/assets/css/icon.css'
import fastClick from 'fastclick'

export default {
  name: 'app',
  methods:{
    isBrowser(){
      var u = navigator.userAgent.toLowerCase();
      if (u.indexOf('iphone') >= 0 || u.indexOf("ipod") >= 0 || u.indexOf("ipad") >= 0 ) {
        this.$store.commit('isIOSMutation',true);
      } else if(u.indexOf("android") >= 0){
        this.$store.commit('isIOSMutation',false);
      }
    },
    dataCollection(){
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?87e080ee32b19db3f8adcacfb178347a";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    }
  },
  created(){
    this.isBrowser();
  },
  mounted(){
    $(function(){
      fastClick.attach(document.body);
    }) 
    this.dataCollection();
  }

}
</script>

<style>

#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f8f8;
}

.fade-enter-active,.fade-leave-active{
  transition: all .2s ease;
}
.fade-enter,.fade-leave-active{
  opacity: 0;
}

</style>

