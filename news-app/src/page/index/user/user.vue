<template>
    <div id="user">
        <div class="container">
            <!-- 登录状态 -->
            <div class="loginState">
                <!-- 已登录 -->
                <template v-if="isLogin">
                    <div class="wrapper">
                        <img class="userProfile" :src="userInfo.headimgurl">
                        <span class="userName">{{userInfo.nickname}}</span>
                    </div>
                </template>
                <!-- 未登录 -->
                <template v-else>
                    <router-link class="wrapper" :to="{name: 'login'}">
                        <img class="userProfile" src="~@/assets/img/myLogin.png">
                        <span class="userName">点击登录</span>
                    </router-link>
                </template>
            </div>
            <!-- 菜单 -->
            <div class="menu">
                <div class="menu-item" @click.stop="goToMyComment">
                    <p class="menu-value">{{commentNum}}</p>
                    <p class="menu-title">评论</p>
                </div>
                <router-link class="menu-item" tag="div" :to="{name: 'collect'}">
                    <p class="menu-value">{{collectArticle.length}}</p>
                    <p class="menu-title">收藏</p>
                </router-link>
                <router-link class="menu-item" tag="div" :to="{name: 'myHistory'}">
                    <p class="menu-value">{{historyArticle.length}}</p>
                    <p class="menu-title">历史</p>
                </router-link>
            </div>
            <!-- 用户列表 -->
            <div class="group">
                <!-- 我的评论 -->
                <div @click.stop="goToMyComment">
                    <mt-cell title="我的评论"><i class="icon-arrow-right"></i></mt-cell>
                </div>
                <!-- 我的收藏 -->
                <router-link :to="{name: 'collect'}">
                    <mt-cell title="我的收藏"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <!-- 我的历史 -->
                <router-link :to="{name: 'myHistory'}">
                    <mt-cell title="我的历史"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <!-- 作品管理 -->
                <router-link :to="{name: 'health'}" v-if="isLogin && isEditor">
                    <mt-cell title="作品管理"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
            </div>
            <!-- 其他列表 -->
            <div class="group">
                <!-- 扫码分享 -->
                <router-link :to="{name: 'QRcode'}">
                    <mt-cell title="扫码分享"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <!-- 意见反馈 -->
                <router-link :to="{name: 'feedBack'}">
                    <mt-cell title="意见反馈"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <!-- 小工具箱 -->
                <router-link :to="{name: 'smallTools'}">
                    <mt-cell title="小工具箱"><i class="icon-arrow-right"></i></mt-cell>
                </router-link>
                <!-- 退出登录 -->
                <mt-cell title="退出登录" @click.stop.native="outLogin"><i class="icon-arrow-right"></i></mt-cell>
            </div>
        </div>
            <!-- 子页面视图 -->
        <keep-alive exclude='myComment,health,publish'>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'user',
    data() {
        return {
            commentNum: 0
        }
    },
    computed: {
        ...mapGetters([
            'userid'
        ]),
        ...mapGetters('login', [
            'isLogin'
        ]),
        ...mapGetters('user', [
            'userInfo'
        ]),
        ...mapGetters('detail', [
            'historyArticle'
        ]),
        ...mapGetters('collect', [
            'collectArticle'
        ]),
        ...mapGetters('login', [
            'isEditor'
        ])
    },
    methods: {
        ...mapMutations([
            'set_userid'
        ]),
        ...mapMutations('login', [
            'set_isLogin'
        ]),
        ...mapMutations('user', [
            'set_userInfo'
        ]),
        ...mapActions('user', [
            'get_userInfoNum_data'
        ]),
        ...mapActions('login', [
            'get_userPower_data'
        ]),
        init() {
            if (this.isLogin) {
                this.get_userInfoNum_data().then(res => {
                    if (res && res.data && res.data.plnum) {
                        this.commentNum = res.data.plnum
                    }
                })
            }
        },
        // 退出登录
        outLogin() {
            if (this.isLogin) {
                this.$msgBox.confirm('请确认退出').then(action => {
                    this.set_isLogin('')
                    this.set_userInfo('')
                    this.set_userid('')
                    this.commentNum = 0
                    this.$toast({ message: '已退出登录', duration: 1500 })
                })
            } else {
                this.$toast({ message: '未登录', duration: 1500 })
            }
        },
        goToMyComment() {
            if (this.isLogin) {
                this.$router.push({name: 'myComment'})
            } else {
                this.$toast({ message: '未登录', duration: 1500 })
            }
        }
    },
    created() {
        if (this.isLogin && this.userid) {
            this.get_userPower_data(this.userid) // 获取用户权限
        }
    },
    activated() {
        this.init()
    }
}
</script>
<style lang='stylus'>
#user {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    padding-bottom: 48px;
    a{
        text-decoration: none;
    }
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
#user .loginState{
    background: url('~@/assets/img/myColorp.png') no-repeat 50% 0%;
    background-size: 100% 100%;
}
#user .icon-arrow-right {
    display: table-cell;
    vertical-align: middle;
    width: 0.5rem;
    height: 0.32rem;
    background: url('~@/assets/img/back_right.png') no-repeat center center;
    background-size: cover;
}
</style>
