<template>
    <div id="indexHeader">
        <header>
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
        <nav>
            <div class="nav_ul">
                <a href='javascript:;' v-for="(item,index) in column" :class='{active: indexActive == item.classpath}' @click="navClick(item.classpath)" :key="index">{{item.classname}}</a>
            </div>
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
    props: ['column'],
    data () {
        return {
            hot_topic: '搜你想搜的',
            move: 0
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexActive',
            'activeIndex'
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
        goTop() {
            $(`.container.${this.indexActive}`).animate({scrollTop: 0})
        },
        navClick (type) {
            this.set_indexActive(type)
        },
        slideTo (index) {
            this.$nextTick(() => {
                let $ul = $('.nav_ul')
                let $activeEle = $('.nav_ul a').eq(index)
                if ($activeEle.length === 0) {
                    return
                } else {
                    let ulWitch = $ul.width()
                    let aWidth = $activeEle.width()
                    let midWidth = (ulWitch - aWidth) / 2 // 屏幕中心线的宽度
                    let ullLeft = $ul.scrollLeft() // ul 滚动条的值
                    let aLeft = $activeEle.position().left // $activeEle 距离屏幕左边的距离
                    if (ullLeft === 0 && aLeft <= midWidth) {
                        this.move = 0
                    } else {
                        this.move = ullLeft + (aLeft - midWidth)
                    }
                    $ul.animate({'scrollLeft': this.move}, 300)
                }
            })
        },
        get_topic() {
            this.get_topic_data()
            .then(res => {
                if (res.code === 0 && res.data) {
                    this.hot_topic = res.data
                }
            })
        }
    },
    activated () {
        this.$nextTick(() => {
            $('.nav_ul').scrollLeft(this.move)
        })
    },
    mounted() {
        this.get_topic()
    }
}
</script>
<style scoped lang='stylus'>
ios_height = 0.535rem
header_height = 1.335rem
nav_height = 0.96rem
menu_width = 1.06rem
.iosStatus {
    width: 100%;
    height: ios_height;
}
#indexHeader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    overflow: hidden;
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
<style scoped>
.logo {
    background: url(~@/assets/img/news_logo.png)no-repeat center center;
    background-size: contain;
}
.shadow {
    background: url(~@/assets/img/shadow.png) no-repeat 100%;
}

.more_btn {
    background: url(~@/assets/img/menu_more.png) no-repeat 50%;
}
</style>
