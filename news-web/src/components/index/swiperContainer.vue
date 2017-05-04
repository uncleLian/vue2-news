<template>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
        <swiper-slide v-for='(item,index) in contentJson' class="swiper-item" :key='index'>
            <pull-container :type='item.type'></pull-container>
        </swiper-slide>
    </swiper>
</template>
<script>
import pullContainer from './pullContainer'
export default {
    name: 'swiperContainer',
    props: ['contentJson'],
    components: {
        pullContainer
    },
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
        init() {
            const index = sessionStorage.getItem('indexActive');
            if (index) {
                this.active = index;
                this.swiper.slideTo(index, 0, false);
            }
        },
        slideChangeCallBack(swiper) {
            this.active = swiper.activeIndex;
        },
        slideMoveCallBack(swiper, event) {
            this.$store.commit('swiperMoveChange', true);
        },
        touchEndCallBack(swiper) {
            this.$store.commit('swiperMoveChange', false);
        },
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        stateIndex() {
            return this.$store.state.indexActive
        },
    },
    watch: {
        active(val) {
            this.$store.commit('indexActiveMutation', val);
        },
        stateIndex(val) {
            this.swiper.slideTo(val, 300, true);
        },
    },
    mounted() {
        this.init(); // 初始化组件状态
    },
}
</script>
<style scoped>
.swiper-box {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    z-index: 0;
    background: #fff;
}

.swiper-item {
    height: 100%;
}

[data-dpr="2"] .swiper-box {
    padding-top: 160px;
}

[data-dpr="3"] .swiper-box {
    padding-top: 240px;
}
</style>
