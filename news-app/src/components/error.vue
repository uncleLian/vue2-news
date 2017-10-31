<template>
    <div class='error' v-if='visible' :class="{ 'fixed': fixed }">
        <div class="container">
            <p class="error_text">网络出现错误</p>
            <mt-button type='primary' class="error_btn" @click.stop='method'>重试</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        method: Function,
        fixed: Boolean
    }
}
</script>
<style scoped lang='stylus'>
.error {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 559;
    background: #fff;
    overflow: hidden;
    font-size: 18px;
    &.fixed{
        position: fixed;
    }
    .container {
        position: absolute;
        left: 0;
        right: 0;
        top: 30%;
        text-align: center;
        line-height: 30px;
        .error_text {
            color: #aaa;
            margin-bottom: 10px;
        }
        .error_btn {
            border-radius: 5px;
        }
    }
}
</style>
