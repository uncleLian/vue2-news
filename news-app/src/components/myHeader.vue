<template>
    <header :class="{ 'fixed': fixed }">
        <div class="iosStatus" v-if="ios()"></div>
        <div class="top_bar">
            <div class="abs_l">
                <slot name="left"></slot>
            </div>
            <div class="abs_m">{{title}}
                <slot name="mid"></slot>
            </div>
            <div class="abs_r">
                <slot name="right"></slot>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    props: {
        fixed: Boolean,
        title: String
    },
    methods: {
        ios() {
            if (this.$store.state.device === 'ios') {
                return true
            } else {
                return false
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
ios_height = 0.535rem
header_height = 1.335rem
.iosStatus {
    width: 100%;
    height: ios_height;
}
header {
    display: block;
    position: relative;
    overflow: hidden;
    /*background-color: #d43d3d;*/
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
