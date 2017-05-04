<template>
    <div id="spinnerLoad" v-show="visible">
        <mt-spinner :type="0" :color="color"></mt-spinner>
    </div>
</template>
<script>
export default {
    name: 'spinnerLoad',
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            visible: false,
            size: 36,
            color: 'rgb(240, 61, 61)',
        }
    },
    watch: {
        show(val) {
            this.visible = val;
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

[data-dpr="2"] #spinnerLoad span {
    margin-left: -30px;
}
[data-dpr="3"] #spinnerLoad span {
    margin-left: -45px;
}
#spinnerLoad .mint-spinner-snake {
    width: 30px!important;
    height: 30px!important;
}
[data-dpr="2"] #spinnerLoad .mint-spinner-snake {
    width: 60px!important;
    height: 60px!important;
}

[data-dpr="3"] #spinnerLoad .mint-spinner-snake {
    width: 90px!important;
    height: 90px!important;
}
</style>
