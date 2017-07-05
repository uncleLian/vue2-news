<template>
    <div class="navBar">
        <div class='nav_item' v-for='item in navData' @click.stop='route_change(item)' :class="{active: selected == item.route}">
            <div class='nav_icon' :class='item.class'></div>
            <p class='nav_name'>{{item.name}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            navData: [
                {name: '主页', class: 'home', route: 'home'},
                {name: '视频', class: 'video', route: 'video'},
                {name: '收藏', class: 'collect', route: 'collect'},
                {name: '个人', class: 'user', route: 'user'}
            ],
            selected: 'home'
        }
    },
    methods: {
        route_change (item) {
            this.$router.push(item.route)
            this.selected = item.route
        },
        init () {
            if (this.$route.name) {
                this.selected = this.$route.name
            } else if (this.$route.path.includes('user')) {
                this.selected = 'user'
            }
        }
    },
    watch: {
        $route (val) {
            this.init()
        }
    }
}
</script>
<style scoped lang='stylus'>
.navBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 48px;
    z-index: 999;
    display: flex;
    background: #fff;
    border-top: 1px solid #ddd;
    padding: 2px 0;
    overflow: hidden;
    .nav_item {
        flex: 1;
        .nav_icon {
            height: 28px;
            background-size: 22px!important;
            padding-bottom: 4px;
            &.home {
                background: url('../../assets/icon/home.png') no-repeat center center;
            }
            &.video {
                background: url('../../assets/icon/video.png') no-repeat center center;
            }
            &.collect {
                background: url('../../assets/icon/shouchang.png') no-repeat center center;
            }
            &.user {
                background: url('../../assets/icon/my.png') no-repeat center center;
            }
        }
        .nav_name {
            font-size: 12px;
            color: #222;
            text-align: center;
            line-height: 1;
        }
    }
    .nav_item.active {
        .nav_icon {
            &.home {
                background: url('../../assets/icon/home_1.png') no-repeat center center;
            }
            &.video {
                background: url('../../assets/icon/video_1.png') no-repeat center center;
            }
            &.collect {
                background: url('../../assets/icon/shouchang_1.png') no-repeat center center;
            }
            &.user {
                background: url('../../assets/icon/my_1.png') no-repeat center center;
            }
        }
        .nav_name {
            color: #d43d3d;
        }
    }
}
</style>
