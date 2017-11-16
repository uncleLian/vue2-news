<template>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper" :class="{isIOS: $store.state.device == 'ios'}">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index'>
            <pull-container :type='item.classpath'></pull-container>
        </swiper-slide>
    </swiper>
</template>
<script>
import pullContainer from './pullContainer'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        pullContainer
    },
    data () {
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
        indexActive() {
            this.slideTo()
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        slideTo() {
            this.$refs.mySwiper.swiper.slideTo(this.activeIndex, 300, true) // 让swiper滚动到index位置
        },
        slideChangeCallBack (swiper) {
            let index = swiper.activeIndex
            this.set_indexActive(this.indexColumn[index].classpath) // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        slideMoveCallBack () {
            this.set_indexSwiper(true)
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        touchEndCallBack () {
            this.set_indexSwiper(false)
        }
    }
}
</script>
<style lang='stylus'>
.swiper-box.isIOS {
    padding-top: 2.83rem;
}
.swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #fff;
    padding-top: 2.295rem;
}
</style>
