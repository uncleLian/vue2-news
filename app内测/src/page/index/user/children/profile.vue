<template>
  <div id="profile">
    <!--<my-header title='个人用户'></my-header>-->
    <!--<div class="iosStatus" v-if="ios()"></div>-->
    <div class="userlogobar">
      <!-- 未登录 登录按钮 -->
      <template v-if='!login'>
        <div class="userlogo">
          <div class="imgborder" @click="$router.push('/login')">
            <div class="img">
              <img src="~@/assets/img/myLogin.png">
            </div>
            <span>点击登录</span>
          </div>
        </div>
      </template>
      <!--已登录 会员头像 -->
      <template v-else>
        <div class="userlogo">
          <div class="imgborder">
            <div class="img">
              <img :src='userInfo.headimgurl'/>
            </div>
            <span>{{userInfo.nickname}}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="my_menu_box">
      <dl>
        <dd class="myList" @click="goUserCover">
          <em>{{appreaduserdata_number.plnum}}</em>评论
        </dd>

        <dd class="myList" @click="goCollect">
          <em>{{appreaduserdata_number.collectnum}}</em>收藏
        </dd>

        <router-link class="myList" to='user/readHistory' tag="dd">
          <em>{{this.historyArticle.length}}</em>历史
        </router-link>

      </dl>
    </div>
    <div class="subhead"></div>
    <div class="Thelistof">

      <div class="dd_nav01 ">
        <div class="myList" @click="goUserCover">
          <span>我的评论</span>
          <i></i>
        </div>
      </div>

      <div class="dd_nav01 ">
        <div class="myList" @click='goCollect'>
          <span>我的收藏</span>
          <i></i>
        </div>
      </div>


      <div class="dd_nav01 dd_nav02">
        <router-link class="myList" to='user/readHistory'>
          <span>我的历史</span>
          <i></i>
        </router-link>
      </div>

    </div>
    <div class="subhead"></div>
    <div class="Thelistof">
      <div class="dd_nav01 ">
        <router-link class="myList" to='user/QRcode'>
          <span>扫码分享</span>
          <i></i>
        </router-link>
      </div>
      <div class="dd_nav01 ">
        <router-link class="myList" to='user/feedBack'>
          <span>意见反馈</span>
          <i></i>
        </router-link>
      </div>
      <div class="dd_nav01 dd_nav02">
        <div class="myList" @click="outLogin">
          <span>退出登录</span>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {Toast, MessageBox} from 'mint-ui'
  export default {
    name: 'profile',
    data() {
      return {
        userInfo: '',
        readHistory: ''
      }
    },
    computed: {
      ...mapGetters('login', [
        'login',
        'wx',
        'qq'
      ]),
      ...mapGetters('detail', [
        'historyArticle'
      ]),
      ...mapGetters('user', [
        'appreaduserdata_number'
      ])
    },
    watch: {
      login(val) {
        this.getUser()
      }
    },
    activated() {
      this.init()
    },
    methods: {
      ...mapMutations('login', [
        'set_login'
      ]),
      ...mapMutations('user', [
        'set_appreaduserdata_number'
      ]),
      ...mapActions('user', [
        'get_appreaduserdata'
      ]),

      goUserCover() {
        if (this.login) {
          this.$router.push('user/userCover')
        } else {
          Toast({message: '未登录', duration: 1500})
        }
      },
      goCollect() {
        if (this.login) {
          this.$router.push('collect')
        } else {
          Toast({message: '未登录', duration: 1500})
        }
      },
      getUser() {
        if (this.login) {
          if (this.login === 'wx') {
            this.userInfo = this.wx
          } else if (this.login === 'qq') {
            this.userInfo = this.qq
          }
        }
      },
      outLogin() {
        if (this.login) {
          MessageBox.confirm('请确认退出').then(action => {
            this.set_login('')
            this.init()
            Toast({message: '已退出登录', duration: 1500})
          })
        } else {
          Toast({message: '未登录', duration: 1500})
        }
      },
      ios() {
        if (this.$store.state.device === 'ios') {
          return true
        } else {
          return false
        }
      },
      init() {
        if (this.login) {
          this.get_appreaduserdata()
            .then(res => {
              this.set_appreaduserdata_number(res.data)
            })
        } else {
          let res = {}
          res.plnum = 0
          res.collectnum = 0
          this.set_appreaduserdata_number(res)
        }
      }
    },
    mounted() {
      this.getUser()
      this.init()
    }
  }
</script>
<style scoped lang='stylus'>
  .iosStatus {
    width: 100%;
    height: 20px;
    background: #EEEEEE;
  }

  #profile {
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    .userlogobar {
      width: 100%;
      position: relative;
      background-size: 100% 100%;
      .userlogo {
        text-align: center;
        padding-top: 0.5rem;
        width: 100%;
        height: 100%;
        .imgborder {
          border-radius: 100%;
          width: 100%;
          height: 4.8rem;
          .img {
            width: 100%;
            height: 3.7rem;
            line-height: 3.7rem;
            border-radius: 100%;
            img {
              border-radius: 50%;
              width: 2.7rem;
              height: 2.7rem;
              text-align: center;
              vertical-align: middle;
              box-shadow: 0 0 20px #000;
            }
          }
          span {
            font-size: 16px;
            color: #FFF;
          }
        }
      }
    }
    .my_menu_box {
      background: #FFF;
      border-bottom: 1px solid #cccccc;
      border-right: 0;
      border-left: 0;
      margin: 0 auto;
      dl {
        height: 1.8rem;
        display: table;
        width: 100%;
        dd {
          display: table-cell;
          width: 25%;
          text-align: center;
          vertical-align: middle;
          color: #666;
          font-size: 14px;
          em {
            display: block;
            font-size: 20px;
            color: #00939c;
            padding-bottom: 5px;
          }
        }
      }
    }
    .subhead {
      width: 100%;
      height: 0.2rem;
    }
    .Thelistof {
      width: 100%;
      background: #FFF;
      border-bottom: 1px solid #cccccc;
      border-right: 0;
      border-left: 0;
      margin: 0 auto;
      padding-left: 0.5rem;
      .dd_nav01 {
        width: 100%;
        height: 1.2rem;
        border-bottom: 1px solid #DBDBDC;
        position: relative;
        .myList {
          display: table;
          vertical-align: middle;
          height: 1.2rem;
          width: 100%;
          color: #333;
          i {
            display: table-cell;
            vertical-align: middle;
            background-size: 0.5rem;
            position: absolute;
            right:0.25rem;
            top: 0.42rem;
            height: 0.34rem;
            width: 0.5rem;
          }
          span {
            height: 100%;
            display: table-cell;
            vertical-align: middle;
          }
        }
      }
      .dd_nav02 {
        border-bottom: 0 !important;
      }
    }
  }
</style>
<style scoped>
  .userlogobar {
    background: url('~@/assets/img/myColorp.png') no-repeat 50% 0%;
  }

  .Thelistof .dd_nav01 .myList i {
    background: url('~@/assets/img/back_right.png') no-repeat 0 50%;
  }
</style>
