<template>
    <transition name='slideIn' mode='in-out'>
        <div id="index">
            <transition name='fade'>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
            <nav-bar></nav-bar>
        </div>
    </transition>
</template>
<script>
import navBar from './navBar'
export default {
    components: {navBar},
    mounted() {
        document.addEventListener('chcp_updateLoadFailed', function(eventData) {
            console.log('检查更新')
            var error = eventData.detail.error
            if (error.code === -2) {
                MessageBox.confirm('有新的版本，点击确认前往更新').then(action => {
                    document.addEventListener('deviceready', function() {
                        window.open('http://ts.toutiaojk.com/index1.html', '_system', 'location=yes')
                    }, false)
                })
            }
        }, false)

        document.addEventListener('chcp_updateInstalled', function() {
            alert('更新完成1')
        }, false)
    }
}
</script>
<style scoped>
#index {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
