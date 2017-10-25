<template>
    <div id="index">
        <index-header/>
        <swiper-container/>
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
    components: {
        indexHeader,
        indexFooter,
        swiperContainer
    },
    methods: {
        ...mapActions('index', [
            'get_indexColumn_data',
            'get_indexActive_cache',
            'get_indexPage_cache',
            'get_indexLocation_cache'
        ]),
        async init() {
            let res = await this.get_indexColumn_data()
            this.get_indexLocation_cache(res)
            this.get_indexPage_cache(res)
            this.get_indexActive_cache()
        }
    },
    created() {
        this.init()
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
