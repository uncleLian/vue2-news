<template>
    <div id="tags">
        <router-link v-for='(item,index) in tagsData' :to="`/search?key=${item}`" :key="index">{{item}}</router-link>
    </div>
</template>
<script>
export default {
    props: ['json'],
    computed: {
        tagsData() {
            if (this.json) {
                return this.json.match(/[\u4e00-\u9fa5]+/g).slice(0, 4)  // 匹配中文，并且取4个关键词
            } else {
                return ''
            }
        }
    }
}
</script>
<style lang='stylus'>
#tags {
    width: 100%;
    position: relative;
    margin: 20px 0;
    a {
        display: inline-block;
        text-align: center;
        color: #333;
        border: 1px solid rgb(238, 238, 238);
        border-radius: 5px;
        font-size: 12px;
        padding: 4px 8px;
        background: #fff;
        margin: 0 0 10px 10px;
    }
}
</style>
