<template>
    <div id="indexHeader">
        <!-- 头部 -->
        <header>
            <!-- 用于ios沉浸式状态栏 -->
            <div class="iosStatus" v-if="this.$store.state.device === 'ios'? true : false"></div>
            <div class="top_bar">
                <div class="logo" @click.stop.prevent='goTop'></div>
                <div class="search" @click.stop="$router.push('/search')">
                    <div class="search_wrap">
                        <i class="icon-search"></i>
                        <div class="hot_topic">{{hot_topic}}</div>
                    </div>
                </div>
            </div>
        </header>
        <!-- 栏目 -->
        <nav>
            <div class="nav_ul">
                <a href='javascript:;' v-for="(item,index) in indexColumn" :class='{active: indexActive == item.classpath}' @click="navClick(item.classpath)" :key="index">{{item.classname}}</a>
            </div>
            <!-- 更多栏目 -->
            <div class="nav_menu">
                <div class="shadow"></div>
                <a href='javascript:;' class="more_btn" @click="$router.push('/index/home/channel')"></a>
            </div>
        </nav>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    data() {
        return {
            hot_topic: '搜你想搜的',
            move: 0
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexActive',  // 当前ative的栏目
            'activeIndex',  // 当前active的栏目的数组位置
            'indexColumn'   // 栏目数据
        ])
    },
    watch: {
        indexActive () {
            this.slideTo(this.activeIndex)
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive'
        ]),
        ...mapActions('search', [
            'get_topic_data'
        ]),
        // 获取推荐信息
        get_topic() {
            this.get_topic_data()
            .then(res => {
                if (res.data) {
                    this.hot_topic = res.data
                }
            })
        },
        // 自己实现导航栏滚动
        slideTo (index) {
            this.$nextTick(() => {
                let _container = $('.nav_ul')           // 获取滚动容器元素
                let _column = $('.nav_ul a').eq(index)  // 获取当前active栏目元素
                if (_column) {
                    let _container_width = _container.width()               // 容器宽度
                    let _container_left = _container.scrollLeft()           // 容器当前滚动条的值
                    let _column_width = _column.width()                     // 栏目宽度
                    let _column_left = _column.position().left              // 栏目距离屏幕左边的距离
                    let midWidth = (_container_width - _column_width) / 2   // 屏幕中心线的宽度
                    // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
                    if (_container_left === 0 && _column_left <= midWidth) {
                        this.move = 0
                    } else {
                        this.move = _container_left + (_column_left - midWidth)
                    }
                    _container.animate({ 'scrollLeft': this.move }, 300)
                }
            })
        },
        navClick (type) {
            this.set_indexActive(type) // 点击栏目需要改变vuex内的indexActive值，这是为了与swiper联动
        },
        goTop() {
            $(`.container.${this.indexActive}`).animate({scrollTop: 0})
        }
    },
    mounted() {
        this.get_topic()
    },
    // activated钩子是要在keep-alive下才能使用
    activated () {
        this.$nextTick(() => {
            $('.nav_ul').scrollLeft(this.move)
        })
    }
}
</script>
<style lang='stylus'>
ios_height = 0.535rem
header_height = 1.335rem
nav_height = 0.96rem
menu_width = 1.06rem
#indexHeader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    overflow: hidden;
    .iosStatus {
        width: 100%;
        height: ios_height;
    }
    header {
        display: block;
        position: relative;
        overflow: hidden;
        background-color: #00939c;
        color: #fff;
        .top_bar {
            position: relative;
            height: header_height;
            user-select: none;
            display: flex;
            align-items: center;
            .logo{
                flex: 1.5;
                height: 100%;
                margin-left: 0.4rem;
            }
            .search{
                flex: 2.5;
                height: 100%;
                padding: 0.3rem 0.4rem 0.25rem;
                color: #00939c;
                overflow: hidden;
                .search_wrap{
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #ddd;
                    border-radius: 50px;
                    background: #fff;
                    overflow: hidden;
                    padding: 0 0.267rem;
                    .icon-search{
                        font-size: 15px;
                    }
                    .hot_topic{
                        margin-left: 0.16rem
                        font-size: 14px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    nav {
        position: relative;
        background-color: #f4f5f6;
        border-bottom: 1px solid #ddd;
        padding-right: menu_width;
        .nav_ul {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;
            font-size: 0;
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }
            a {
                display:table-cell; 
                *display:inline-block;
                vertical-align: middle;
                padding: 0 0.267rem;
                margin-left: 0.133rem;
                height: nav_height;
                font-size: 17px;
                color: #505050;
                white-space: nowrap;
                -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
                text-decoration: none;
                &:last-child {
                    margin-right: 0.133rem;
                }
                &.active {
                    color: #00939c;
                    border-bottom: 2px solid #00939c;
                    font-weight: bold;
                }
            }
        }
        .nav_menu {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            .shadow {
                position: absolute;
                width: 0.267rem;
                height: 100%;
                left: -0.267rem;
                background-size: contain;
                background-color: rgba(244, 245, 246, .3);
            }
            .more_btn {
                display: block;
                width: menu_width;
                height: 100%;
                background-size: 16px;
                background-color: #f4f5f6;
            }
        }
    }
}
</style>
<style>
#indexHeader .logo {
    background: url(~@/assets/img/news_logo.png)no-repeat center center;
    background-size: contain;
}
#indexHeader .shadow {
    background: url(~@/assets/img/shadow.png) no-repeat 100%;
}

#indexHeader .more_btn {
    background: url(~@/assets/img/menu_more.png) no-repeat 50%;
}
</style>
