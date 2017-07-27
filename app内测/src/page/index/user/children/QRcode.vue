<template>
  <transition name='fadeIn'>
    <div id="QRcode">
      <my-header fixed title='扫码分享'>
        <a class="back-white" slot='left' @click='$router.go(-1)'></a>
      </my-header>
      <div class="content" v-swiper:swiperRight='true'>
        <dl>
          <dt>健康头条</dt>
          <dt>V1.0.1</dt>
        </dl>
        <dl class="middle">
          <dt>
            <i class="toutiao"></i>
          </dt>
          <dt>邀请好友扫一扫</dt>
          <dt @click="wxShare()">微信</dt>
          <dt @click="qqShare()">QQ</dt>
        </dl>
        <dl class="base">
          <dt>软件申明</dt>
          <dt>@ 2017 宜通科技</dt>
        </dl>
      </div>
    </div>
  </transition>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return {}
    },
    methods: {
      qqShare() {
        var qqShareObj = {}
        qqShareObj.scene = 0
        qqShareObj.title = '健康头条下载'
        qqShareObj.description = '下载页面'
        qqShareObj.image = 'http://ts.toutiaojk.com/downloadImg/Serne.png'
        qqShareObj.url = 'http://ts.toutiaojk.com/download.html'
        document.addEventListener('deviceready', function () {
          cordova.exec(successCallback, errorCallback, 'QQSDK', 'shareNews', [qqShareObj])
          function successCallback() {
            Toast({message: '分享成功', duration: 2500})
          }
          function errorCallback() {
            Toast({message: '取消分享', duration: 2500})
          }
        }, false)
      },
      wxShare() {
        var wxShareObj = {}
        wxShareObj.message = {}
        wxShareObj.message.media = {}
        wxShareObj.scene = 0
        wxShareObj.message.title = '健康头条下载'
        wxShareObj.message.description = '下载页面'
        wxShareObj.message.thumb = 'http://ts.toutiaojk.com/downloadImg/Serne.png'
        wxShareObj.message.media.type = 7
        wxShareObj.message.media.webpageUrl = 'http://ts.toutiaojk.com/download.html'
        document.addEventListener('deviceready', function () {
          cordova.exec(onSuccess, onError, 'Wechat', 'share', [wxShareObj])
          function onSuccess() {
            Toast({message: '分享成功', duration: 2500})
          }

          function onError() {
            Toast({message: '取消分享', duration: 2500})
          }
        }, false)
      }
    }
  }
</script>
<style scope lang='stylus'>
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
      /*background: -webkit-linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3));
      background: -o-linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3));
      background: -moz-linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3));
      background: linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3));*/
      background: #fff;
    }
  }

  #QRcode .content dl {
    margin: 0;
    padding: 20px 0;
  }

  #QRcode .content dl.middle {
    width: auto;
    height: 200px;
    margin: 50px 0 40%;
    /*background-color: red;*/
  }

  #QRcode .content dl.middle dt {
    padding-top: 10px;
  }

  #QRcode .content dl i {
    display: block;
    height: 170px;
    width: 100%;
  }

  .toutiao {
    background: url('../../../../assets/icon/liantu.png') no-repeat 50%;
    background-size: 170px;
  }
</style>
