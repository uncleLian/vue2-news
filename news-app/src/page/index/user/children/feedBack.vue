<template>
  <div id="feedback">
    <div class="myheader">
      <mt-header title="意见反馈">
          <mt-button icon="back" slot="left" @click='$router.go(-1)'>返回</mt-button>
      </mt-header>
    </div>
    <div class="content feedbackCon">
      <textarea v-model="advice"></textarea>
      <mt-button size="normal" type="primary" @click="getList()">提交</mt-button>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'feedback',
    data(){
      return {
        advice: '请输入您的反馈信息，感谢您支持健康头条。'
      }
    },
    methods: {},
    computed: {},
    mounted(){

    },
  }
</script>
<style scoped>
  #feedback .content{
    width: 100%;
    height: 100%;
    overflow: hidden;

  }
  .feedbackCon textarea{
    display:block;
    width: 92%;
    height: 150px;
    background-color: #b0aab8;
    margin: 15px auto;
    border-radius:5px;
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
  }
  .feedbackCon .mint-button{
    display:block;
    margin: 0 auto;
    width: 94%;
  }
</style>
