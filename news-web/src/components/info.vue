<template>
    <div class='news_info'>
        <span class="news_label blue" v-if='infoJson.playonlineurl'>视频</span>
        <span class="news_label red" v-else-if="infoJson.istop && infoJson.istop >= 9 ">置顶</span>
        <span class="news_label blue" v-else-if="infoJson.isgood >= 6">荐</span>
        <span class="news_label red" v-else-if="infoJson.firsttitle >= 6">热</span>
        <span class='from' v-if='infoJson.befrom'>{{infoJson.befrom}}</span>
        <span class='news_click' v-if='infoJson.onclick'>{{infoJson.onclick | watchFilter }}阅</span>
        <span class='news_plnum' v-if='infoJson.plnum'>{{infoJson.plnum}}评论</span>
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
    position: relative;
    left: -12.5%;
    width: 125%;
    white-space: normal;
    color: #999;
    margin-top: 6px;
    overflow: hidden;
    font-size: 12.5px;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    span {
        display: inline-block;
    }
    .news_label {
        border-radius: 2px;
        padding: 0 2px;
    }
    .blue {
        color: #fff;
        background: #3d99d4;
    }
    .red {
        color: #fff;
        background: #f85959;
    }
}
</style>
