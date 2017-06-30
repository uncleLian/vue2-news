<template>
    <div id="index">
        <transition name='fade'>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <!-- <nav-bar></nav-bar> -->
    </div>
</template>
<script>
import navBar from './navBar'
export default {
    components: {
        navBar
    },
    mounted(){
         document.addEventListener('chcp_updateInstalled', function(eventData){
          console.log('chcp_updateInstalled');
          console.log('安装完成index');
        }, false);
    }
}
</script>
<style scoped>
#index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*padding-bottom: 55px;*/
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
