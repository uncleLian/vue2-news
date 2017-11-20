<template>
    <transition name='fadeIn'>
        <div id="QRcode">
            <my-header fixed title='扫码分享'>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}" v-swiper:swiperRight='true'>
                <dl class="middle">
                    <dt class="middle_dt">
                        <i class="toutiao"></i>
                        <span>邀请好友扫一扫</span>
                    </dt>
                </dl>
                <div class="dl_share">
                    <dl class="dl_share_2">
                        <dd @click="wxShare(1)">
                            <img src="~@/assets/img/wx_1.png">
                            <span>微信朋友圈</span></dd>
                        <dd @click="wxShare(0)">
                            <img src="~@/assets/img/wx_2.png">
                            <span>微信好友</span>
                        </dd>
                        <dd @click="qqShare()">
                            <img src="~@/assets/img/qq_1.png">
                            <span>手机QQ</span>
                        </dd>
                    </dl>
                </div>
                <dl class="base">
                    <dt>Copyright@Guangdong Eastone Century </dt>
                    <dt>Technology Co.,Ltd.</dt>
                </dl>
            </div>
        </div>
    </transition>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    name: 'QRcode',
    data() {
        return {
            test: {
                QQimage: 'http://ts.toutiaojk.com/wdata/downloadImg/Serne.png',
                QQurl: 'http://ts.toutiaojk.com/wdata/guide.html',
                wxthumb: 'http://ts.toutiaojk.com/wdata/downloadImg/Serne.png',
                wxwebpageUrl: 'http://ts.toutiaojk.com/wdata/guide.html'
            },
            Aformal: {
                QQimage: 'http://m.toutiaojk.com/downloadImg/Serne.png',
                QQurl: 'http://m.toutiaojk.com/guide.html',
                wxthumb: 'http://m.toutiaojk.com/downloadImg/Serne.png',
                wxwebpageUrl: 'http://m.toutiaojk.com/guide.html'
            }
        }
    },
    methods: {
        qqShare() {
            var qqShareObj = {}
            qqShareObj.scene = 0
            qqShareObj.title = '健康头条下载'
            qqShareObj.description = '下载页面'
            qqShareObj.image = this.Aformal.QQimage
            qqShareObj.url = this.Aformal.QQurl
            document.addEventListener('deviceready', function() {
                cordova.exec(successCallback, errorCallback, 'QQSDK', 'shareNews', [qqShareObj])

                function successCallback() {
                    Toast({ message: '分享成功', duration: 2500 })
                }

                function errorCallback() {
                    Toast({ message: '取消分享', duration: 2500 })
                }
            }, false)
        },
        wxShare(share) {
            var wxShareObj = {}
            wxShareObj.message = {}
            wxShareObj.message.media = {}
            wxShareObj.scene = share
            wxShareObj.message.title = '健康头条下载'
            wxShareObj.message.description = '下载页面'
            wxShareObj.message.thumb = this.Aformal.wxthumb
            wxShareObj.message.media.type = 7
            wxShareObj.message.media.webpageUrl = this.Aformal.wxwebpageUrl
            document.addEventListener('deviceready', function() {
                cordova.exec(onSuccess, onError, 'Wechat', 'share', [wxShareObj])

                function onSuccess() {
                    Toast({ message: '分享成功', duration: 2500 })
                }

                function onError() {
                    Toast({ message: '取消分享', duration: 2500 })
                }
            }, false)
        }
    }
}
</script>
<style lang='stylus'>
#QRcode {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    .content {
        height: 100%;
        width: 100%;
        text-align: center;
        padding-top: 42px;
        background: #EEEFF0;
        &.isIOS {
            padding-top: 64px;
        }
        .middle {
            height: 42%;
            .middle_dt {
                height: 100%;
                background: #00939c;
                i {
                    height: 80%;
                    width: 100%;
                    display: table;
                    text-align: center;
                    vertical-align: middle;
                }
                span {
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        .dl_share {
            width: 100%;
            height: 50%;
            padding-top: 40px;
            .dl_share_1 {
                width: 100%;
                height: 45px;
                dt {
                    width: 100%;
                    height: 45px;
                    i {
                        width: 100%;
                        height: 100%;
                        display: table;
                        text-align: center;
                        vertical-align: middle;
                    }
                }
            }
            .dl_share_2 {
                width: 100%;
                height: 200px;
                padding: 30px 10px 0;
                dd {
                    width 20%;
                    display: inline-table;
                    margin: 0 10px;
                    img {
                        height: 54px;
                        width: 54px;
                    }
                    span {
                        width: 100%;
                        display: table;
                        text-align: center;
                        vertical-align: middle;
                        margin-top: 14px;
                        font-size: 12px;
                    }
                }
            }
        }
        .base {
            font-size: 12px;
            dt {
                color: #cccccc;
                padding-bottom: 5px;
            }
        }
    }
}

#QRcode .toutiao {
    background: url('~@/assets/icon/saoma.png') no-repeat 50%;
    background-size: 170px;
}

#QRcode .tt_share {
    background: url('~@/assets/icon/qr_share.png') no-repeat 50%;
    background-size: 40%;
}
</style>
