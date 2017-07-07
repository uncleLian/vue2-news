<template>
    <div id="profile">
        <!--<my-header title='个人用户'></my-header>-->
        <div class="iosStatus" v-if="ios()"></div>
        <div class="login">
            <template v-if='!login'>
                <div class="mylogin_1" @click="$router.push('/login')">
                    <img src="~@/assets/icon/login.png" />
                    <mt-button type="danger">点击登录</mt-button>
                </div>
            </template>
            <template v-else>
                <div class="mylogin_2">
                    <img :src='userInfo.headimgurl' />
                    <!--<mt-button type="primary" @click="doList(0)">已登录</mt-button>-->
                    <!--<div v-for="info in userInfo" >-->
                    <span>{{userInfo.nickname}}</span>
                    <!--</div>-->
                </div>
            </template>
        </div>

        <router-link tag='div' class="myList" to='user/readHistory'>
          <span>历史记录</span>
          <img src="~@/assets/icon/history.png" />
        </router-link>

        <div class="subhead"></div>
        <router-link tag='div' class="myList" to='user/userguide'>
            <span>版本介绍</span>
            <img src="~@/assets/icon/assist.png" />
        </router-link>

        <div class="subhead"></div>
        <router-link tag='div' class="myList" to='user/QRcode'>
            <span>扫码分享</span>
            <img src="~@/assets/icon/erweima.png" />
        </router-link>

        <div class="subhead"></div>
        <router-link tag='div' class="myList" to='user/feedBack'>
            <span>意见反馈</span>
            <img src="~@/assets/icon/yijian.png" />
        </router-link>
        <div class="subhead"></div>
        <div class="myList" @click="outLogin">
            <span>退出登录</span>
            <img src="~@/assets/icon/assist.png" />
        </div>
    </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    name: 'profile',
    data() {
        return {
            userInfo: ''
        }
    },
    computed: {
        ...mapGetters('login', [
            'login',
            'wx',
            'qq'
        ])
    },
    watch: {
        login(val) {
            this.getUser()
        }
    },
    methods: {
        ...mapMutations('login', [
            'set_login'
        ]),
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
            this.set_login('')
            location.reload()
        },
        ios() {
            if (this.$store.state.device === 'ios') {
                return true
            } else {
                return false
            }
        }
    },
    mounted() {
        this.getUser()
    }
}
</script>
<style scoped lang='stylus'>
.iosStatus {
    width: 100%;
    height: 20px;
    background: #d43d3d;
}

#profile {
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
    .login {
        width: 100%;
        height: 88px;
        line-height 88px;
        padding-left: 10px;
        background-color: #d43d3d;
        .mylogin_1 {
            width: 100%;
            height: 100%;
            line-height 88px;
            img {
                vertical-align: middle;
                height 64px;
                width 64px;
                border-radius: 50%;
            }
            button {
                margin-left 20px;
            }
        }
        .mylogin_2 {
            width: 100%;
            height: 100%;
            line-height 88px;
            img {
                vertical-align: middle;
                height 64px;
                width 64px;
                border-radius: 50%;
            }
            span {
                margin-left 20px;
                font-size 18px;
                color: #ffffff;
            }
        }
    }
    .subhead {
        width: 100%;
        height: 10px;
    }
    .myList {
        position: relative;
        width: 100%;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        background-color: #fff;
        span {
            display: block;
            width: 70%;
        }
        img {
            display: block;
            background-size: 25px;
            position: absolute;
            right: 40px;
            top: 12px;
            height: 25px;
            width: 25px;
        }
    }
}
</style>
