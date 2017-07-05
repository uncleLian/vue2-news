<template>
    <div id="recommend" v-if='json'>
        <h2>精彩推荐</h2>
        <list-item :itemJson="json"></list-item>
    </div>
</template>
<script>
export default {
    props: ['json']
}
</script>
<style scoped lang='stylus'>
#recommend {
    width: 100%;
    position: relative;
    h2 {
        display: inline-block;
        font-size: 16px;
        margin: 10px 0 0 16px;
        padding-bottom: 10px;
        font-weight: 400;
        border-bottom: 1px solid #f85959;
    }
}
</style>
