<template>
    <div id="index">
        <!-- 头部 -->
        <index-header/>
        <!-- 内容区域 -->
        <swiper-container/>
        <!-- 底部 -->
        <index-footer/>
        <!-- 子页面视图 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import indexHeader from './components/index_header'
import indexFooter from './components/index_footer'
import swiperContainer from './components/swiperContainer'
import { mapActions } from 'vuex'
export default {
    components: { indexHeader, indexFooter, swiperContainer },
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
#index {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
