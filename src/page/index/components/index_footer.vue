<template>
    <footer id="indexFooter" v-if="visible">
        <div class="logo center"></div>
        <div class="text center">
            <p class="title">健康头条</p>
            <p class="title-sub">看头条，知健康</p>
        </div>
        <a class="down_btn center" href='http://m.toutiaojk.com/guide.html'>立即下载</a>
        <a class="close_btn center" @click='close'></a>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        close() {
            this.visible = false
            sessionStorage.setItem('downLoad', 'false') // 关闭之后刷新不会再次出现
        }
    },
    mounted() {
        if (!sessionStorage.getItem('downLoad')) {
            this.visible = true
        }
    }
}
</script>
<style lang='stylus'>
#indexFooter {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
    height: 50px;
    background: rgba(0, 0, 0, .7) no-repeat;
    color: #fff;
    overflow: hidden;
    .center{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .logo {
        left: 10px;
        width: 35px;
        height: 35px;
        background: url(../../../assets/img/downLoad.png)no-repeat center center;
        background-size: 35px;
    }
    .text {
        left: 50px;
        font-size: 15px;
        .title-sub{
            font-size: 12px;
        }
    }
    .down_btn {
        right: 40px;
        display: inline-block;
        width: 80px;
        line-height: 30px;
        font-size: 13px;
        padding: 0 10px;
        border-radius: 6px;
        background: #00939c;
        color: #fff;
        text-align: center;
        text-decoration: none;
    }
    .close_btn {
        right: 0;
        width: 40px;
        height: 100%;
        text-align: center;
        font-size: 14px;
        padding: 5px;
        background: url(https://s3a.pstatp.com/resource/growth/mobile_detail/static/image/banner_ic_close_6951b35.png)no-repeat center center;
        background-size: 14px;
    }
}
</style>
