<template>
  <div id="QRcode">
    <div class="myheader">
      <!--<div class="iosHeader"></div>-->
      <mt-header title="扫码分享">
          <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
      </mt-header>
    </div>
    <div class="content">
      <dl>
        <dt>健康头条</dt>
        <dt>V1.0.1</dt>
      </dl>
  
      <dl class="middle">
        <dt>
          <i class="toutiao"></i>
        </dt>
        <dt>邀请好友扫一扫</dt>
      </dl>

      <dl class="base">
        <dt>软件申明</dt>
        <dt>@ 2017 宜通科技</dt>
      </dl>
    </div>
  </div>

</template>

<script>
  export default{
    data(){
      return {}
    },
    methods: {},
    computed: {},
    mounted(){

    },
  }
</script>
<style scoped>
  #QRcode {
    height: 100%;
    width: 100%;
    overflow: hidden;
    color:#E8E8E8;
  }
  .myheader{
    background: #4D7BA0;
  }

  #QRcode .content {
    height: 100%;
    width: 100%;
    text-align: center;
    background: -webkit-linear-gradient(rgba(255,0,0,0.7), rgba(255,0,0,.3)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(255,0,0,0.7), rgba(255,0,0,.3)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(255,0,0,0.7), rgba(255,0,0,.3)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(255,0,0,0.7), rgba(255,0,0,.3));
  }
  #QRcode .content dl{
    margin: 0;
    padding: 20px 0;
  }
  #QRcode .content dl.middle{
    width: auto;
    height: 200px;
    margin: 50px 0 40%;
    /*background-color: red;*/
  }
  #QRcode .content dl.middle dt{
   padding-top: 10px;
  }
  #QRcode .content dl i{
    display: block;
    height: 170px;
    width: 100%;
  }
  .toutiao{
    background: url('../../../../assets/icon/liantu.png') no-repeat 50%;
    background-size: 170px;
  }
</style>
