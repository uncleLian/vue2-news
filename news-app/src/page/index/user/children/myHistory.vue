<template>
    <transition name='fadeIn'>
        <div id="history">
            <!-- 头部 -->
            <my-header fixed title='历史记录' v-goTop:click='true'>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
                <a slot='right' class="clean" @click='cleanHistory'>清除</a>
            </my-header>
            <!-- 正文 -->
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
    name: 'myHistory',
    computed: {
        ...mapGetters('detail', [
            'historyArticle'
        ])
    },
    watch: {
        $route(to, from) {
            if (from.path.includes('user')) {
                this.$nextTick(() => {
                    $('#history .container').scrollTop(0)
                })
            }
        }
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        cleanHistory() {
            this.set_historyArticle([])
        },
        handleLocaltion(type) {
            if (type === 'get') {
                if (this.localtion > 0) {
                    $('#history .container').scrollTop(this.localtion)
                }
            } else if (type === 'set') {
                let scrollTop = $('#history .container').scrollTop()
                this.localtion = scrollTop
            }
        }
    },
    activated () {
        this.handleLocaltion('get')
    },
    deactivated () {
        this.handleLocaltion('set')
    }
}
</script>
<style lang='stylus'>
#history {
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
