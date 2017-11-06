<template>
    <div id="popupMenu">
        <!-- mint-ui的模态框不符合需求，自己封装一个 -->
        <transition name="toggleSide">
            <div class="functionItem" v-show='visible'>
                <slot></slot>
                <div class="cancle" @click="cancel">取消</div>
            </div>
        </transition>
        <div class="black" @click="cancel" v-show='visible'></div>
        <input type="text" :value="value" style='display:none'>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        cancel() {
            this.visible = false
        }
    },
    watch: {
        value(val) {
            this.visible = val
        },
        visible(val) {
            this.$emit('input', val)
        }
    }
}
</script>
<style lang='stylus'>
#popupMenu{
    .functionItem{
        position: fixed;
        background: #f8f8f8;
        bottom: 0;
        left: 0;
        width: 100%;
        -webkit-transition: -webkit-transform .3s ease-out;
        transition: -webkit-transform .3s ease-out;
        transition: transform .3s ease-out;
        z-index: 1002;
    } 
    .cancle{
        width: 100%;
        text-align: center;
        color: rgb(51, 51, 51);
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        background-color:#f8f8f8;
        border-top: 1px solid rgb(223, 223, 223);
    }
    .black{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
        z-index: 1001;
    }
}
</style>
