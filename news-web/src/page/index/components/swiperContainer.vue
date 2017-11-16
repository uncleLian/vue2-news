<template>
    <swiper :options="swiperOption" id="swiper-box" ref="mySwiper">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index'>
            <pull-container :type='item.classpath'></pull-container>
        </swiper-slide>
    </swiper>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import pullContainer from './pullContainer'
export default {
    components: { pullContainer },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack
            }
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexActive',
            'activeIndex',
            'indexColumn'
        ])
    },
    watch: {
        indexActive(val) {
            this.slideTo(300)
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        slideTo(second) {
            this.$refs.mySwiper.swiper.slideTo(this.activeIndex, second, true) // 让swiper滚动到index位置
        },
        slideChangeCallBack(swiper) {
            let index = swiper.activeIndex
            this.set_indexActive(this.indexColumn[index].classpath) // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        slideMoveCallBack() {
            this.set_indexSwiper(true)
        },
        // 移动结束设为false，这是为了移动结束时，可以下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        touchEndCallBack() {
            this.set_indexSwiper(false)
        }
    },
    mounted() {
        this.slideTo(0)
    }
}
</script>
<style lang='stylus'>
#swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #fff;
    padding-top: 80px;
}
</style>
