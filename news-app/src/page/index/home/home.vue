<template>
    <div id="home">
        <!-- 头部 -->
        <home-header/>
        <!-- 内容区域 -->
        <swiper-container></swiper-container>
        <!-- 子页面视图 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import homeHeader from './components/homeHeader'
import swiperContainer from './components/swiperContainer'
import { mapActions } from 'vuex'
export default {
    name: 'home',
    components: { homeHeader, swiperContainer },
    methods: {
        ...mapActions('index', [
            'get_indexColumn_data'
        ])
    },
    created() {
        this.get_indexColumn_data()
    }
}
</script>
<style lang='stylus'>
#home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
}
</style>
