<template>
    <span class="like_btn icon-zan" @click.stop='likeClick' :class="{active: likeBtn}"> {{likeNum}}</span>
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
        num: {
            default: 0
        },
        like: {
            default: false
        }
    },
    data() {
        return {
            id: this.$route.query.id,
            likeNum: 0,
            likeBtn: false
        }
    },
    computed: {
        ...mapGetters('detail', [
            'historyArticle'
        ])
    },
    watch: {
        num(val) {
            this.likeNum = Number(val)
        },
        like(val) {
            if (val) {
                this.likeBtn = true
            } else {
                this.likeBtn = false
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
        likeClick() {
            if (!this.likeBtn) {
                this.likeNum++
                this.likeBtn = true
                let index = this.historyArticle.findIndex((n) => n.id === this.id)
                this.historyArticle[index].giveup = this.id
                this.historyArticle[index].diggtop++
                this.set_historyArticle(this.historyArticle)
                Toast({
                    message: '点赞成功',
                    duration: 1000
                })
                this.send_favorite_data('giveup')
            } else {
                Toast({
                    message: '你已经赞过',
                    duration: 1000
                })
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
.like_btn {
    display: inline-block;
    width: 80px;
    padding: 10px 0;
    text-align: center;
    border: 1px solid #666;
    border-radius: 20px;
    line-height: 1;
    font-size: 12px;
    color: #333;
    &.active {
        border: 1px solid #d81e06;
        color: #d81e06;
    }
}
</style>
