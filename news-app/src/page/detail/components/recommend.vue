<template>
    <div id="recommend" v-if='recommendJson'>
        <h2>精彩推荐</h2>
        <list-item :itemJson="recommendJson"></list-item>
    </div>
</template>
<script>
export default {
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

[data-dpr="2"] #recommend {
    margin-top: 20px;
}

[data-dpr="3"] #recommend {
    margin-top: 30px;
}

[data-dpr="2"] #recommend h2 {
    font-size: 32px;
    margin: 20px 0 0 32px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f85959;
}

[data-dpr="3"] #recommend h2 {
    font-size: 48px;
    margin: 30px 0 0 48px;
    padding-bottom: 30px;
    border-bottom: 3px solid #f85959;
}
</style>
