<template>
    <mt-tabbar fixed v-model="selected" id='tabBar'>
        <mt-tab-item id="home" @click.native="$router.push('home')"> 
            <img slot="icon" src="../../assets/icon/home.png">主页
        </mt-tab-item>
        <mt-tab-item id="video" @click.native="$router.push('video')">
            <img slot="icon" src="../../assets/icon/video.png">视频
        </mt-tab-item>
        <mt-tab-item id="collect" @click.native="$router.push('collect')">
            <img slot="icon" src="../../assets/icon/shouchang.png">
        收藏</mt-tab-item>
        <mt-tab-item id="user" @click.native="$router.push('user')">
            <img slot="icon" src="../../assets/icon/my.png">个人
        </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
    data() {
        return {
            selected: 'home',
        }
    },
    methods: {
        init() {
            if (this.$route.name) {
                this.selected = this.$route.name
            } else if (this.$route.path.includes('user')) {
                this.selected = 'user'
            }
        },
    },
    watch: {
        $route() {
            this.init();
        },
    },
    activated() {
        this.init();
    }
}
</script>
<style scoped>
</style>