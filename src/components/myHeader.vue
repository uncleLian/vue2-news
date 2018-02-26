<template>
    <!-- 因为mint-ui的header不符合我需求，只能自己封装了 -->
    <header class="myHeader" :class="{ 'fixed': fixed }">
        <div class="top_bar">
            <div class="abs_l"><slot name="left"></slot></div>
            <div class="abs_m">{{title}}<slot name="mid"></slot></div>
            <div class="abs_r"><slot name="right"></slot></div>
        </div>
    </header>
</template>
<script>
export default {
    props: {
        fixed: Boolean,
        title: String
    }
}
</script>
<style lang='stylus'>
header_height = 1.335rem
.myHeader{
    display: block;
    position: relative;
    overflow: hidden;
    background-color: #00939c;
    color: #fff;
    font-size: 16px;
    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 666;
    }
    .top_bar {
        position: relative;
        height: header_height;
        user-select: none;
        display: flex;
        align-items: center;
        a {
            display: table-cell;
            width: header_height;
            height: header_height;
            color: inherit;
            font-size: inherit;
            font-weight: inherit;
            text-decoration: none;
            vertical-align: middle;
        }
        .abs_l,.abs_r {
            width: header_height;
            height: header_height;
            font-size: inherit;
            color: inherit;
            text-align: center;
        }
        .abs_m {
            flex: 1;
            font-weight: 700;
            text-align: center;
        }
    }
}
</style>
