<template>
    <!-- 按钮 -->
    <span class="collect_btn icon-collect" v-if="type === 'btn'" @click.stop='collect' :class="{active: json.collect? true : false}"> 收藏</span>
    <!-- 图标 -->
    <a class="collect_icon" v-else-if="type === 'icon'" @click.stop="collect" :class="{active: json.collect? true : false}"></a>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: {
        json: Object,
        type: String
    },
    computed: {
        ...mapGetters('detail', [
            'listArticle',
            'historyArticle'
        ]),
        ...mapGetters('collect', [
            'collectArticle'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        ...mapMutations('collect', [
            'set_collectArticle'
        ]),
        ...mapActions('detail', [
            'post_favorite_data'
        ]),
        collect() {
            if (this.json.collect) {
                this.$toast({message: '你已经收藏', duration: 1000})
            } else {
                this.json.collect = this.json.id                // 修改文章收藏标识
                this.json.collectnum++                          // 修改文章收藏数量
                this.set_historyArticle(this.historyArticle)    // 更新文章缓存
                this.collectArticle.unshift(this.listArticle)   // 修改收藏数据
                this.set_collectArticle(this.collectArticle)    // 设置收藏本地缓存
                this.post_favorite_data('collect')              // 提交收藏数据
                this.$toast({message: '已收藏', duration: 1000})
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
        border: 1px solid #d43d3d;
        color: #d43d3d;
    }
}
</style>
<style scoped>
.collect_icon{
    background: url(~@/assets/img/collect.png)no-repeat center center;
    background-size: 18.5px;
}
.collect_icon.active{
    background: url(~@/assets/img/collect-active.png)no-repeat center center;
    background-size: 18.5px;
}
</style>
