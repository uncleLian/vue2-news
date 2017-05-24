<template>
    <div id="indexHeader">
        <header>
            <div class="top_bar">
                <div class="abs_m" @click.stop="goTop"></div>
                <div class="abs_r" @click.stop="$router.push('search')"></div>
            </div>
        </header>
        <nav>
            <div class="nav_ul">
                <a v-for="(item,index) in indexColumn" :class='{active: active == index}' @click='active = index' :key="index">{{item.classname}}</a>
            </div>
            <div class="menu_more">
                <div class="shadow"></div>
                <a class="moreBtn"></a>
            </div>
        </nav>
    </div>
</template>
<script>

import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        ...mapMutations([
            'set_indexActive',
        ]),
        goTop(){
            $(`.container.${this.indexActive}`).animate({scrollTop: 0});
        },
        slideTo(index) {
            let $activeEle = $('.nav_ul a').eq(index);
            if ($activeEle.length == 0) { return } 
            else {
                let $ul = $(".nav_ul");
                let ulWitch = $ul.width();
                let aWidth = $activeEle.width(); // 当前 a 宽度
                let midWidth = (ulWitch - aWidth) / 2; // 屏幕中心线的宽度
                let ullLeft = $ul.scrollLeft(); // 当前 ul 滚动条的值
                let aLeft = $activeEle.offset().left; // 当前 a 距离屏幕左边的距离
                let move; // 滚动距离
                if (ullLeft === 0 && aLeft <= midWidth) {
                    move = 0;
                } else {
                    move = ullLeft + (aLeft - midWidth);
                }
                if (move == 0) {return} 
                else {
                    $ul.animate({
                        'scrollLeft': move
                    }, 300);
                    sessionStorage.setItem('navScrollLeft', move);
                }
            }
        },
    },
    computed: {
        ...mapGetters([
          'indexActive',
          'indexColumn',
        ]),
    },
    watch: {
        active(val) {
            this.slideTo(val);
            this.set_indexActive(this.indexColumn[val].classpath)
        },
        indexActive(val) {
            this.active = this.indexColumn.findIndex(obj => obj.classpath == val);
        },
    },
    activated() {
        let navScrollLeft = sessionStorage.getItem('navScrollLeft');
        if (navScrollLeft) {
            $('.nav_ul').scrollLeft(navScrollLeft);
        }
    },
}
</script>
<style scoped lang='stylus'>

#indexHeader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    overflow: hidden;
}

header {
    display: block;
    position: relative;
    overflow: hidden;
}

.top_bar {
    position: relative;
    height: 44px;
    background-color: #d43d3d;
}

.top_bar .abs_l,
.top_bar .abs_m,
.top_bar .abs_r {
    position: absolute;
    top: 0;
    width: 44px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    text-align: center
}

.top_bar .abs_l {
    left: 0;
    z-index: 100;
}

.top_bar .abs_r {
    right: 0;
    z-index: 100;
    background: url(../../../assets/img/search.png)no-repeat center center;
    background-size: 24px;
}

.top_bar .abs_m {
    width: 100%;
    font-size: 20px;
    background: url(../../../assets/img/news_logo.png)no-repeat center center;
    background-size: 145px;
}

nav {
    position: relative;
    height: 36px;
    line-height: 36px;
    background-color: #f4f5f6;
    border-bottom: 1px solid #ddd;
    padding-right: 40px;
    .nav_ul {
        overflow: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        white-space: nowrap;
        a{
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
        }
        a:last-child {
            margin-right: 5px;
        }
        a.active {
            color: #ea413c;
            border-bottom: 2px solid #ea413c;
        }
    }
    .nav_ul::-webkit-scrollbar {
        width: 0px;
    }
    .menu_more{
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        .shadow{
            position: absolute;
            width: 10px;
            height: 100%
            left: -10px;
            background: url(../../../assets/img/shadow.png) no-repeat 100%;
            background-size: contain;
            background-color: rgba(244,245,246,.3);
        }
        .moreBtn{
            display: block;
            background: url(../../../assets/img/menu_more.png) no-repeat 50%;
            width: 40px;
            height: 100%
            background-size: 20px;
            background-color: #f4f5f6;
        }
    }
}

[data-dpr="2"] nav .moreBtn{
    width: 80px;
    background-size: 40px;
}
[data-dpr="3"] nav .moreBtn{
    width: 120px;
    background-size: 60px;
}

[data-dpr="2"] header {
    height: 88px;
}

[data-dpr="2"] .top_bar {
    height: 88px;
}

[data-dpr="2"] .top_bar .abs_l,
[data-dpr="2"] .top_bar .abs_m,
[data-dpr="2"] .top_bar .abs_r {
    width: 88px;
    height: 88px;
    line-height: 88px;
}

[data-dpr="2"] .top_bar .abs_m {
    width: 100%;
    font-size: 40px;
    background-size: 290px;
}

[data-dpr="2"] .top_bar .abs_r {
    background-size: 48px;
}

[data-dpr="3"] header {
    height: 132px;
}

[data-dpr="3"] .top_bar {
    height: 132px;
}

[data-dpr="3"] .top_bar .back {
    height: 132px;
    width: 132px;
    background-size: 60px;
}

[data-dpr="3"] .top_bar .abs_l,
[data-dpr="3"] .top_bar .abs_m,
[data-dpr="3"] .top_bar .abs_r {
    width: 132px;
    height: 132px;
    line-height: 132px;
}

[data-dpr="3"] .top_bar .abs_m {
    width: 100%;
    font-size: 60px;
    background-size: 435px;
}

[data-dpr="3"] .top_bar .abs_r {
    background-size: 72px;
}

[data-dpr="2"] nav {
    height: 72px;
    line-height: 72px;
    padding-right: 80px;
    border-bottom: 2px solid #ddd;
}

[data-dpr="2"] .nav_ul a {
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
    height: 72px;
    line-height: 72px;
    font-size: 34px;
}

[data-dpr="2"] .nav_ul a:last-child {
    margin-right: 10px;
}

[data-dpr="2"] .nav_ul a.active {
    border-bottom: 4px solid #ea413c;
}

[data-dpr="3"] nav {
    height: 108px;
    line-height: 108px;
    padding-right: 120px;
    border-bottom: 3px solid #ddd;
}

[data-dpr="3"] .nav_ul a {
    padding-left: 30px;
    padding-right: 30px;
    margin-left: 15px;
    height: 108px;
    line-height: 108px;
    font-size: 51px;
}

[data-dpr="3"] .nav_ul a:last-child {
    margin-right: 15px;
}

[data-dpr="3"] .nav_ul a.active {
    border-bottom: 6px solid #ea413c;
}
</style>
