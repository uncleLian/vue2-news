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
            'get_indexActive',
            'get_indexPage',
            'get_indexLocation',
            'get_indexColumn_data',
        ]),
        async init(){
            let res = await this.get_indexColumn_data();
            await Promise.all([this.get_indexPage(res), this.get_indexLocation(res) , this.get_indexActive() ]);
        },
    },
    created(){
        this.init();
    },
}
</script>
<style scoped>
#home {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
