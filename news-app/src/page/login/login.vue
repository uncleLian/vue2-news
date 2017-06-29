<template>
    <div id="thirdparty">
        <div class="myheader">
            <!--<div class="iosHeader"></div>-->
            <mt-header title="登录">
                <mt-button icon="back" slot="left" @click.native='$router.go(-1)'>返回</mt-button>
            </mt-header>
        </div>
        <div class="content">
            <div class="container">
                <div class="time-horizontal">
                    <div></div>
                    <i>请选择登录方式</i>
                    <div></div>
                </div>
            </div>
            <div class="cenlogin">
                <div class="col-5" @click="login(0)">
                    <img src="../../assets/icon/qq.png" />
                    <span>QQ登录</span>
                </div>
                <div class="col-5" @click="login(1)">
                    <img src="../../assets/icon/weixin.png" />
                    <span>微信登录</span>
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
            // if (loginType == 1) {
            //     var scope = "snsapi_userinfo";
            //     document.addEventListener('deviceready', function() {
            //         cordova.exec(successCallback, errorCallback, "Wechat", "sendAuthRequest", [scope]);
            //         function successCallback(response) {
            //             alert("授权成功")
            //             var code = response.code;
            //             $.ajax({
            //                     url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxab47f0260fabea40&secret=24950a2a032720541e0e952954dd6248&code=${code}&grant_type=authorization_code`,
            //                     type: 'GET'
            //                 })
            //             .then(res => {
            //                 alert("获取数据");
            //                 var refresh_token = JSON.parse(res).refresh_token;
            //                 $.ajax({
            //                         url: `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wxab47f0260fabea40&grant_type=refresh_token&refresh_token=${refresh_token}`,
            //                         type: 'GET'
            //                     })
            //                 .then(ress => {
            //                     var ress = JSON.parse(ress);
            //                     var access_token = ress.access_token;
            //                     var openid = ress.openid;
            //                     $.ajax({
            //                             url: `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`,
            //                             type: 'GET'
            //                         })
            //                     .then(data => {
            //                         var resss = JSON.parse(data);
            //                         that.set_login('wx');
            //                         that.set_wx(resss);
            //                         that.$router.go(-1);
            //                     })
            //                 })
            //             })
            //         }
            //         function errorCallback() {
            //             alert("授权失败！");
            //         }
            //     }, false);
            // } else {
            //     alert("暂不支持QQ登录");
            //     //          var WordPress = '88534716';
            //     //          that.set_UserCode(WordPress);
            //     //          this.goBack();
            // }
            that.set_login('wx');
            that.set_wx({nickname:'小鑫'});
            that.$router.go(-1);
        },
    },
    mounted(){

    },
}
</script>
<style scoped>
.container {
    margin: 20px;
}

.time-horizontal {
    list-style-type: none;
    width: 100%;
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
    width: 27%;
    padding-top: 12px;
    border-bottom: 1px solid darkgray;
}

.time-horizontal i {
    margin: 0 10px;
    color: darkgray;
}

.cenlogin {
    width: 100%;
    height: 60px;
    /*background-color: darkgray;*/
}

.cenlogin .col-5 {
    float: left;
    position: relative;
    text-align: center;
    width: 50%;
    height: 100%;
}

.cenlogin .col-5 img {
    background-size: 64px;
}

.cenlogin .col-5 span {
    display: block;
}
</style>
