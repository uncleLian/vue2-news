<template>
    <div id="profile">
        <!--<mt-header title="个人中心"></mt-header>-->
    
        <div class="login">
            <template v-if='login'>
                <div class="mylogin" v-if='login'>
                    <h1>已登录</h1>
                    <!--<mt-button type="primary" @click="doList(0)">已登录</mt-button>-->
                    <!--<div v-for="info in userInfo" >-->
                    <span>昵称：{{userInfo.nickname}}</span>
                    <!--</div>-->
                </div>
            </template>

            <template v-else>
                <div class="mylogin" >
                    <h1>未登录</h1>
                    <mt-button type="primary" @click="$router.push('/login')">点击登录</mt-button>
                </div>
            </template>
        </div>

        <div class="subhead"></div>
        <router-link tag='div' class="myList" to='user/userguide'>
            <span>用户指南</span>
            <img src="../../../../assets/icon/assist.png" />
        </router-link>
        <!-- <div class="myList" @click="$router.push('userguide')">
      <span>用户指南</span>
      <img src="../../../../assets/icon/assist.png"/>
    </div> -->
        <div class="subhead"></div>
        <div class="myList fenxiang" @click="$router.push('user/QRcode')">
            <span>扫码分享</span>
            <img src="../../../../assets/icon/erweima.png" />
        </div>
        <div class="subhead"></div>
        <div class="myList">
            <span>评价</span>
            <img src="../../../../assets/icon/pingjia.png" />
        </div>
        <div class="subhead"></div>
        <div class="myList" @click="$router.push('user/feedBack')">
            <span>意见反馈</span>
            <img src="../../../../assets/icon/yijian.png" />
        </div>
        <div class="subhead"></div>
        <div class="myList" @click="outLogin">
            <span>退出登录</span>
            <img src="../../../../assets/icon/assist.png" />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'profile',
    data(){
        return {
            userInfo: '',
        }
    },
    computed: {
        ...mapGetters('login',[
            'login',
            'wx',
            'qq',
        ])
    },
    watch:{
        login(val){
            this.getUser();
        }
    },
    methods: {
        ...mapMutations('login',[
            'set_login'
        ]),
        getUser() {
            if(this.login){
                if( this.login == 'wx' ){
                    this.userInfo =  this.wx;
                }else if( this.login == 'qq' ){
                    this.userInfo =  this.qq;
                }
            }
        },
        outLogin() {
            this.set_login('');
            location.reload();
        },
    },
    mounted() {
        this.getUser();
    },
}
</script>
<style scoped>
#profile {
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
}

#profile .login {
    width: 100%;
    height: 120px;
    background-color: #fff;
}

.subhead {
    width: 100%;
    height: 10px;
}

.mylogin {
    margin: 56px 0 10px 20px;
}

.mylogin button {}

.myList {
    position: relative;
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    background-color: #fff;
}

.myList span {
    display: block;
    width: 70%;
}


/*.myList i {*/


/*display: block;*/


/*background-size: 25px;*/


/*position: absolute;*/


/*right: 40px;*/


/*top: 0px;*/


/*height: 100%;*/


/*width: 25px;*/


/*}*/

img {
    display: block;
    background-size: 25px;
    position: absolute;
    right: 40px;
    top: 12px;
    height: 25px;
    width: 25px;
}


/*.barcode {*/


/*background: url('../assets/icon/barcode.png') no-repeat 0 50%;*/


/*}*/


/*.login{*/


/*background: url('../assets/icon/login.png') no-repeat 0 50%;*/


/*}*/
</style>
