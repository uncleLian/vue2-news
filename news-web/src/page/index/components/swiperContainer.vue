<template>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
        <swiper-slide v-for='(item,index) in column' :key='item'>
            <pull-container :type='item.classpath'></pull-container>
        </swiper-slide>
    </swiper>
</template>
<script>
import { mapGetters , mapMutations } from 'vuex'
import pullContainer from './pullContainer'
export default {
    components: {  pullContainer },
    props: ['column'],
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack,
            }
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexActive',
            'activeIndex',
        ]),
    },
    watch: {
        indexActive() {
            this.$refs.mySwiper.swiper.slideTo(this.activeIndex, 300, true);
        },
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexSwiper',
        ]),
        slideChangeCallBack(swiper) {
            let index = swiper.activeIndex;
            this.set_indexActive(this.column[index].classpath);
        },
        slideMoveCallBack() {
            this.set_indexSwiper(true);
        },
        touchEndCallBack() {
            this.set_indexSwiper(false);
        },
    },
}
</script>
<style scoped lang='stylus'>
.swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #fff;
    padding-top: 80px;
}
</style>
