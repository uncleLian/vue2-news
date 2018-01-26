<template>
    <div id="loading" v-if="visible" :class="type === 'absolute'? 'absolute': ''">
        <div class="loading_container" v-if="visible === 'loading'">
            <mt-spinner :type="3" :size='size' :color="color"></mt-spinner>
        </div>
        <div class="error_container" v-else-if="visible === 'error'">
            <div class="error_box">
                <p class="error_text">网络出现错误</p>
                <mt-button class="error_btn" type='danger' @click.stop='reload'>重试</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: [Boolean, String],
            default: false
        },
        type: {
            type: String,
            default: 'fixed'
        },
        reload: Function
    },
    data() {
        return {
            size: 36,
            color: '#00939c'
        }
    }
}
</script>
<style scoped lang='stylus'>
#loading {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 588;
    &.absolute {
        position: absolute;
    }
    .loading_container,
    .error_container{
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .error_box{
        position: absolute;
        left: 0;
        right: 0;
        top: 30%;
        text-align: center;
        line-height: 30px;
        .error_text {
            color: #aaa;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .error_btn {
            border-radius: 5px;
        }
    }
    span {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -18px;
    }
}
</style>
<style>
.loading_container{
    background: url(~@/assets/img/loading_logo.png)no-repeat center 55%;
    background-size: 200px;
}  
</style>
