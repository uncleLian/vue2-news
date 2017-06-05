<template>
    <div id="index">
        <!-- header -->
        <index-header></index-header>
        <!-- content -->
        <swiper-container></swiper-container>
        <!-- footer -->
        <index-footer></index-footer>

        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import indexHeader from './components/index_header'
import indexFooter from './components/index_footer'
import swiperContainer from './components/swiperContainer'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        indexHeader,
        indexFooter,
        swiperContainer
    },
    methods: {
        ...mapActions('index',[
            'get_indexActive',
            'get_indexPage',
            'get_indexLocation',
            'get_indexColumn_data',
        ]),
        async init(){
            let res = await this.get_indexColumn_data();
            await Promise.all([this.get_indexPage(res), this.get_indexLocation(res) , this.get_indexActive() ]);
        }
    },
    created(){
        this.init();
    },
}
</script>
<style scoped>
#index {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

</style>
