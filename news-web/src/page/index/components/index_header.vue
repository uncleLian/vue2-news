<template>
    <div id="indexHeader">
        <!-- 头部 -->
        <header>
            <div class="top_bar">
                <div class="abs_l"></div>
                <div class="abs_m">
                    <a class='title' @click.stop="goTop"></a>
                </div>
                <div class="abs_r">
                    <a class='search_btn' slot='right' @click.stop="$router.push('/search')"></a>
                </div>
            </div>
        </header>
        <!-- 栏目 -->
        <nav>
            <div class="nav_ul">
                <a href='javascript:;' v-for="(item,index) in indexColumn" :class='{active: indexActive == item.classpath}' @click.stop="navClick(item.classpath)" :key="index">{{item.classname}}</a>
            </div>
            <!-- 更多栏目 -->
            <!-- <div class="nav_menu">
                <div class="shadow"></div>
                <a href='javascript:;' class="more_btn" @click="$router.push('/index/channel')"></a>
            </div> -->
        </nav>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapGetters('index', [
            'indexActive',  // 当前ative的栏目
            'activeIndex',  // 当前active的栏目的数组位置
            'indexColumn'   // 栏目数据
        ])
    },
    watch: {
        indexActive() {
            this.slideTo(this.activeIndex)
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive'
        ]),
        // 自己实现导航栏滚动
        slideTo(index) {
            this.$nextTick(() => {
                let _container = $('.nav_ul')           // 获取滚动容器元素
                let _column = $('.nav_ul a').eq(index)  // 获取当前active栏目元素
                if (_column) {
                    let move    // 最终滚动值
                    let _container_width = _container.width()               // 容器宽度
                    let _container_left = _container.scrollLeft()           // 容器当前滚动条的值
                    let _column_width = _column.width()                     // 栏目宽度
                    let _column_left = _column.position().left              // 栏目距离屏幕左边的距离
                    let midWidth = (_container_width - _column_width) / 2   // 屏幕中心线的宽度
                    // 容器滚动为0，并且active栏目位于中间线左边？滚动值为0 ：当前容器滚动值 + （active栏目相对于中间线的值，有正负）
                    if (_container_left === 0 && _column_left <= midWidth) {
                        move = 0
                    } else {
                        move = _container_left + (_column_left - midWidth)
                    }
                    _container.animate({ 'scrollLeft': move }, 300)
                    sessionStorage.setItem('navScrollLeft', move)       // 存计算后的值
                }
            })
        },
        // 滚动恢复
        scrollRecover() {
            let move = sessionStorage.getItem('navScrollLeft')          // 取计算后的值
            if (move) {
                this.$nextTick(() => {
                    $('.nav_ul').scrollLeft(move)
                })
            }
        },
        navClick(type) {
            this.set_indexActive(type) // 点击栏目需要改变vuex内的indexActive值，这是为了与swiper联动
        },
        goTop() {
            $(`#index .${this.indexActive}`).animate({scrollTop: 0})
        }
    },
    // activated钩子是要在keep-alive下才能使用
    activated() {
        this.scrollRecover()
    }
}
</script>
<style lang='stylus'>
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
        &.fixed{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        .title {
            background-size: 145px;
        }
        .search_btn {
            background-size: 24px;
        }
        .top_bar {
            position: relative;
            height: 44px;
            line-height: 44px;
            user-select:none;
            a{
                display: block;
                width: 100%;
                height: 100%;
                color: inherit;
                font-size: inherit;
                font-weight: inherit;
            }
            .abs_l,.abs_m,.abs_r {
                position: absolute;
                top: 0;
                width: 44px;
                height: 100%;
                font-size: inherit;
                color: inherit;
                text-align: center
            }
            .abs_l {
                left: 0;
                z-index: 1000;
            }
            .abs_m {
                width: 100%;
                font-weight: 700;
                z-index: 999;
            }
            .abs_r {
                right: 0;
                z-index: 1000;
            }
        }
    }
    nav {
        position: relative;
        height: 36px;
        line-height: 36px;
        background-color: #f4f5f6;
        border-bottom: 1px solid #ddd;
        /*更多栏目*/
        /*padding-right: 40px;  */
        .nav_ul {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;
            font-size: 0;
            &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
            }
            a {
                display: inline-block;
                padding-left: 10px;
                padding-right: 10px;
                margin-left: 5px;
                height: 36px;
                line-height: 36px;
                font-size: 17px;
                color: #505050;
                white-space: nowrap;
                -webkit-tap-highlight-color: rgba(0, 0, 0, .3);
                text-decoration: none;
                &:last-child {
                    margin-right: 5px;
                }
                &.active {
                    color: #00939c;
                    border-bottom: 2px solid #00939c;
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
                width: 10px;
                height: 100%;
                left: -10px;
                background-size: contain;
                background-color: rgba(244, 245, 246, .3);
            }
            .more_btn {
                display: block;
                width: 40px;
                height: 100%;
                background-size: 20px;
                background-color: #f4f5f6;
            }
        }
    }
}
</style>
<style>
#indexHeader .title {
    background: url(~@/assets/img/news_logo.png)no-repeat center center;
    background-size: contain;
}
#indexHeader .search_btn {
    background: url(~@/assets/img/search.png)no-repeat center center;
}
#indexHeader .shadow {
    background: url(~@/assets/img/shadow.png) no-repeat 100%;
}
#indexHeader .more_btn {
    background: url(~@/assets/img/menu_more.png) no-repeat 50%;
}
</style>
