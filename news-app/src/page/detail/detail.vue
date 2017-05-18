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
                <!-- 文章 -->
                <detail-article :newsJson='currentArticle'></detail-article>
                <!-- 标签 -->
                <detail-tags :tagsJson='currentArticle.infotags'></detail-tags>
                <!--  推荐 -->
                <detail-recommend :recommendJson='recommendJson'></detail-recommend>

                <a class="downLoad">翻到底了哦~</a>
            </div>
        </div>
        <!-- 分享 -->
        <share :show="status.share" @on-status-change='shareStatusChange' :detailJson='currentArticle'></share>
        <!-- 加载 -->
        <spinner-load :show='status.spinnerLoad'></spinner-load>
    </div>
</template>
<script>
import detailArticle from './components/article'
import detailTags from './components/tags'
import detailRecommend from './components/recommend'
import share from './components/share'
import { mapActions } from 'vuex'
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
            title: '健康头条',
            currentArticle:{},  // 文章数据
            recommendJson: [], // 推荐数据
            query: {
                id: null,
                classid: null
            },
            status: {
                share: false, // 菜单栏
                spinnerLoad: true, // 加载动画
            },

        }
    },
    methods: {
        ...mapActions([
          'get_newsColumn_data',
          'get_Article_data',
          'get_Recommend_data',
        ]),
        goTop() {
            $("#detail .container").animate({scrollTop: 0});
        },
        shareStatusChange(val) {
            this.status.share = val;
        },
        init() {
            this.status.spinnerLoad = true;
            this.query.classid = this.$route.query.classid;
            this.query.id = this.$route.query.id;
            $("#detail .container").scrollTop(0);
            this.get_newsColumn_data();
            this.title = `健康头条 · ${this.$store.state.newsColumn[this.query.classid].name}`;
            this.get_Article(); // 获取 文章数据
            this.get_Recommend(); // 获取 推荐数据
            this.visitCollect(); // 浏览数据统计
        },
        get_Article() {
            this.get_Article_data(this.query.id)
            .then(res => {
                if (res) {
                    this.currentArticle = res;
                    this.status.spinnerLoad = false;
                }
            })
        },
        get_Recommend() {
            this.get_Recommend_data(this.query)
            .then(res => {
                if(res){
                    this.recommendJson = res;
                }
            })
        },
        visitCollect() {
            $.ajax({
                url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.query.classid}&id=${this.query.id}&addclick=1`,
                type: 'GET'
            })
        }
    },
    watch: {
        $route(val) {
            if (val.path.includes('detail')) {
                this.init();
            }
        },
    },
    mounted: function() {
        this.init();
    }
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
