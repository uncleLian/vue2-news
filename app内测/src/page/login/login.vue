<template>
  <div id="thirdparty">
    <my-header fixed title='登录'>
      <a class="back-white" slot='left' @click='$router.go(-1)'></a>
    </my-header>
    <div class="content">
      <div class="membersImg">
        <img src="../../assets/icon/members.png"/>
      </div>
      <div class="container">

        <div class="time-horizontal">
          <div></div>
          <i>请选择登录方式</i>
          <div></div>
        </div>

        <div class="cenlogin">
          <div class="col-5" @click="login(0)">
            <img src="../../assets/icon/qqlogin.png"/>
            <!--<span>QQ登录</span>-->
          </div>
          <div class="col-5" @click="login(1)">
            <img src="../../assets/icon/wxlogin.png"/>
            <!--<span>微信登录</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations, mapActions} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    data() {
      return {
        userName: '',
        passWord: '',
        cordova_location: {}
      }
    },
    methods: {
      ...mapMutations('login', [
        'set_login',
        'set_wx',
        'set_qq'
      ]),
      ...mapMutations([
        'set_userid'
      ]),
      ...mapActions('cordova', [
        'cordova_baidu_location',
        'cordova_getGeolocation'
      ]),
      // toUserInfo(val){
      //    this.GET_USERINFO(val);
      // },
      login(loginType) {
        var that = this
        if (loginType === 1) {
          var scope = 'snsapi_userinfo'
          document.addEventListener('deviceready', () => {
            cordova.exec(successCallback, errorCallback, 'Wechat', 'sendAuthRequest', [scope])
            function successCallback(response) {
              var code = response.code
              var appidA = 'wxab47f0260fabea40'
              // var appidB = 'wx13b05ceac5e7a654'
              var secretA = '24950a2a032720541e0e952954dd6248'
              // var secretB = '9c96f15b353dc26658def855f9b04ce0'
              $.ajax({
                type: 'GET',
                url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appidA}&secret=${secretA}&code=${code}&grant_type=authorization_code`
              })
                .then(
                  function (res1) {
                    var data1 = JSON.parse(res1)
                    console.log(data1)
                    var refresh_token = data1.refresh_token
                    $.ajax({
                      type: 'GET',
                      url: `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appidA}&grant_type=refresh_token&refresh_token=${refresh_token}`
                    }).then(
                      function (res2) {
                        var data2 = JSON.parse(res2)
                        console.log(data2)
                        var access_token = data2.access_token
                        var openid = data2.openid
                        $.ajax({
                          type: 'GET',
                          url: `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`
                        }).then(
                          function (res3) {
                            var data3 = JSON.parse(res3)
                            console.log(data3)
                            that.set_login('wx')
                            that.set_wx(data3)
                            that.set_userid(data3.unionid)
                            that.$router.go(-1)
                          },
                          function () {
                            Toast({message: '登录失败', duration: 2000})
                          }
                        )
                      },
                      function () {
                        Toast({message: '登录失败', duration: 2000})
                      }
                    )
                  },
                  function () {
                    Toast({message: '登录失败', duration: 2000})
                  }
                )
//              $.ajax({
//                type: 'GET',
//                data: that.cordova_location,
//                url: `http://app.toutiaojk.com/e/extend/list/appuser.php?code=${code}`
//              })
//                .then(res => {
//                  var ress = JSON.parse(res)
//                  if (ress.err !== 1) {
//                    that.set_login('wx')
//                    that.set_wx(ress.data)
//                    that.set_userid(ress.data.unionid)
//                    that.$router.go(-1)
//                  } else {
//                    alert(ress.errMsg)
//                  }
//                })
            }

            function errorCallback() {
              Toast({message: '授权失败', duration: 2000})
            }
          }, false)
        } else {
          Toast({message: '暂不支持QQ登录', duration: 2000})
        }
      },
      location() {
        var that = this
        if (this.$store.state.device === 'ios') {
          navigator.geolocation.getCurrentPosition(function (result) {
            that.cordova_location = result.coords
          })
        } else {
          baidumap_location.getCurrentPosition(function (result) {
            that.cordova_location = result
          })
        }
      }
    },
    mounted() {
      this.location()
    }
  }
</script>
<style scoped lang='stylus'>
  #thirdparty {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .content {
    position: relative;
    top: 30%;
  }

  .membersImg {
    text-align: center;
    width: 100%;
    height: 108px;
    margin-bottom: 20px;
  }

  .membersImg img {
    width: 88px;
    height: 88px;
  }

  .container {
    /*position: absolute;*/
    /*left: 30px;*/
    /*top: 40%;*/
    /*margin-top: 40%;*/
  }

  .time-horizontal {
    list-style-type: none;
    margin: 0 auto;
    width: 50%;
    height: 30px;
    padding: 0px;
    text-align: center;
  }

  .time-horizontal div:first-child {
    float: left;
  }

  .time-horizontal div {
    float: right;
    position: relative;
    text-align: center;
    width: 10%;
    padding-top: 12px;
    border-bottom: 1px solid darkgray;
  }

  .time-horizontal i {
    color: darkgray;
    letter-spacing: 5px;
    height: 25px;
    line-height: 25px;
  }

  .cenlogin {
    position: relative;
    text-align: center;
    width: 100%;
  }

  .cenlogin .col-5 {
    margin-top: 15px;
  }

  .cenlogin .col-5 img {
    height: 48px;
  }
</style>
