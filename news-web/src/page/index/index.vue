<template>
    <div id="index">
        <!-- header -->
        <index-header></index-header>
        <!-- content -->
        <swiper-container></swiper-container>
        <!-- footer -->
        <index-footer></index-footer>
    </div>
</template>
<script>
import indexHeader from './components/index_header'
import indexFooter from './components/index_footer'
import swiperContainer from './components/swiperContainer'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'index',
    components: { indexHeader, indexFooter, swiperContainer },
    methods: {
        ...mapActions([
            'get_indexActive',
            'get_indexPage',
            'get_indexLocation',
            'get_indexColumn_data',
        ]),
    },
    mounted() {
        this.get_indexActive();
        this.get_indexPage();
        this.get_indexLocation();
        this.get_indexColumn_data();
    }
}
</script>
<style scoped>
#index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>
