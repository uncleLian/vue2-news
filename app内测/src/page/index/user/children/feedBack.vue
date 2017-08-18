<template>
  <transition name='fadeIn'>
    <div id="feedback">
      <my-header fixed title='意见反馈'>
        <a class="back-white" slot='left' @click='$router.go(-1)'></a>
      </my-header>

      <div class="content" :class="{isIOS: $store.state.device == 'ios'}" v-swiper:swiperRight='true'>
        <div class="automatic">
          <div class="am_img">
            <img src="~@/assets/img/myColorp.png">
          </div>
          <div class="am_span">
            <span>{{advice}}</span>
          </div>
        </div>

        <div class="user_fk" v-for="fb in fb_histoty">
          <div class="fk_span">
            <span>{{fb.info}}</span>
          </div>
          <div class="fk_img">
            <img src="~@/assets/img/myColorp.png">
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>

      <div class="fk_tool">
        <textarea id='input' v-model.trim='inputVal' :placeholder="placeholderVal"></textarea>
        <span class="publish_btn">发送</span>
      </div>
    </div>
  </transition>
</template>
<script>
  import {MessageBox} from 'mint-ui'
  import {autoTextarea} from '@/components/autoTextarea.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'feedback',
    data() {
      return {
        advice: '你好，欢迎反馈！请填写你对我们的意见，指出我们的不足。我们会根据用户的要求尽快改正！',
        placeholderVal: '请填写反馈意见',
        inputVal: ''
      }
    },
    computed: {
      ...mapGetters('user', [
        'fb_histoty'
      ])
    },
    methods: {
      ...mapMutations('user', [
        'set_fb_histoty'
      ]),
      ...mapActions('user', [
        'get_fb_histoty'
      ]),

      sendComment () {
        if (this.inputVal) {
          var formData = {}
          formData.info = this.inputVal
          this.fb_histoty.push(formData)
          this.inputVal = ''
        } else {
          MessageBox.alert('请输入内容')
        }
        this.set_fb_histoty(this.fb_histoty)
      },

      oneSend() {
        this.get_fb_histoty()
          .then(res => {
              this.set_fb_histoty(res)
            }
          )
      }

    },
    mounted() {
      let text = this.$el.querySelector('.fk_tool #input')
      autoTextarea(text, 0, 80)
      $(this.$el.querySelector('.fk_tool .publish_btn')).on('touchend', () => {
        this.sendComment()
      })
      this.oneSend()
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
    z-index: 1000;
    background: #fff;
    overflow: hidden;
    .content {
      width: 100%;
      height: 100%;
      padding-top: 44px;
      padding-bottom: 48px;
      overflow: auto;
      &.isIOS {
        padding-top: 64px;
      }
      .automatic {
        width: 100%;
        height: 15%;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .am_img {
          width: 10%;
          margin: 0 10px;
          img {
            width: 34px;
            height: 34px;
          }
        }
        .am_span {
          width: 80%;
          background: #2DA8F8;
          margin-right: 10px;
          padding: 10px 0;
          span {
            font-size: 16px;
          }
        }
      }
      .user_fk {
        width: auto;
        height: auto;
        margin: 20px 20px 20px 0;
        display: flex;
        justify-content: flex-end;
        .fk_span {
          width: auto;
          background: #2DA8F8;
          margin-right: 10px;
          padding: 10px 0;
          text-align: right;
          span {
            width: auto;
            display: block;
            font-size: 16px;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
        .fk_img {
          width: 10%;
          margin: 0 10px;
          float: right;
          img {
            width: 34px;
            height: 34px;
          }
        }
      }
    }
    .fk_tool {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 48px;
      z-index: 999;
      display: flex;
      background: #d9d9d9;
      border-top: 1px solid #ddd;
      textarea {
        width: 84%;
        height: 40px !important;
        line-height: 40px;
        font-size: 14px;
        border-radius: 10px;
        border: 1px solid #ddd;
        -webkit-appearance: none;
        outline: none;
        resize: none;
        overflow-y: auto !important;
        word-break: break-all;
        margin: 3px;
        text-align: center;
      }
      .publish_btn {
        display: table-cell;
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #aaa;
        user-select: none;
        vertical-align: middle;
        &.hasVal {
          color: #007aff
        }
      }
      span {
        height: 47px;
        line-height: 47px;
        color: #00939c;
      }
    }
  }
</style>
