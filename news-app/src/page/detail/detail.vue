<detail-share ref="share" :detailJson='currentArticle'></detail-share>
<template>
    <div id="detail">
        <my-header fixed>
            <a slot="left" @click.stop='$router.go(-1)'><i class="icon-back"></i></a>
            <a slot="mid" @click.stop='goTop'>{{title}}</a>
            <a slot="right" @click.stop='$refs.share.toggle()'><i class="icon-menu"></i></a>
        </my-header>
        
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container" v-swiper:swiperRight='true'>
                <!-- 文章 -->
                <detail-article class='article' :json='currentArticle'></detail-article>
                <!-- 标签 -->
                <detail-tags class='tag' :json='currentArticle.infotags'></detail-tags>
                <!--  推荐 -->
                <detail-recommend class='recommend' :json='recommendJson'></detail-recommend>
                <!-- 下载 -->
                <a class="downLoad">翻到底了哦~</a>
            </div>
        </div>
        <!-- 分享 -->
        <detail-share ref="share"></detail-share>
        <!-- 加载 -->
        <loading :show='loading'></loading>
    </div>
</template>
<script>
import detailArticle from './components/article'
import detailTags from './components/tags'
import detailRecommend from './components/recommend'
import detailShare from './components/share'
import { mapGetters, mapActions } from 'vuex'
export default {
    name:'detail',
    components: { detailArticle, detailTags, detailRecommend, detailShare },
    data() {
        return {
            id: null,
            classid: null,
            title: '健康头条',
            currentArticle: {}, // 文章数据
            recommendJson: [], // 推荐数据
            loading: true, // 加载动画
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexColumn',
        ]),
    },
    methods: {
        ...mapActions('index', [
            'get_indexColumn_data',
        ]),
        ...mapActions('detail', [
            'get_Article_data',
            'get_Recommend_data',
        ]),
        goTop() {
            $("#detail .container").animate({scrollTop: 0});
        },
        async init(){
            this.classid = this.$route.query.classid;
            this.id = this.$route.query.id;
            $("#detail .container").scrollTop(0);
            if (!(this.indexColumn.length > 1 )) {
                await this.get_indexColumn_data();
            }
            let index = this.indexColumn.findIndex(n => n.classid == this.classid);
            if (index > -1) {
                this.title = `健康头条 · ${this.indexColumn[index].classname}`
            }
            this.get_Article(); // 获取 文章数据
            this.get_Recommend(); // 获取 推荐数据
            this.visitCollect(); // 浏览数据统计
        },
        get_Article() {
            this.loading = true;
            this.get_Article_data(this.id)
            .then(res => {
                if (res) {
                    this.currentArticle = res;
                    this.loading = false;
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        get_Recommend() {
            this.get_Recommend_data({'classid': this.classid, 'id': this.id})
            .then(res => {
                if (res) {
                    this.recommendJson = res;
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        visitCollect() {
            $.ajax({
                url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
                type: 'GET'
            })
        },
    },
    watch: {
        $route(val) {
            if (val.path.includes('detail')) {
                this.init();
            }
        },
    },
    mounted() {
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
    header {
        background: #f8f8f8;
        color: #333;
        font-size: 16px;
        i {
            font-size: 20px;
            font-weight: bold;
            vertical-align: middle;
        }
    }
    .content {
        width: 100%;
        height: 100%;
        padding-top: 44px;
        position: relative;
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }
        .article {
            padding: 0 16px;
        }
        .tag {
            margin: 10px 0;
        }
        .recommend {
            margin-top: 10px;
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
    }
}
</style>

