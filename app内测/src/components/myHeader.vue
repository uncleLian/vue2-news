<template>
    <header :class="{ 'fixed': fixed }">
        <div class="iosStatus" v-if="ios()"></div>
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
        fixed:Boolean,
        title:String
    },
    methods: {
        ios(){
            if(this.$store.state.device == 'ios'){
                return true
            }else{
                return false
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
.iosStatus {
    width: 100%;
    height: 20px;
}
header {
    display: block;
    position: relative;
    overflow: hidden;
    background-color: #d43d3d;
    color: #fff;
    font-size: 16px;
    &.fixed{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }
    .top_bar {
        position: relative;
        height: 44px;
        line-height: 44px;
        user-select:none;
        a{
            display: block;
            width: 100%;
            height: 100%;
            color: inherit;
            font-size: inherit;
            font-weight: inherit;
        }
        .abs_l,.abs_m,.abs_r {
            position: absolute;
            top: 0;
            width: 44px;
            height: 100%;
            font-size: inherit;
            color: inherit;
            text-align: center
        }
        .abs_l {
            left: 0;
            z-index: 1000;
        }
        .abs_m {
            width: 100%;
            font-weight: 700;
            z-index: 999;
        }
        .abs_r {
            right: 0;
            z-index: 1000;
        }
    }
}
</style>
