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
        ...mapMutations([
          'set_userid',
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
                  type: 'GET',
                  url: `http://data.toutiaojk.com/e/extend/list/appuser.php?code=${code}`,
                }).then(res => {
                   var ress =  JSON.parse(res);
                   if(ress.err != 1){
                     that.set_login('wx');
                     that.set_wx(ress.data);
                     that.set_userid(ress.data.unionid);
                     that.$router.go(-1);
                   }else {
                       alert(ress.errMsg);
                   }
                });
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
          // that.set_userid('lian123456');
          // that.set_wx({nickname:'小鑫',unionid:'lian123456'});
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
