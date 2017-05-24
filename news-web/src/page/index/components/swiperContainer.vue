<template>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index'>
            <pull-container :type='item.classpath'></pull-container>
        </swiper-slide>
    </swiper>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import pullContainer from './pullContainer'
export default {
    components: { pullContainer},
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
        ...mapMutations([
            'set_indexActive',
            'set_indexSwiper',
        ]),
        slideChangeCallBack(swiper) {
            this.active = swiper.activeIndex;
        },
        slideMoveCallBack() {
            this.set_indexSwiper(true)
        },
        touchEndCallBack() {
            this.set_indexSwiper(false)
        },
    },
    computed: {
        ...mapGetters([
          'indexActive',
          'indexColumn',
        ]),
        swiper() {
            return this.$refs.mySwiper.swiper
        },
    },
    watch: {
        active(val) {
            this.swiper.slideTo(val, 300, true);
            this.set_indexActive(this.indexColumn[val].classpath);
        },
        indexActive(val) {
            this.active = this.indexColumn.findIndex(obj => obj.classpath == val);
        },
    },
    mounted() {
        this.$nextTick(function () {this.swiper.slideTo(this.active, 0, false)})
    },
}
</script>
<style scoped>
.swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #fff;
    padding-top: 80px;
}

[data-dpr="2"] .swiper-box{
    padding-top: 160px;
}
[data-dpr="3"] .swiper-box{
    padding-top: 240px;
}
</style>
