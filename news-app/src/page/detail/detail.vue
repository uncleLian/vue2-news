<template>
    <div id="detail">
        <my-header fixed>
            <a slot="left" @click.stop='$router.go(-1)'><i class="icon-back"></i></a>
            <a slot="mid" @click.stop='goTop'>{{title}}</a>
            <a slot="right" @click.stop='share = true'> <i class="icon-menu"></i></a>
        </my-header>

        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container" v-swiper:swiperRight='true'>
                <!-- 文章 -->
                <detail-article :newsJson='currentArticle'></detail-article>
                <!-- 标签 -->
                <detail-tags :tagsJson='currentArticle.infotags'></detail-tags>
                <!--  推荐 -->
                <detail-recommend :recommendJson='recommendJson'></detail-recommend>
                <!-- 下载 -->
                <a class="downLoad">翻到底了哦~</a>
            </div>
        </div>
        <!-- 分享 -->
        <detail-share :show="share" @on-status-change='shareStatusChange' :detailJson='currentArticle'></detail-share>
        <!-- 加载 -->
        <spinner-load :show='spinnerLoad'></spinner-load>
    </div>
</template>
<script>
import detailArticle from './components/article'
import detailTags from './components/tags'
import detailRecommend from './components/recommend'
import detailShare from './components/share'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        detailArticle,
        detailTags,
        detailRecommend,
        detailShare,
    },
    data() {
        return {
            id: null,
            classid: null,
            title: '健康头条',
            currentArticle: {}, // 文章数据
            recommendJson: [], // 推荐数据
            share: false, // 菜单栏
            spinnerLoad: true, // 加载动画

        }
    },
    computed: {
        ...mapGetters('index',[
            'indexColumn',
        ]),
    },
    methods: {
        ...mapActions('index',[
            'get_indexColumn_data',
        ]),
        ...mapActions('detail',[
            'get_Article_data',
            'get_Recommend_data',
        ]),
        goTop() {
            $("#detail .container").animate({
                scrollTop: 0
            });
        },
        shareStatusChange(val) {
            this.share = val;
        },
        async init() {
            this.spinnerLoad = true;
            this.classid = this.$route.query.classid;
            this.id = this.$route.query.id;
            $("#detail .container").scrollTop(0);
            if (this.indexColumn.length == 1 ) {
                await this.get_indexColumn_data();
            }
            let index = this.indexColumn.findIndex( n => n.classid == this.classid);
            if(index > -1){
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
            this.get_Article(); // 获取 文章数据
            this.get_Recommend(); // 获取 推荐数据
            this.visitCollect(); // 浏览数据统计
        },
        get_Article() {
            this.get_Article_data(this.id)
            .then(res => {
                if (res) {
                    this.currentArticle = res;
                    this.spinnerLoad = false;
                }
            })
        },
        get_Recommend() {
            this.get_Recommend_data({'classid': this.classid,'id': this.id})
            .then(res => {
                if (res) {
                    this.recommendJson = res;
                }
            })
        },
        visitCollect() {
            $.ajax({
                url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
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
<style scoped lang='stylus'>
#detail .content.isIOS{
    padding-top: 64px;
}
#detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f8f8f8;
}

#detail header {
    background: #f8f8f8;
    color: #333;
}

#detail header i{
    font-size: 20px;
    font-weight: bold;
    vertical-align: middle;
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
