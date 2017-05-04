<template>
    <div id="recommend" v-if='recommendJson'>
        <h2>精彩推荐</h2>
        <list-item :itemJson="recommendJson"></list-item>
    </div>
</template>
<script>
export default {
    name: 'recommend',
    props: ['recommendJson'],
}
</script>
<style lang='stylus' scoped>
#recommend {
    margin-top: 10px;
}

#recommend h2 {
    display: inline-block;
    font-size: 16px;
    margin: 10px 0 0 16px;
    padding-bottom: 10px;
    font-weight: 400;
    border-bottom: 1px solid #f85959;
}

</style>
