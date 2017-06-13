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
        <div class="col-5" @click="golist(0)">
          <img src="../../assets/icon/qq.png"/>
          <span>QQ登录</span>
        </div>

        <div class="col-5" @click="golist(1)">
          <img src="../../assets/icon/weixin.png"/>
          <span>微信登录</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
//  import {getStore, setStore} from '../config/mUtils'
import md5 from 'js-md5'
  import {mapMutations} from 'vuex'
  export default{
    data(){
      return {
          userName:'123',
          passWord:'123'
      }
    },
    methods: {
        ...mapMutations([
          'GET_USERINFO'
        ]),
      toUserInfo(val){
        this.GET_USERINFO(val);
      },
      golist(val){
        if (val == 0) {

          var info = {};
          info.name = this.userName;
          info.pass = this.passWord;

          this.toUserInfo(info);

          this.goBack();
        } else {
//          setStore('islogin',true)
//          this.$store.commit('loginMutations', true);
          this.goBack();
        }
      },
      goBack(){
        this.$router.go(-1);
      }
    },
    computed: {},
    mounted(){
      console.log(md5('123456'))
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
