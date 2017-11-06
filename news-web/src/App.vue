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
export default {
    data() {
        return {
            transitionName: ''
        }
    },
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
    position: relative;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    overflow: hidden;
    .child-view {
        transition: all .3s ease;
    }
}
</style>
