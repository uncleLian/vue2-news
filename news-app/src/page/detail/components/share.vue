<template>
    <div id="share">
        <popup-menu v-model="contentFrame">
            <div class="share_container">
                <span class="wx_friend shareItem" @click.stop="wxShare(0)">
                    <img src="~@/assets/img/wx_friend.png">
                    <label>微信好友</label>
                </span>
                <span class="wx_pyq shareItem" @click.stop="wxShare(1)">
                    <img src="~@/assets/img/wx_pyq.png">
                    <label>微信朋友圈</label>
                </span>
                <span class="shareItem" @click.stop="qqShare(0)">
                    <img src="~@/assets/img/qq.png">
                    <label>QQ好友</label>
                </span>
                <span class="shareItem" @click.stop="qqShare(1)">
                    <img src="~@/assets/img/qzone.png">
                    <label>QQ空间</label>
                </span>
            </div>
        </popup-menu>
    </div>
</template>
<script>
export default {
    props: {
        json: {
            defalut: ''
        }
    },
    data () {
        return {
            contentFrame: false,
            shareURL: `http://m.toutiaojk.com/#/detail?classid=${this.json.classid}&id=${this.json.id}&datafrom=${this.json.datafrom}`
        }
    },
    methods: {
        toggle () {
            this.contentFrame = !this.contentFrame
        },
        wxShare (Scene) {
            let wxShareObj = {
                message: {
                    media: {
                        type: 7,
                        webpageUrl: this.shareURL
                    },
                    title: this.json.title,
                    description: this.json.befrom,
                    thumb: this.json.titlepic
                },
                scene: Scene
            }
            document.addEventListener('deviceready', () => {
                cordova.exec(this.onSuccess, this.onError, 'Wechat', 'share', [wxShareObj])
            }, false)
        },
        qqShare (Scene) {
            let qqShareObj = {
                scene: Scene,
                clientType: 0,
                title: this.json.title,
                description: this.json.befrom,
                image: this.json.titlepic,
                url: this.shareURL
            }
            document.addEventListener('deviceready', () => {
                cordova.exec(this.onSuccess, this.onError, 'QQSDK', 'shareNews', [qqShareObj])
            }, false)
        },
        onSuccess() {
            this.contentFrame = false
        },
        onError() {
        }
    }
}
</script>
<style lang='stylus'>
#share {
    .share_container {
        width: 100%;
        padding: 20px 10px;
        display: flex;
        overflow: auto;
        text-align: center;
        .shareItem {
            flex: 1;
            min-width: 60px;
            margin: 0 5px;
            img{
                width: 40px;
                height: 40px;
            }
            label{
                display: block;
                font-size: 12px;
                margin-top: 8px;
                text-align: center;
            }
        }
    }
    .share_box {
        padding: 15px 20px;
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
    }
}
</style>
