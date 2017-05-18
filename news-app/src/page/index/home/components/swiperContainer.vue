<template>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper" :class="{isIOS:$store.state.isIOS}">
        <swiper-slide v-for='(item,index) in columnJson' :key='index'>
            <pull-container :type='item.type'></pull-container>
        </swiper-slide>
    </swiper>
</template>
<script>
import { mapGetters } from 'vuex'
import pullContainer from './pullContainer'
export default {
    name: 'swiperContainer',
    components: { pullContainer},
    props:['columnJson'],
    data() {
        return {
            active: 0,
            swiperOption: {
                notNextTick: true,
                direction: 'horizontal',
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack,
            }
        }
    },
    methods: {
        slideChangeCallBack(swiper) {
            this.active = swiper.activeIndex;
        },
        slideMoveCallBack() {
            this.$store.commit('indexSwiper', true);
        },
        touchEndCallBack() {
            this.$store.commit('indexSwiper', false);
        },
    },
    computed: {
        ...mapGetters([
          'indexActive',
        ]),
        swiper() {
            return this.$refs.mySwiper.swiper
        },
    },
    watch: {
        active(val) {
            this.swiper.slideTo(val, 300, true);
            this.$store.commit('indexActive', val);
        },
        indexActive(val){
            this.active = val;
        },
    },
    mounted() {
        this.$nextTick(function () {this.swiper.slideTo(this.active, 0, false)})
    },
}
</script>
<style scoped>
.swiper-box.isIOS{
    padding-top: 100px;
}
.swiper-box {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    z-index: 0;
    background: #fff;
}
</style>
