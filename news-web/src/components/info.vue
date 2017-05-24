<template>
    <div class='news_info'>
        <span class="news_label blue" v-if='infoJson.playonlineurl'>视频</span>
        <span class="news_label blue" v-else-if="infoJson.isgood >= 6">荐</span>
        <span class="news_label red" v-else-if="infoJson.firsttitle >= 6">热</span>
        <span class='from'>{{infoJson.befrom}}</span>
        <span class='news_click'>{{infoJson.onclick | watchFilter }}阅</span>
        <span class='news_time'>{{infoJson.time}}</span>
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
    line-height: 12px;
    color: #999;
    margin-top: 6px;
    span {
        display: inline-block;
        margin-right: 2px;
        border: 1px solid #fff;
    }
    .news_label {
        font-size: 9px;
        border-radius: 2px;
        padding: 0 1px;
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


[data-dpr="2"] .news_info {
    font-size: 20px;
    margin-top: 12px;
    line-height: 24px;
}

[data-dpr="3"] .news_info {
    font-size: 30px;
    margin-top: 18px;
    line-height: 36px;
}
[data-dpr="2"] .news_info span {
    margin-right: 4px;
}
[data-dpr="3"] .news_info span {
    margin-right: 6px;
}

[data-dpr="2"] .news_label {
    font-size: 18px;
    border-radius: 4px;
    padding: 0 2px;
}

[data-dpr="3"] .news_label {
    font-size: 27px;
    border-radius: 6px;
    padding: 0 3px;
}
</style>
