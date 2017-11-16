<template>
    <div id="login">
        <!-- 头部 -->
        <my-header fixed title='登录'>
            <a class="back-white" slot='left' @click='$router.go(-1)'></a>
        </my-header>
        <!-- 正文 -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container">
                <div class="wrapper">
                    <div class="defaultImg">
                        <img src="~@/assets/icon/members.png">
                    </div>
                    <div class="defaultTip">
                        <span>请选择登录方式</span>
                    </div>
                    <ul class="loginList">
                        <!-- QQ登录 -->
                        <li class="list-item" @click.stop="login(0)">
                            <img src="~@/assets/icon/qqlogin.png">
                        </li>
                        <!-- 微信登录 -->
                        <li class="list-item" @click.stop="login(1)">
                            <img src="~@/assets/icon/wxlogin.png">
                        </li> 
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { get_iosLocation, get_androidLocation } from '@/config/cordova'
export default {
    name: 'login',
    data() {
        return {
            GPSLocation: {}
        }
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
        ...mapActions('login', [
            'get_userPower_data'
        ]),
        // 第三方登录
        login(loginType) {
            if (loginType === 1) {
                var scope = 'snsapi_userinfo'
                document.addEventListener('deviceready', () => {
                    cordova.exec(this.onSuccess, this.onError, 'Wechat', 'sendAuthRequest', [scope])
                }, false)
            } else {
                this.$toast({ message: '暂不支持QQ登录', duration: 2000 })
            }
        },
        onSuccess(response) {
            const code = response.code
            const appidA = 'wxab47f0260fabea40'
            // const appidB = 'wx13b05ceac5e7a654'
            const secretA = '24950a2a032720541e0e952954dd6248'
            // const secretB = '9c96f15b353dc26658def855f9b04ce0'

            // 获取refresh_token
            this.$http.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appidA}&secret=${secretA}&code=${code}&grant_type=authorization_code`)
            .then(res1 => {
                let refresh_token = res1.refresh_token
                this.$http.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appidA}&grant_type=refresh_token&refresh_token=${refresh_token}`)
                .then(res2 => {
                    let access_token = res2.access_token
                    let openid = data2.openid
                    this.$http.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`)
                    .then(res3 => {
                        let unionid = res3.unionid
                        this.set_isLogin('wx')              // 设置登录
                        this.set_userInfo(data3)            // 设置用户数据
                        this.set_userid(unionid)            // 设置userid
                        this.get_userPower_data(unionid)    // 请求用户权限
                        this.$router.go(-1)
                    })
                })
            })
            .catch(() => {
                this.$toast({ message: '登录失败', duration: 2000 })
            })

            // 发送定位
            this.$http.get(`http://app.toutiaojk.com/e/extend/list/appuser.php?code=${code}`, {params: this.GPSLocation})
            .then(res => {
                console.log(res)
            })
        },
        onError() {
            this.$toast({ message: '授权失败', duration: 2000 })
        },
        get_location() {
            if (this.$store.state.device === 'ios') {
                var res = get_iosLocation()
                this.GPSLocation = res.coords
                 console.log('IOS定位', this.GPSLocation)
            } else {
                this.GPSLocation = get_androidLocation()
                 console.log('安卓定位', this.GPSLocation)
            }
        }
    },
    mounted() {
        this.get_location()
    }
}
</script>
<style lang='stylus'>
#login{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .wrapper{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .defaultImg {
        text-align: center;
        width: 100%;
        margin-bottom: 0.53rem;
        img {
            width: 2.4rem;
            height: 2.4rem;
        }
    }
    .defaultTip {
        margin: 0 auto;
        width: 50%;
        text-align: center;
        span{
            position: relative;
            display: inline-block;
            vertical-align: middle;
            font-size: 0.32rem;
            color: darkgray;
            letter-spacing: 5px;
            height: 0.8rem;
            line-height: 0.8rem;
        }
        span:before{
            content: '';
            position: absolute;
            width: 25%;
            top: 50%;
            left: -50%;
            transform: translateY(-50%);
            border-top: 1px solid darkgray;
        }
        span:after{
            content: '';
            position: absolute;
            width: 25%;
            top: 50%;
            right: -50%;
            transform: translateY(-50%);
            border-top: 1px solid darkgray;
        }
    }
    .loginList{
        .list-item{
            margin-top: 0.4rem;
            text-align: center;
            img{
                width: 5.5rem;
                height: 1.28rem;
            }
        }
    }
}
</style>
