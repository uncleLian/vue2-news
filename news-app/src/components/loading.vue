<template>
    <div id="spinnerLoad" v-if="visible" :class="{'absolute': type === 'absolute'? true : false}">
        <mt-spinner :type="3" :color="color" :size='size'></mt-spinner>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'fixed'
        }
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
#spinnerLoad {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 588;
    span {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -18px;
    }
    &.absolute {
        position: absolute;
    }
}
</style>
<style>
#spinnerLoad{
    background: url(~@/assets/img/loading_logo.png)no-repeat center 55%;
    background-size: 200px;
}  
</style>
