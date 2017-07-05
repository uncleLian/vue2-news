<template>
    <div id="spinnerLoad" v-if="visible">
        <mt-spinner :type="0" :color="color" :size='size'></mt-spinner>
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            size: 36,
            color: 'rgb(240, 61, 61)'
        }
    }
}
</script>
<style>
#spinnerLoad {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 888;
}

#spinnerLoad span {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -18px;
}
</style>
