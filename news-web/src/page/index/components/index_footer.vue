<template>
    <footer id="indexFooter" v-if="footerVisibel">
        <div class="img left"></div>
        <div class="text left">
            <p class="mid">健康头条</p>
            <p class="small">看头条，知健康</p>
        </div>
        <div class="closeBtn right" @click='close'></div>
        <div class="right">
            <a :href='$store.state.apkURL' class="downBtn">立即下载</a>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'indexFooter',
    data() {
        return {
            footerVisibel: false,
        }
    },
    methods: {
        init() {
            if (!sessionStorage.getItem('downLoad')) {
                this.footerVisibel = true;
            }
        },
        close() {
            this.footerVisibel = false;
            sessionStorage.setItem('downLoad', 'false');
        },
    },
    mounted() {
        this.init();
    }
}
</script>
<style scoped lang='stylus'>
#indexFooter {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgba(0, 0, 0, .7) no-repeat;
    color: #fff;
    overflow: hidden;
    div {
        height: 100%;
    }
    .left {
        float: left;
    }
    .right {
        float: right;
    }
}

.img {
    width: 60px;
    background: url(../../../assets/img/downLoad.png)no-repeat center center;
    background-size: 35px;
}

.text {
    font-size: 14px;
    padding-top: 2px;
    line-height: 18px;
}

.text .small {
    font-size: 12px;
}

.downBtn {
    line-height: 25px;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 6px;
    background: rgb(255, 66, 75);
    display: inline-block;
    color: rgb(255, 255, 255);
    text-align: center;
    text-decoration: none;
}

.closeBtn {
    width: 40px;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    background: url(https://s3a.pstatp.com/resource/growth/mobile_detail/static/image/banner_ic_close_6951b35.png)no-repeat center center;
    background-size: 14px;
}
</style>
