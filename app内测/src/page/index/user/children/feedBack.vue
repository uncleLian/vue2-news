<template>
  <transition name='fadeIn'>
    <div id="feedback">
      <my-header fixed title='意见反馈'>
        <a class="back-white" slot='left' @click='$router.go(-1)'></a>
      </my-header>
      <div class="content" v-swiper:swiperRight='true'>
        <textarea v-model="advice"></textarea>
        <mt-button size="normal" type="primary" @click="getList()">提交</mt-button>
      </div>
    </div>
  </transition>
</template>
<script>
  import {MessageBox} from 'mint-ui'
  export default {
    name: 'feedback',
    data() {
      return {
        advice: '请输入您的反馈信息，感谢您支持健康头条。'
      }
    },
    methods: {
      getList() {
        if (this.advice.length > 0) {
          MessageBox.alert('提交成功')
        } else {
          MessageBox.alert('请输入内容')
        }
      }
    }
  }
</script>
<style scope lang='stylus'>
  #feedback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    .content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #ddd;
      textarea {
        display: block;
        width: 92%;
        height: 150px;
        background-color: #b0aab8;
        margin: 84px auto 20px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
      }
      .mint-button {
        display: block;
        margin: 0 auto;
        width: 94%;
      }
    }
  }
</style>
