<template>
  <div id="profile">
    <!--<mt-header title="个人中心"></mt-header>-->
    <div class="login">

      <div class="mylogin" v-if="!showAlert">
        <h1>未登录</h1>
        <mt-button type="primary" @click="$router.push('/login')">点击登录</mt-button>
      </div>

      <div class="mylogin" v-if='showAlert'>
        <h1>已登录</h1>
        <!--<mt-button type="primary" @click="doList(0)">已登录</mt-button>-->
        <!--<div v-for="info in userInfo" >-->
          <span>帐号：{{userInfo.name}}</span>
          <span>密码：{{userInfo.pass}}</span>
        <!--</div>-->
      </div>
      <!---->
    </div>
    <div class="subhead"></div>
    <router-link tag='div' class="myList" to='user/userguide'>
      <span>用户指南</span>
      <img src="../../../../assets/icon/assist.png"/>
    </router-link>
    <!-- <div class="myList" @click="$router.push('userguide')">
      <span>用户指南</span>
      <img src="../../../../assets/icon/assist.png"/>
    </div> -->

    <div class="subhead"></div>
    <div class="myList fenxiang" @click="$router.push('user/QRcode')">
      <span>扫码分享</span>
      <img src="../../../../assets/icon/erweima.png"/>
    </div>

    <div class="subhead"></div>
    <div class="myList">
      <span>评价</span>
      <img src="../../../../assets/icon/pingjia.png"/>
    </div>

    <div class="subhead"></div>
    <div class="myList" @click="$router.push('user/feedBack')">
      <span>意见反馈</span>
      <img src="../../../../assets/icon/yijian.png"/>
    </div>

    <div class="subhead"></div>
    <div class="myList" @click="outlogin">
      <span>退出登录</span>
      <img src="../../../../assets/icon/assist.png"/>
    </div>
  </div>
  
</template>

<script>
  import {getStore, setStore} from '@/store/cache'
  import {mapState,mapMutations} from 'vuex'
  export default{
    name: 'profile',
    data(){
      return {
        showAlert: false,
      }
    },
    methods: {
      dologin(){
        if (getStore('islogin')) {
          this.showAlert = JSON.parse(getStore('islogin'));
//          this.userInfo = JSON.parse(getStore('userInfo'))
        }
      },
      //退出登录
      outlogin(){
        this.OUT_LOGIN;
        location.reload();
      }
    },
    mounted(){
      this.dologin();
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      ...mapMutations([
        'OUT_LOGIN'
      ]),
    },
  }
</script>
<style scoped>

  #profile {
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
  }

  #profile .login {
    width: 100%;
    height: 120px;
    background-color: #fff;
  }

  .subhead {
    width: 100%;
    height: 10px;
  }

  .mylogin {
    margin: 56px 0 10px 20px;
  }

  .mylogin button {

  }

  .myList {
    position: relative;
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    background-color: #fff;
  }

  .myList span {
    display: block;
    width: 70%;
  }

  /*.myList i {*/
  /*display: block;*/
  /*background-size: 25px;*/
  /*position: absolute;*/
  /*right: 40px;*/
  /*top: 0px;*/
  /*height: 100%;*/
  /*width: 25px;*/
  /*}*/
  img {
    display: block;
    background-size: 25px;
    position: absolute;
    right: 40px;
    top: 12px;
    height: 25px;
    width: 25px;
  }

  /*.barcode {*/
  /*background: url('../assets/icon/barcode.png') no-repeat 0 50%;*/
  /*}*/
  /*.login{*/
  /*background: url('../assets/icon/login.png') no-repeat 0 50%;*/
  /*}*/
</style>
