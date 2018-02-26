<template>
    <div class='news_info'>
        <span class="news_label blue" v-if='json.playonlineurl'>视频</span>
        <span class="news_label red" v-else-if="json.istop && json.istop >= 9 ">置顶</span>
        <span class="news_label blue" v-else-if="json.isgood >= 6">荐</span>
        <span class="news_label red" v-else-if="json.firsttitle >= 6">热</span>
        <span class='news_from' v-if='json.befrom'>{{json.befrom}}</span>
        <span class='news_click' v-if='json.onclick'>{{json.onclick | watchFilter }}阅读</span>
        <span class='news_plnum' v-if='json.plnum'>{{json.plnum}}评论</span>
        <span class='news_time' v-if='json.time'>{{json.time}}</span>
        <span class='news_tag' v-if='json.nlist'>{{json.nlist}}</span>
    </div>
</template>
<script>
export default {
    props: ['json'],
    filters: {
        // 阅读量不够，自己加点戏哈哈哈
        watchFilter(val) {
            let randomVal = Math.floor(Math.random() * 101 + 100)   // 取100 ~ 200的随机数
            if (val) {
                return randomVal + parseInt(val)
            } else {
                return ''
            }
        }
    }
}
</script>
<style lang='stylus'>
.news_info {
    position: relative;
    left: -12.5%;
    width: 125%;
    white-space: normal;
    color: #999;
    margin-top: 6px;
    overflow: hidden;
    font-size: x-small;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    span {
        display: inline-block;
        vertical-align: middle;
    }
    .news_label {
        border-radius: 2px;
        padding: 0px 2px 1px;
    }
    .blue {
        color: #fff;
        background: #00939c;
    }
    .red {
        color: #fff;
        background: #f85959;
    }
}
</style>
