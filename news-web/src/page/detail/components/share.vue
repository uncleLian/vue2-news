<template>
    <div id="share">
        <popup-menu v-model="contentFrame">
            <div class="share_container">
                <span class="wx_friend shareItem" @click="shareItemClick">
                    <img src="../../../assets/img/wx_friend.png">
                    <label>微信好友</label>
                </span>
                <span class="wx_pyq shareItem" @click="shareItemClick">
                    <img src="../../../assets/img/wx_pyq.png">
                    <label>微信朋友圈</label>
                </span>
                <span class="shareItem" @click="shareItemClick">
                    <img src="../../../assets/img/qq.png">
                    <label>QQ好友</label>
                </span>
                <span class="shareItem" @click="shareItemClick">
                    <img src="../../../assets/img/qzone.png">
                    <label>QQ空间</label>
                </span>
            </div>
        </popup-menu>
        <popup-menu v-model="shareFrame">
            <div class="share_box">
                <p class="share_tip">长按复制下方链接，去粘贴给好友吧</p>
                <p class="share_url">{{shareUrl}}</p>
            </div>
        </popup-menu>
    </div>
</template>
<script>
export default {
    props:{
        show: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            contentFrame: false, // 内容框
            shareFrame: false, // 分享框
            shareUrl: window.location.href, // 分享链接
        }
    },
    watch:{
        show(val){
            this.contentFrame = val;
        },
        contentFrame(val){
            this.$emit("on-status-change",val);
        },
    },
    methods: {
        shareItemClick() {
            this.contentFrame = false;
            this.shareFrame = true;
        },
    },
}
</script>
<style lang='stylus' scoped>

/* share */
.share_container {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    overflow: auto;
    text-align: center;
}
.shareItem {
    flex: 1;
    min-width: 60px;
    margin: 0 5px;
}

.shareItem img {
    width: 40px;
    height: 40px;
}

.shareItem label {
    display: block;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
}

.share_box {
    padding: 15px 20px;
}

.share_tip {
    padding: 0 10px;
    font-size: 16px;
}

.share_url {
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
    border: 1px dotted rgb(217, 217, 217);
    word-break: break-all;
    text-align: left;
}


/* share */

[data-dpr="2"] .share_container {
    padding: 40px 20px;
}

[data-dpr="3"] .share_container {
    padding: 60px 30px;
}

[data-dpr="2"] .shareItem {
    min-width: 120px;
    margin: 0 10px;
}

[data-dpr="3"] .shareItem {
    min-width: 180px;
    margin: 0 15px;
}

[data-dpr="2"] .shareItem img {
    width: 80px;
    height: 80px;
}

[data-dpr="3"] .shareItem img {
    width: 120px;
    height: 120px;
}

[data-dpr="2"] .shareItem label {
    font-size: 24px;
    margin-top: 16px;
}

[data-dpr="3"] .shareItem label {
    font-size: 36px;
    margin-top: 24px;
}

[data-dpr="2"] .share_box {
    padding: 30px 40px;
}

[data-dpr="3"] .share_box {
    padding: 45px 60px;
}

[data-dpr="2"]  .share_tip {
    padding: 0 20px;
    font-size: 32px;
}

[data-dpr="3"]  .share_tip {
    padding: 0 30px;
    font-size: 48px;
}

[data-dpr="2"]  .share_url {
    margin-top: 20px;
    padding: 20px;
    font-size: 24px;
    border: 2px dotted rgb(217, 217, 217);
}

[data-dpr="3"]  .share_url {
    margin-top: 30px;
    padding: 30px;
    font-size: 36px;
    border: 3px dotted rgb(217, 217, 217);
}

</style>
