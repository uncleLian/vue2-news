<template>
    <div id="user">
        <keep-alive exclude='userCover,health,publish'>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'user',
    computed: {
        ...mapGetters([
            'userid'
        ]),
        ...mapGetters('login', [
            'login'
        ])
    },
    methods: {
        ...mapActions('health', [
            'get_userPower_data'
        ])
    },
    created() {
        if (this.login && this.userid) {
            this.get_userPower_data(this.userid) // 获取用户权限
        }
    }
}
</script>
<style lang='stylus'>
#user {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 48px;
}
</style>
