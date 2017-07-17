<template>
    <span class="collect_btn icon-collect" v-if="btn" @click.stop='collectClick' :class="{active: collectBtn}"> 收藏</span>
    <a class="collect_icon" v-else-if="icon" @click.stop="collectClick" :class="{active: collectBtn}"><i class="icon-collect"></i></a>
</template>
<script>
import {
    mapGetters,
    mapMutations,
    mapActions
} from 'vuex'
import {
    Toast
} from 'mint-ui'
export default {
    props: {
        collect: {
            default: false
        },
        btn: Boolean,
        icon: Boolean
    },
    data() {
        return {
            id: this.$route.query.id,
            collectBtn: false
        }
    },
    computed: {
        ...mapGetters('collect', [
            'collectArticle'
        ]),
        ...mapGetters('detail', [
            'listArticle',
            'historyArticle'
        ])
    },
    watch: {
        collect(val) {
            if (val) {
                this.collectBtn = true
            } else {
                this.collectBtn = false
            }
        }
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        ...mapActions('detail', [
            'send_favorite_data'
        ]),
        ...mapMutations('collect', [
            'set_collectArticle'
        ]),
        collectClick() {
            if (!this.collectBtn) {
                this.collectBtn = true
                let index = this.historyArticle.findIndex((n) => n.id === this.id)
                this.historyArticle[index].collect = this.id
                this.set_historyArticle(this.historyArticle)
                this.collectArticle.unshift(this.listArticle)
                this.set_collectArticle(this.collectArticle)
                Toast({
                    message: '已收藏',
                    duration: 1000
                })
                this.send_favorite_data('collect')
            } else {
                Toast({
                    message: '你已经收藏',
                    duration: 1000
                })
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
.collect_btn {
    display: inline-block;
    width: 80px;
    padding: 10px 0;
    text-align: center;
    border: 1px solid #666;
    border-radius: 20px;
    line-height: 1;
    font-size: 12px;
    color: #333;
    margin-left: 30px;
    &.active {
        border: 1px solid #bbb20d;
        color: #bbb20d;
    }
}
.collect_icon{
    a{
        display: inline-block;
        text-align: center;
        width: 33%;
        font-size: 20px;
        padding-left: 16px;
        text-decoration: none;
    }
    i{
        font-size: 20px;
    }
    &.active {
        color: #bbb20d;
    }
}
</style>
