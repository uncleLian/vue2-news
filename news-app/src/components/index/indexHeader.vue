<template>
    <div id="indexHeader">
        <div class="iosHeader" v-if='$store.state.isIOS'></div>
        <header>
            <div class="top_bar">
                <div class="abs_m" @click.stop="goTop"></div>
                <div class="abs_r" @click.stop="$router.push('search')"></div>
            </div>
        </header>
        <nav class="nav">
            <div class="nav_ul">
                <dl v-for="(item,index) in navJson" :class='{active: item.type == active}' @click='active = item.type' :key="index">
                    <dd>
                        <a :class='{active: item.type == active}'>{{item.name}}
                </a>
                    </dd>
                </dl>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'indexHeader',
    props: ['navJson'],
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        init() {
            const move = sessionStorage.getItem('headerScrollLeft');
            if (move) {
                $('.nav_ul').scrollLeft(move)
            }
            const index = sessionStorage.getItem('indexActive');
            if (index) {
                this.active = index;
            }
        },
        goTop(params) {
            $(`.container.${this.active}`).animate({
                scrollTop: 0
            });
        },
        slideTo(index) {
            var $ul = $(".nav_ul");
            var $activeEle = $(".nav_ul a").eq(index);
            var ulWitch = $ul.width();
            var aWidth = $activeEle.width(); // 当前 a 宽度
            var midWidth = (ulWitch - aWidth) / 2; // 屏幕中心线的宽度
            var ullLeft = $ul.scrollLeft(); // 当前 ul 滚动条的值
            var aLeft = $activeEle.offset().left; // 当前 a 距离屏幕左边的距离
            var move; // 滚动距离
            if (ullLeft === 0 && aLeft <= midWidth) {
                move = 0;
            } else {
                move = ullLeft + (aLeft - midWidth);
            }
            $ul.animate({
                'scrollLeft': move
            }, 300);
            sessionStorage.setItem('headerScrollLeft', move);
        },
    },
    computed: {
        stateIndex() {
            return this.$store.state.indexActive
        }
    },
    watch: {
        active(val) {
            this.$store.commit('indexActiveMutation', val);
            this.slideTo(val);
        },
        stateIndex(val) {
            this.active = val;
        }
    },
    activated() {
        this.init();
    },
}
</script>
<style scoped lang='stylus'>
.iosHeader {
    width: 100%;
    height: 20px;
    background-color: #d43d3d;
}

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

.top_bar .back {
    display: inline-block;
    height: 44px;
    top: 0;
    left: 0;
    width: 44px;
    border-radius: 0;
    background: url(http://s3.pstatp.com/image/toutiao_mobile/header_back.png) no-repeat center center;
    background-size: 20px;
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
    background: url(../../assets/img/search.png)no-repeat center center;
    background-size: 24px;
}

.top_bar .abs_m {
    width: 100%;
    font-size: 20px;
    background: url(../../assets/img/news_logo.png)no-repeat center center;
    background-size: 145px;
}

nav {
    position: relative;
    height: 36px;
    background-color: #f4f5f6;
    border-bottom: 1px solid #ddd;
}

nav .nav_ul {
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
}

nav .nav_ul::-webkit-scrollbar {
    width: 0;
}

nav .nav_ul dl {
    display: inline-block;
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 5px;
    height: 36px;
    white-space: nowrap;
    -webkit-tap-highlight-color: rgba(0, 0, 0, .3)
}

nav .nav_ul dl:last-child {
    margin-right: 5px;
}

nav .nav_ul dl dd {
    text-align: center;
    height: 34px;
    line-height: 0;
    padding: 18px 0;
}

nav .nav_ul dl.active {
    border-bottom: 2px solid #ea413c;
}

nav .nav_ul a {
    font-size: 17px;
    color: #505050;
}

nav .nav_ul dl dd a.active {
    color: #ea413c;
}
</style>
