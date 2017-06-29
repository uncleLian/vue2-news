<template>
  <transition name='fadeIn'>
    <div id="QRcode">
      <my-header fixed title='扫码分享'>
        <a class="back" slot='left' @click='$router.go(-1)'></a>
      </my-header>

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
  </transition>


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
       background: -webkit-linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3)); /* Safari 5.1 - 6.0 */
       background: -o-linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3)); /* Opera 11.1 - 12.0 */
       background: -moz-linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3)); /* Firefox 3.6 - 15 */
       background: linear-gradient(rgba(255, 0, 0, 0.7), rgba(255, 0, 0, .3));
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
