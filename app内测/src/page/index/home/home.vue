<template>
    <div id="home">
        <!-- header -->
        <home-header :column='indexColumn'></home-header>
        <!-- content -->
        <swiper-container :column='indexColumn'></swiper-container>
        
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import homeHeader from './components/homeHeader'
import swiperContainer from './components/swiperContainer'
import { mapGetters, mapActions} from 'vuex'
export default {
    components: { homeHeader, swiperContainer },
    computed: {
        ...mapGetters('index',[
          'indexColumn',
        ]),
    },
    methods: {
        ...mapActions('index',[
            'get_indexColumn_data',
        ]),
    },
    created(){
        this.get_indexColumn_data();
    },
}
</script>
<style scoped>
#home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
}
</style>
