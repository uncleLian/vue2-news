<template>
  <transition name='fadeIn'>
    <div id="myComments">
      <div class="myheader">
        <!--<div class="iosHeader"></div>-->
        <my-header fixed title='我的评论'>
          <a class="back-white" slot='left' @click='$router.go(-1)'></a>
        </my-header>
      </div>
      <div id="content" :class="{isIOS: $store.state.device == 'ios'}">

      </div>
    </div>
  </transition>
</template>

<script>
 export default{
    data() {
        return {}
    },
    methods: {
    },
    computed: {
    },
    mounted() {
    }
   }
</script>
<style>
</style>
