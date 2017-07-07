<template>
    <div id='evaluate'>
        <span class="like_btn icon-zan" @click.stop='likeClick' :class="{active: likeBtn}"> {{likeNum}}</span>
        <span class="collect_btn icon-collect" @click.stop='collectClick' :class="{active: collectBtn}"> 收藏</span>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
    props: {
        num: {
            default: 0
        },
        like: {
            default: false
        },
        collect: {
            default: false
        }
    },
    data () {
        return {
            id: this.$route.query.id,
            likeNum: 0,
            likeBtn: false,
            collectBtn: false
        }
    },
    computed: {
        ...mapGetters([
            'userid'
        ]),
        ...mapGetters('login', [
            'login'
        ]),
        ...mapGetters('collect', [
            'collectArticle'
        ]),
        ...mapGetters('detail', [
            'listArticle',
            'historyArticle',
            'datafrom'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        ...mapActions('detail', [
            'send_user_data'
        ]),
        ...mapMutations('collect', [
            'set_collectArticle'
        ]),
        send_data (type) {
            let params = {
                wdata: type,
                id: this.id,
                userid: this.userid,
                datafrom: this.datafrom
            }
            this.send_user_data(params)
        },
        likeClick () {
            if (!this.likeBtn) {
                this.likeNum += 1
                this.likeBtn = true
                let index = this.historyArticle.findIndex((n) => n.id === this.id)
                this.historyArticle[index].giveup = this.id
                this.historyArticle[index].diggtop++
                this.set_historyArticle(this.historyArticle)
                Toast({ message: '点赞成功', duration: 1000 })
                this.send_data('giveup')
            } else {
                Toast({ message: '你已经赞过', duration: 1000 })
            }
        },
        collectClick () {
            if (!this.collectBtn) {
                    this.collectBtn = true
                    let index = this.historyArticle.findIndex((n) => n.id === this.id)
                    this.historyArticle[index].collect = this.id
                    this.set_historyArticle(this.historyArticle)
                    this.collectArticle.unshift(this.listArticle)
                    this.set_collectArticle(this.collectArticle)
                    Toast({message: '已收藏', duration: 1000})
                    this.send_data('collect')
            } else {
                Toast({message: '你已经收藏', duration: 1000})
            }
        }
    },
    watch: {
        num (val) {
            this.likeNum = Number(val)
        },
        like (val) {
            if (val) {
                this.likeBtn = true
            }
        },
        collect (val) {
            if (val) {
                this.collectBtn = true
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
#evaluate {
    text-align: center;
    span {
        display: inline-block;
        width: 80px;
        padding: 10px 0;
        text-align: center;
        border: 1px solid #666;
        border-radius: 20px;
        line-height: 1;
        font-size: 12px;
        color: #333;
    }
    .like_btn {
        &.active {
            border: 1px solid #d81e06;
            color: #d81e06;
        }
    }
    .collect_btn {
        margin-left: 30px;
        &.active {
            border: 1px solid #bbb20d;
            color: #bbb20d;
        }
    }
}
</style>
