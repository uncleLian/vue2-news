<template>
    <div id="profile">
        <!--<my-header title='个人用户'></my-header>-->
        <!--<div class="iosStatus" v-if="ios()"></div>-->
        <div class="userlogobar">
            <!-- 未登录 登录按钮 -->
            <template v-if='!login'>
                <div class="userlogo">
                    <div class="imgborder">
                        <div class="img">
                            <img src="~@/assets/img/myLogin.png">
                        </div>
                        <span @click="$router.push('/login')">点击登录</span>
                    </div>
                </div>
            </template>
            <!--已登录 会员头像 -->
            <template v-else>
                <div class="userlogo">
                    <div class="imgborder">
                        <div class="img">
                            <img :src='userInfo.headimgurl' />
                        </div>
                        <span>{{userInfo.nickname}}</span>
                    </div>
                </div>
            </template>
        </div>
        <div class="my_menu_box">
            <dl>
                <dd><em>{{readHistorylenth}}</em>评论</dd>
                <dd><em>0</em>收藏</dd>
                <dd><em>{{readHistorylenth}}</em>历史</dd>
            </dl>
        </div>
        <div class="subhead"></div>
        <div class="Thelistof">
            <div class="dd_nav01 ">
                <router-link class="myList" to='user/myComments'>
                    <span>我的评论</span>
                    <i></i>
                </router-link>
            </div>
            <div class="dd_nav01">
                <router-link class="myList" to='user/readHistory'>
                    <span>我的历史</span>
                    <i></i>
                </router-link>
            </div>
            <div class="dd_nav01 dd_nav02">
                <router-link class="myList" to='user/userguide'>
                    <span>我的收藏</span>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
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
        ]),
        ...mapGetters('detail', [
            'readHistorylenth'
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
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        ...mapActions('user', [
            'get_readHistory'
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
            Toast({ message: '已退出登录', duration: 1500 })
            // location.reload()
        },
        ios() {
            if (this.$store.state.device === 'ios') {
                return true
            } else {
                return false
            }
        },
        init() {}
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
    background: #EEEEEE;
}

#profile {
    width: 100%;
    margin: 0 auto;
    .userlogobar {
        background-size: 100% 100%;
        height: 200px;
        width: 100%;
        max-width: 640px;
        position: relative;
        .userlogo {
            text-align: center;
            padding-top: 20px;
            width: 100%;
            height: 100%;
            .imgborder {
                border-radius: 100%;
                width: 100%;
                height: 180px;
                .img {
                    width: 100%;
                    height: 140px;
                    line-height: 140px;
                    border-radius: 100%;
                    img {
                        border-radius: 50%;
                        width: 100px;
                        height: 100px;
                        text-align: center;
                        vertical-align: middle;
                        box-shadow: 0 0 20px #000;
                    }
                }
                span {
                    font-size: 20px;
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
            height: 68px;
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
                    color: #F10000;
                    padding-bottom: 5px;
                }
            }
        }
    }
    .subhead {
        width: 100%;
        height: 8px;
    }
    .Thelistof {
        width: 100%;
        background: #FFF;
        border-bottom: 1px solid #cccccc;
        border-right: 0;
        border-left: 0;
        margin: 0 auto;
        padding-left: 20px;
        .dd_nav01 {
            width: 100%;
            height: 45px;
            border-bottom: 1px solid #DBDBDC;
            font-size: 16px;
            position: relative;
            .myList {
                display: table;
                vertical-align: middle;
                height: 45px;
                width: 100%;
                color: #333;
                i {
                    display: table-cell;
                    vertical-align: middle;
                    background-size: 20px;
                    position: absolute;
                    right: 10px;
                    top: 16px;
                    height: 13px;
                    width: 20px;
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
