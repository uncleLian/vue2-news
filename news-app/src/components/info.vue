<template>
    <div class='news_info'>
        <span class="news_label blue" v-if='infoJson.playonlineurl'>视频</span>
        <span class="news_label red" v-else-if="infoJson.istop && infoJson.istop >= 9 ">置顶</span>
        <span class="news_label blue" v-else-if="infoJson.isgood >= 6">荐</span>
        <span class="news_label red" v-else-if="infoJson.firsttitle >= 6">热</span>
        <span class='from' v-if='infoJson.befrom'>{{infoJson.befrom}}</span>
        <span class='news_click' v-if='infoJson.onclick'>{{infoJson.onclick | watchFilter }}阅</span>
        <span class='news_time' v-if='infoJson.time'>{{infoJson.time}}</span>
    </div>
</template>
<script>
export default {
    props: ['infoJson'],
    filters: {
        watchFilter(val) {
            if (!val) return ''
            return 107 + parseInt(val)
        },
    }
}
</script>
<style lang='stylus' scoped>
.news_info {
    font-size: 10px;
    color: #999;
    margin-top: 6px;
    overflow: hidden;
    span {
        display: inline-block;
        margin-right: 2px;
    }
    .news_label {
        font-size: 9px;
        height: 12px;
        line-height: 13px;
        border-radius: 2px; 
    }
    .blue {
        color: #3d99d4;
        border: 1px solid #3d99d4;
    }
    .red {
        color: #f85959;
        border: 1px solid rgba(248, 89, 89, .5);
    }
}
</style>
