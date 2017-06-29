<template>
    <div id="share">
        <popup-menu v-model="contentFrame">
            <div class="share_container">
                <span class="wx_friend shareItem" @click="wxShare(0)">
                    <img src="../../../assets/img/wx_friend.png">
                    <label>微信好友</label>
                </span>
                <span class="wx_pyq shareItem" @click="wxShare(1)">
                    <img src="../../../assets/img/wx_pyq.png">
                    <label>微信朋友圈</label>
                </span>
                <span class="shareItem" @click="qqShare(0)">
                    <img src="../../../assets/img/qq.png">
                    <label>QQ好友</label>
                </span>
                <span class="shareItem" @click="qqShare(1)">
                    <img src="../../../assets/img/qzone.png">
                    <label>QQ空间</label>
                </span>
            </div>
        </popup-menu>
    </div>
</template>
<script>
export default {
    name: 'share',
    props:{
        detailJson:{
            defalut:'',
        },
    },
    data() {
        return {
            contentFrame: false, // 内容框
            shareURL:`http://gg.toutiaojk.com/e/action/ShowInfo.php?classid=${this.$route.query.classid}&id=${this.$route.query.id}`,
        }
    },
    methods: {
        toggle(){
            this.contentFrame = !this.contentFrame;
        },
        wxShare(Scene){
            const vm = this;
            var wxShareObj = {};
            wxShareObj.message = {};
            wxShareObj.message.media = {};
            wxShareObj.scene = Scene;
            wxShareObj.message.title = vm.detailJson.title;
            wxShareObj.message.description = vm.detailJson.befrom;
            wxShareObj.message.thumb = vm.detailJson.titlepic;
            wxShareObj.message.media.type = 7;
            wxShareObj.message.media.webpageUrl = vm.shareURL;
            document.addEventListener('deviceready', function () {
                cordova.exec(onSuccess, onError, "Wechat", "share", [wxShareObj]);
                function onSuccess() {
                    vm.popupMenu = false;
                }
                function onError() {

                }
            }, false);
        },
        qqShare(Scene){
            const vm = this;
            var qqShareObj = {};
            qqShareObj.scene = Scene;
            qqShareObj.clientType = 0;
            qqShareObj.title = vm.detailJson.title;
            qqShareObj.description = vm.detailJson.befrom;
            qqShareObj.image = vm.detailJson.titlepic;
            qqShareObj.url = vm.shareURL;
            document.addEventListener('deviceready', function () {
                cordova.exec(successCallback, errorCallback, "QQSDK", "shareNews", [qqShareObj]);
                function successCallback() {
                    vm.popupMenu = false;
                }
                function errorCallback() {

                }
            }, false);
        },
    },
}
</script>
<style scoped>

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
