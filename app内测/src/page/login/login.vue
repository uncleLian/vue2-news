<template>
  <div id="thirdparty">
    <my-header fixed title='登录'>
      <a class="back" slot='left' @click='$router.go(-1)'></a>
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
      </div>
      <div class="cenlogin">
        <div class="col-5" @click="login(0)">
          <img src="../../assets/icon/qqlogin.png" />
          <!--<span>QQ登录</span>-->
        </div>
        <div class="col-5" @click="login(1)">
          <img src="../../assets/icon/wxlogin.png" />
          <!--<span>微信登录</span>-->
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
    import {
      mapMutations
    } from 'vuex'
    export default {
      data() {
        return {
          userName: '123',
          passWord: '123'
        }
      },
      methods: {
        ...mapMutations('login',[
          'set_login',
          'set_wx',
          'set_qq',
        ]),
        //      toUserInfo(val){
        //        this.GET_USERINFO(val);
        //      },
        login(loginType) {
          var that = this;
          if (loginType == 1) {
            var scope = "snsapi_userinfo";
            document.addEventListener('deviceready', function() {
              cordova.exec(successCallback, errorCallback, "Wechat", "sendAuthRequest", [scope]);
              function successCallback(response) {
                alert("授权成功")
                var code = response.code;
                $.ajax({
                  url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx13b05ceac5e7a654&secret=9c96f15b353dc26658def855f9b04ce0&code=${code}&grant_type=authorization_code`,
                  type: 'GET'
                })
                  .then(res => {
                    alert("获取数据");
                    var refresh_token = JSON.parse(res).refresh_token;
                    $.ajax({
                      url: `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx13b05ceac5e7a654&grant_type=refresh_token&refresh_token=${refresh_token}`,
                      type: 'GET'
                    })
                      .then(ress => {
                        var ress = JSON.parse(ress);
                        var access_token = ress.access_token;
                        var openid = ress.openid;
                        $.ajax({
                          url: `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`,
                          type: 'GET'
                        })
                          .then(data => {
                            var resss = JSON.parse(data);
                            console.log(resss);
                            that.set_login('wx');
                            that.set_wx(resss);
                            that.$router.go(-1);
                          })
                      })
                  })
              }
              function errorCallback() {
                alert("授权失败！");
              }
            }, false);
          } else {
            alert("暂不支持QQ登录");
            //          var WordPress = '88534716';
            //          that.set_UserCode(WordPress);
            //          this.goBack();
          }
          // that.set_login('wx');
          // that.set_wx({nickname:'小鑫'});
          // that.$router.go(-1);
        },
      },
      mounted(){

      },
    }
  </script>
  <style scoped>
    #thirdparty{
      width: 100%;
      height:100%;
    }
    .content{
      position:relative;
      top: 30%;
    }
    .membersImg{
      text-align:center;
      width: 100%;
      height: 108px;
    }
    /*.membersImg img{*/
    /*background-size: 200%;*/
    /*}*/
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
      float:left;

    }

    .time-horizontal div {
      float: right;
      position: relative;
      text-align: center;
      width: 10%;
      padding-top: 12px;
      border-bottom: 1px solid darkgray;
    }

    .time-horizontal i{
      color: darkgray;
      letter-spacing:5px;
      height:25px;line-height:25px;

    }

    .cenlogin {
      position: relative;
      text-align: center;
      width: 100%;
    }

    .cenlogin .col-5{
      margin-top: 15px;
    }

    .cenlogin .col-5 img {
      background-size: 64px;
    }

  </style>
