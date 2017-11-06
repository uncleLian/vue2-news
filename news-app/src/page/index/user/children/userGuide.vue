<template>
  <transition name='fadeIn'>
    <div id="userguide">
      <my-header fixed title='版本介绍'>
        <a class="back-white" slot='left' @click='$router.go(-1)'></a>
      </my-header>
      <div id="content" :class="{isIOS: $store.state.device == 'ios'}" v-swiper:swiperRight='true'>
        1111111
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style scope lang='stylus'>
  #userguide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    #content {
      height: 100%;
      background: #ddd;
      padding-top: 44px;
      &.isIOS {
        padding-top: 64px;
      }
    }
  }
</style>
