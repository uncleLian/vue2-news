<template>
    <transition name='slideIn' mode='in-out'>
        <div id="index">
            <transition name='fade'>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
            <nav-bar></nav-bar>
            <div class="coverAd" v-if="!sendMsgDisabled">
                <img src="../../assets/icon/1.png" />
                <button @click="stopSend()">
                    <span>{{time}}</span>
                    <span>点击跳过</span>
                    <!--<span v-if="!sendMsgDisabled">send</span>-->
                </button>
            </div>
        </div>
    </transition>
</template>
<script>
import navBar from './navBar'
import { MessageBox } from 'mint-ui'
import { mapActions } from 'vuex'
export default {
    components: { navBar },
    data() {
        return {
            time: 4, // 发送验证码倒计时
            sendMsgDisabled: false
        }
    },
    methods: {
        ...mapActions('cordova', [
            'cordova_updateInstalled'
        ]),
        stopSend() {
            this.sendMsgDisabled = true
        },
        send() {
            let me = this
            //        me.sendMsgDisabled = true
            let interval = window.setInterval(function() {
                if ((me.time--) <= 0) {
                    me.sendMsgDisabled = true
                    window.clearInterval(interval)
                }
            }, 1000)
        }
    },
    created() {
        this.cordova_updateInstalled()
    },
    mounted() {
        document.addEventListener('chcp_updateLoadFailed', function(eventData) {
            var error = eventData.detail.error
            if (error.code === -2) {
                MessageBox.confirm('有新的版本，点击确认前往更新').then(action => {
                    document.addEventListener('deviceready', function() {
                        window.open('http://ts.toutiaojk.com/download.html', '_system', 'location=yes')
                    }, false)
                })
            }
        }, false)
        this.send()
    }
}
</script>
<style scoped>
#index {
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
}

.coverAd img {
    width: 100%;
    height: 100%;
}

.coverAd button {
    position: absolute;
    width: 100px;
    height: 30px;
    top: 30px;
    right: 30px;
    background: #E9DCE7;
    border-radius: 50px;
    color: #A4AFD9;
    -moz-box-shadow: 5px 5px 3px #888888;
    /* 老的 Firefox */
    box-shadow: 5px 5px 3px #888888;
    display: table-cell;
    vertical-align: middle;
    padding-left: 10px;
    font-size: 14px;
}
.coverAd span{
  font-size: 14px;
  display: table-cell;
  vertical-align: middle;
}
.coverAd span:first-child {
    width: 20px;
    height: 20px;
    background-color: #A4AFD9;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    color: #FFF;
    text-align: center;
    font-size: 14px;
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
