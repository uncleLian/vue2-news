<template>
    <div id="detail">
        <header>
            <div class="iosHeader" v-if='$store.state.isIOS'></div>
            <div class="top_bar">
                <div class="abs_l" @click='$router.go(-1)'><i class="icon-back"></i></div>
                <div class="abs_m" @click.stop='goTop'>{{title}}</div>
                <div class="abs_r" @click='status.share = true'> <i class="icon-menu"></i></div>
            </div>
        </header>
        <div class="content" :class="{isIOS:$store.state.isIOS}">
            <div class="container" v-swiper:swiperRight='true'>
                <detail-article :newsJson='detailJson'></detail-article>
                <detail-tags :tagsJson='detailJson.infotags'></detail-tags>
                <detail-recommend :recommendJson='recommendJson'></detail-recommend>
                <a class="downLoad">翻到底了哦~</a>
            </div>
        </div>
        <spinner-load :show='status.spinnerLoad'></spinner-load>
        <share :show="status.share" :detailJson='detailJson' @on-status-change='shareStatusChange'></share>
    </div>
</template>
<script>
import detailArticle from './article'
import detailTags from './tags'
import detailRecommend from './recommend'
import share from './share'
export default {
    name: 'detail',
    components: {
        detailArticle,
        detailTags,
        detailRecommend,
        share,
    },
    data() {
        return {
            classid: null,
            id: null,
            ArticleURL: this.$store.state.ajaxURL.detailArticleURL,
            recommendURL: this.$store.state.ajaxURL.detailRecommendURL,
            detailJson: '', // 文章数据
            recommendJson: [], // 推荐数据
            title: '健康头条',
            status: {
                share: false, // 菜单栏
                spinnerLoad: false, // 加载动画
                goTop: false, // 返回头部
            },
        }
    },
    methods: {
        goTop() {
            $("#detail .container").animate({
                scrollTop: 0
            });
        },
        shareStatusChange(val) {
            this.status.share = val;
        },
        init() {
            this.detailJson = '';
            this.classid = this.$route.query.classid;
            this.id = this.$route.query.id;
            const columnTitle = ['推荐', '头条', '女性', '育儿', '中医', '本地', '政策', '产业', '旅游'];
            this.title = `健康头条 · ${columnTitle[this.classid]}`;
        },
        detailAjax() {
            const vm = this;
            vm.status.spinnerLoad = true;
            $('#detail .container').scrollTop(0);
            $.ajax({
                    url: vm.ArticleURL,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        classid: vm.classid,
                        id: vm.id
                    },
                })
                .done(function(json) {
                    // console.log('detailAjax', json[0]);
                    if (json) {
                        vm.detailJson = json[0];
                        vm.status.spinnerLoad = false;
                    }
                })
                .fail(function() {
                    console.log("error");
                })
        },
        recommendAjax() {
            const vm = this;
            $.ajax({
                    url: vm.recommendURL,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        classid: vm.classid,
                        id: vm.id
                    }
                })
                .done(function(json) {
                    // console.log('recommendAjax',json);
                    if (json) {
                        vm.recommendJson = json;
                    }
                })
                .fail(function() {
                    console.log("error");
                })
        },

        visitCollect(){
            $.ajax({
                url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
                type: 'GET'
            })
        },
    },
    watch: {
        $route(val) {
            if (val.name == "detail") {
                this.init();
                this.detailAjax();
                this.recommendAjax();
                this.visitCollect();
            }
        },
    },
    mounted: function() {
        this.init();
        this.detailAjax();
        this.recommendAjax();
        this.visitCollect();

    },
}
</script>
<style lang='stylus'>
#detail .content.isIOS{
    padding-top: 64px;
}
.iosHeader{
    width: 100%;
    height: 20px;
    background-color: #f8f8f8;
}
#detail {
    background: #f8f8f8;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    z-index: 999;
}

.top_bar {
    position: relative;
    height: 44px;
    background: #f8f8f8;
}

.top_bar .abs_l,
.top_bar .abs_m,
.top_bar .abs_r {
    position: absolute;
    top: 0;
    width: 44px;
    height: 44px;
    line-height: 44px;
    color: #333;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
}

.top_bar .abs_l {
    left: 0;
    z-index: 100;
}

.top_bar .abs_r {
    right: 0;
    z-index: 100;
}

.top_bar .abs_m {
    width: 100%!important;
}

.top_bar .abs_l i,
.top_bar .abs_r i {
    vertical-align: middle;
}

#detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.content {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    position: relative;
}

.content .container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.downLoad {
    display: block;
    width: 100%;
    height: 36px;
    line-height: 36px;
    background: #f67373;
    color: #fff;
    text-align: center;
    font-size: 14px;
}
</style>
