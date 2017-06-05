<template>
    <div id="share">
        <popup-menu  v-model='contentFrame'>
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
    data() {
        return {
            contentFrame: false, // 内容框
            shareFrame: false, // 分享框
            shareUrl: window.location.href, // 分享链接
        }
    },
    methods: {
        shareItemClick() {
            this.contentFrame = false;
            this.shareFrame = true;
        },
        toggle(){
            this.contentFrame = !this.contentFrame;
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
</style>
