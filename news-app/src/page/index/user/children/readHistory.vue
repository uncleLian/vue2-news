<template>
    <transition name='fadeIn'>
        <div id="readHistory">
            <div class="myheader">
                <!--<div class="iosHeader"></div>-->
                <my-header fixed title='历史记录'>
                    <a class="back-white" slot='left' @click='$router.go(-1)'></a>
                    <a slot='right' class="clean" @click='editToggle()'>清除</a>
                </my-header>
            </div>
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight='true'>
                    <list-item :itemJson='historyArticle'></list-item>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'readHistory',
    data() {
        return {}
    },
    computed: {
        ...mapGetters('detail', [
            'historyArticle'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        editToggle() {
            this.set_historyArticle([])
        }
    }
}
</script>
<style scoped lang='stylus'>
#readHistory {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    .content {
        position: relative;
        background: #ffffff;
    }
}
</style>
