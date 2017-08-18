<template>
  <transition name='slideIn' mode='in-out'>
    <div id="index">

      <template v-if="appShow">
        <transition name='fade'>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <nav-bar></nav-bar>
      </template>

      <!--<div class="coverAA" v-if="coverSend">-->
      <!--<img src="../../assets/icon/1.png"/>-->
      <!--</div>-->

      <div class="coverAd" v-if="!sendMsgDisabled">
        <img class="coverOne" :src="coverData" v-if="coverImg"/>
        <img src="../../assets/icon/1.png">
        <button @click="stopSend()">
          <span>跳过</span>
        </button>
      </div>

    </div>
  </transition>
</template>
<script>
  import navBar from './navBar'
  import {MessageBox} from 'mint-ui'
  import {mapActions} from 'vuex'
  export default {
    components: {navBar},
    data() {
      return {
        time: 3, // 发送验证码倒计时
        sendMsgDisabled: false,
        appShow: false,
        coverData: '',
        coverSend: true,
        coverImg: ''
      }
    },
    methods: {
      ...mapActions('cordova', [
        'cordova_updateInstalled'
      ]),
      ...mapActions('index', [
        'get_coverImg_data'
      ]),
      stopSend() {
        this.sendMsgDisabled = true
      },
      send() {
        var me = this
        if (navigator.onLine) {
          this.get_coverImg_data()
            .then(res => {
                me.coverImg = true
                me.coverData = res.data
              }
            )
        } else {
          me.appShow = true
          me.sendMsgDisabled = true
        }
        let interval = setInterval(function () {
          var times = me.time--
          if (times <= 0) {
            me.appShow = true
            me.sendMsgDisabled = true
            clearInterval(interval)
          }
        }, 1000)
      }
    },
    created() {
      this.cordova_updateInstalled()
      this.appShow = true
    },
    mounted() {
      document.addEventListener('deviceready', () => {
        var that = this
        window.plugins.jPushPlugin.init()
        window.plugins.jPushPlugin.setDebugMode(true)
        // 点击通知栏的回调，在这里编写特定逻辑
        window.plugins.jPushPlugin.openNotificationInAndroidCallback = function (data) {
//          alert(data.extras.classid+"+"+data.extras.id+"+"+data.extras.datafrom);
          that.$router.push(`/detail?classid=${data.extras.classid}&id=${data.extras.id}&datafrom=${data.extras.datafrom}`)
        }
        window.plugins.jPushPlugin.clearLocalNotifications()
      }, false)

      document.addEventListener('chcp_updateLoadFailed', function (eventData) {
        var error = eventData.detail.error
        if (error.code === -2) {
          MessageBox.confirm('有新的版本，点击确认前往更新').then(action => {
            document.addEventListener('deviceready', function () {
              window.open('http://ts.toutiaojk.com/download.html', '_system', 'location=yes')
            }, false)
          })
        }
      }, false)
      this.send()
    }
  }
</script>
<style scope lang='stylus'>
  #index {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .appShow {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }


  .coverAd {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .coverOne {
      width: 100%;
      height: 80%;
      position: absolute;
      top:0;
      left: 0;
      z-index: 999;
    }
    img {
      width: 100%;
      height: 100%;
    }
    button {
      position: absolute;
      width: 55px;
      height: 26px;
      top: 75%;
      right: 10px;
      background: #333;
      border-radius: 5px;
      -moz-opacity: 0.7;
      opacity: 0.7;
      margin: 0 auto;
      border: 1px solid #e2e2e2;
      z-index: 1000;
      span {
        color: #ffffff;
        width: 55px;
        height: 24px;
        margin: 0 auto;
        text-align: center;
        font-size 12px;
        display: table-cell;
        vertical-align: middle;
      }

    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
