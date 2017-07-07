<template>
    <transition name='fadeIn'>
        <div id="readHistory">
            <div class="myheader">
                <!--<div class="iosHeader"></div>-->
                <my-header fixed title='历史记录'>
                    <a class="back" slot='left' @click='$router.go(-1)'></a>
                    <a slot='right' @click='editToggle'>清除</a>
                </my-header>
            </div>
            <div id="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <list-item :itemJson='get_historyArticle'></list-item>
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
            'get_historyArticle'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        editToggle() {
            this.set_historyArticle({})
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
    #content {
        width: 100%;
        height: 100%;
        padding-top: 44px;
        position: relative;
        background: #ffffff;
        &.isIOS {
            padding-top: 64px;
        }
        .container {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            position: relative;
        }
    }
}
</style>
