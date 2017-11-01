<template>
    <div id="profile">
        <div class="container">
            <!-- 登录状态 -->
            <div class="loginState">
                <!-- 已登录 -->
                <template v-if="login">
                    <div class="wrapper">
                        <img class="userProfile" :src="userInfo.headimgurl">
                        <span class="userName">{{userInfo.nickname}}</span>
                    </div>
                </template>
                <!-- 未登录 -->
                <template v-else>
                    <div class="wrapper">
                        <img class="userProfile" src="~@/assets/img/myLogin.png">
                        <span class="userName">点击登录</span>
                    </div>
                </template>
            </div>
            <!-- 菜单 -->
            <div class="menu">
                <router-link class="menu-item" tag="a" :to="{name: 'userCover'}">
                    <p class="menu-value">{{appreaduserdata_number.plnum}}</p>
                    <p class="menu-title">评论</p>
                </router-link>
                <router-link class="menu-item" tag="a" :to="{name: 'collect'}">
                    <p class="menu-value">{{appreaduserdata_number.collectnum}}</p>
                    <p class="menu-title">收藏</p>
                </router-link>
                <router-link class="menu-item" tag="a" :to="{name: 'readHistory'}">
                    <p class="menu-value">{{historyArticle.length}}</p>
                    <p class="menu-title">历史</p>
                </router-link>
            </div>
            <!-- 用户列表 -->
            <div class="group">
                <router-link :to="{name: 'userCover'}">
                    <mt-cell title="我的评论"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <router-link :to="{name: 'collect'}">
                    <mt-cell title="我的收藏"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <router-link :to="{name: 'readHistory'}">
                    <mt-cell title="我的历史"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <router-link :to="{name: 'health'}" v-if="isEditor">
                    <mt-cell title="作品管理"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
            </div>
            <!-- 其他列表 -->
            <div class="group">
                <router-link :to="{name: 'QRcode'}">
                    <mt-cell title="扫码分享"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <router-link :to="{name: 'feedBack'}">
                    <mt-cell title="意见反馈"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <mt-cell title="退出登录" @click.stop.native="outLogin"><i class="icon-arrow-right"></i></mt-cell>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
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
        ]),
        ...mapGetters('health', [
            'isEditor'
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
                Toast({ message: '未登录', duration: 1500 })
            }
        },
        goCollect() {
            if (this.login) {
                this.$router.push('collect')
            } else {
                Toast({ message: '未登录', duration: 1500 })
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
                    Toast({ message: '已退出登录', duration: 1500 })
                })
            } else {
                Toast({ message: '未登录', duration: 1500 })
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
<style  lang='stylus'>
#profile {
    width: 100%;
    height: 100%;
    font-size: 16px;
    overflow: hidden;
    .loginState{
        position: relative;
        width: 100%;
        height: 5rem;
        overflow: hidden;
        .wrapper{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            .userProfile{
                display: block;
                border-radius: 50%;
                width: 2.7rem;
                height: 2.7rem;
                text-align: center;
                vertical-align: middle;
                box-shadow: 0 0 20px #000;
                margin-bottom: 0.4rem;
            }
            .userName{
                font-size: 0.426rem;
                color: #fff;
            }
        }
    }
    .menu{
        width: 100%;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #ccc;
        .menu-item{
            flex: 1;
            text-align: center;
            padding: 0.25rem 0;
            .menu-value{
                color: #00939c;
                font-size: 0.533rem;
                padding-bottom: 0.133rem;
            }
            .menu-title{
                color: #666;
                font-size: 0.373rem;
            }
        }
    }
    .group{
        margin: 0.2rem 0;
    }
    .mint-cell{
        color: #333;
        min-height: 1.2rem;
        .mint-cell-wrapper{
            font-size: 0.426rem;
            padding-left: 0.5rem;
            padding-right: 0.25rem;
            border-bottom: 1px solid #dbdbdc;
        }
    }
}
</style>
<style>
#profile .loginState{
    background: url('~@/assets/img/myColorp.png') no-repeat 50% 0%;
    background-size: 100% 100%;
}
#profile .icon-arrow-right {
    display: table-cell;
    vertical-align: middle;
    width: 0.5rem;
    height: 0.32rem;
    background: url('~@/assets/img/back_right.png') no-repeat center center;
    background-size: cover;
}
</style>
