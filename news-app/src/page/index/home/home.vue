<template>
    <div id="home">
        <!-- header -->
        <home-header></home-header>
        <!-- content -->
        <swiper-container></swiper-container>

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
    methods: {
        ...mapActions('index',[
            'get_indexActive',
            'get_indexPage',
            'get_indexLocation',
            'get_indexColumn_data',
        ]),
        async init(){
            let res = await this.get_indexColumn_data();
            await this.get_indexPage(res);
            await this.get_indexLocation(res);
            await this.get_indexActive();
        },
        onBackKeyDown() {
            window.plugins.toast.showShortBottom('再点击一次退出程序');
            document.removeEventListener("backbutton", this.onBackKeyDown, false);
            document.addEventListener("backbutton", this.exitApp, false);
            var timer = setTimeout(function() {
                document.removeEventListener("backbutton", this.exitApp, false);
                document.addEventListener("backbutton", this.onBackKeyDown, false);
                clearTimeout(timer);
            }, 2000);
        },
        exitApp() {
            navigator.app.exitApp();
        },
    },
    watch: {
        $route(val) {
            if (this.$route.name != 'index') {
                document.removeEventListener("backbutton", this.onBackKeyDown, false);
                document.removeEventListener("backbutton", this.exitApp, false);
            }
        }
    },
    activated() {
        document.addEventListener("backbutton", this.onBackKeyDown, false);
    },
    mounted() {
        this.init();
    }
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
