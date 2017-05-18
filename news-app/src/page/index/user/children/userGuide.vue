<template>
  <div id="userguide">
    <div class="myheader">
      <!--<div class="iosHeader"></div>-->
      <mt-header title="头条小贴士">
          <mt-button icon="back" slot="left" @click.native='$router.go(-1)'>返回</mt-button>
      </mt-header>
    </div>
    <div id="content">
        1111111
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
<style>
#userguide{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right:0;
}
</style>
