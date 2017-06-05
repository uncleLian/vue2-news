<template>
    <div id="spinnerLoad" v-show="show">
        <mt-spinner :type="0" :color="color"></mt-spinner>
    </div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            size: 36,
            color: 'rgb(240, 61, 61)',
        }
    },
}
</script>
<style>
#spinnerLoad {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 888;
}

#spinnerLoad span {
    position: absolute;
    top: 26%;
    left: 50%;
    margin-left: -15px;
}

</style>
