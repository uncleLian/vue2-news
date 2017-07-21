<template>
    <span class="like_btn icon-zan" @click.stop='likeClick' :class="{active: json.giveup? true : false }"> {{json.giveupnum}}</span>
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
        json: {
            default: ''
        }
    },
    data() {
        return {
            id: this.$route.query.id
        }
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
        ...mapActions('detail', [
            'send_favorite_data'
        ]),
        likeClick() {
            if (this.json.giveup) {
                Toast({message: '你已经赞过', duration: 1000})
            } else {
                this.json.giveup = this.id
                this.json.giveupnum++
                this.set_historyArticle(this.historyArticle)
                Toast({message: '点赞成功', duration: 1000})
                this.send_favorite_data('giveup')
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
