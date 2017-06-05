<template>
    <div id="indexHeader">
        <my-header>
            <a class='title' slot='mid' @click.stop="goTop"></a>
            <a class='searchBtn' slot='right' @click.stop="$router.push('/search')"></a>
        </my-header>
        
        <nav>
            <div class="nav_ul">
                <a href='javascript:;' v-for="(item,index) in indexColumn" :class='{active: indexActive == item.classpath}' @click="navClick(item,index)" :key="item">{{item.classname}}</a>
            </div>
            <div class="menu_more">
                <div class="shadow"></div>
                <a href='javascript:;' class="moreBtn" @click="$router.push('/theme')"></a>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            move: 0, // 滚动距离
        }
    },
    computed: {
        ...mapGetters('index',[
          'indexActive',
          'indexColumn',
        ]),
    },
    methods: {
        ...mapMutations('index',[
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
                if (ullLeft === 0 && aLeft <= midWidth) {
                    this.move = 0;
                } else {
                    this.move = ullLeft + (aLeft - midWidth);
                }
                sessionStorage.setItem('navScrollLeft', this.move);
            }
            $(".nav_ul").animate({ 'scrollLeft': this.move}, 300);
        },
        recover(){
            let move = sessionStorage.getItem('navScrollLeft');
            if(move){
                this.move = move;
                this.$nextTick(function(){
                    $('.nav_ul').scrollLeft(move);
                })
            }
        },
        navClick(item,index){
            this.slideTo(index);
            this.set_indexActive(item.classpath);
        },
    },
    watch: {
        indexActive(val) {
            let index = this.indexColumn.findIndex(obj => obj.classpath == val);
            this.slideTo(index);
        },
        indexColumn(){
            this.recover();
        },
    },
    activated(){
        this.recover();
    },
    mounted(){
        this.recover();
    }
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
    .title{
        background: url(../../../assets/img/news_logo.png)no-repeat center center;
        background-size: 145px;
    }
    .searchBtn{
        background: url(../../../assets/img/search.png)no-repeat center center;
        background-size: 24px;
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
}


</style>
