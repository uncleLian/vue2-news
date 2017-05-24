<template>
    <div id="search">

        <div class="header">
            <div class="iosHeader" v-if='$store.state.isIOS'></div>
            <!-- header -->
            <header>
                <div class="top_bar">
                    <div class="abs_l"> <a class="back" @click='$router.go(-1)'></a></div>
                    <div class="abs_m" @click.stop='goTop'>搜索</div>
                </div>
            </header>

            <!-- form -->
            <form id='search_form'>
                <div id="search_container">
                    <i class="icon-search search_icon"></i>
                    <input id='search_input' type="search" placeholder="请输入搜索关键词" v-model.trim='key'>
                </div>
            </form>
        </div>

        <div class="content" v-swiper:swiperRight='true' :class="{isIOS:$store.state.isIOS}">
            <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                <div class="empty" v-if="!searchJson">
                    <p>空空如也</p>
                    <p>快去搜索吧</p>
                </div>
                <list-item :itemJson="searchJson"></list-item>
                <div v-if="searchJson && searchJson.length > 0" class="bottomLoad">
                    <div class="loading" v-show='bottomLoading'>加载中...</div>
                    <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
                </div>
                <spinner-load :show='spinnerLoad'></spinner-load>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            key: '',
            page: 1,
            searchJson: [],
            bottomStatus: false,
            bottomLoading: true,
            bottomNoData: false,
            spinnerLoad: false,
        }
    },
    methods: {
        ...mapMutations([
            'set_searchLocation',
        ]),
        ...mapActions([
            'get_Search_data',
        ]),
        goTop() {
            $("#search .container").animate({scrollTop: 0});
        },
        init(){
            this.key = '';
            this.page = 1;
            this.searchJson = [];
        },
        searchAjax() {
            this.spinnerLoad = true;
            this.page = 1;
            $('#search .container').scrollTop(0);
            this.get_Search_data({'key': this.key, 'page': this.page})
            .then(res => {
                this.searchJson = res;
                this.page = 2;
                this.spinnerLoad = false;
            })
        },
        loadMore() {
            this.bottomStatus = true;
            this.get_Search_data({'key': this.key, 'page': this.page})
            .then(res =>{
                if (res) {
                    this.searchJson = [...this.searchJson,...res]
                    this.page++;
                }else {
                    this.bottomLoading = false;
                    this.bottomNoData = true;
                }
                this.bottomStatus = false;
            })
        },
        getLocation() {
            const location = this.$store.state.searchLocation;
            if (location) {
                $('#search .container').scrollTop(location);
            }
        },
        setLocation(){
            const location = $('#search .container').scrollTop();
            this.set_searchLocation(location)
        },
    },
    watch: {
        $route(to, from) {
            if (from.path.includes('index')) {
                this.init();
            }
        },
    },
    activated() {
        this.getLocation();
        if (this.$route.query.key) {
            this.key = this.$route.query.key;
            this.searchAjax();
        }
    },
    deactivated() {
        this.setLocation();
    },
    mounted() {
        $('#search_form').on('submit', event => {
            event.preventDefault();
            this.searchAjax();
        });
    }
}
</script>

<style scoped>
.iosHeader {
    width: 100%;
    height: 20px;
    background-color: #d43d3d;
}
.content.isIOS{
    padding-top: 103px;
}
#search {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.header {
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


/*top_bar*/

.top_bar {
    position: relative;
    height: 44px;
    background: #d43d3d;
}

.top_bar .back {
    display: inline-block;
    height: 44px;
    top: 0;
    width: 44px;
    border-radius: 0;
    background: url(http://s3.pstatp.com/image/toutiao_mobile/header_back.png) no-repeat center center;
    background-size: 20px;
}

.top_bar .abs_l,
.top_bar .abs_m,
.top_bar .abs_r {
    position: absolute;
    left: 0;
    top: 0;
    width: 44px;
    height: 44px;
}

.top_bar .abs_l {
    left: 0;
    z-index: 100;
}

.top_bar .abs_m {
    width: 100%;
    font-size: 20px;
    color: #fff;
    text-align: center;
    font-weight: 700;
    line-height: 44px;
}


/*search*/

#search_form {
    position: relative;
    background: #c9c9c9;
}

#search_container {
    padding: 5px;
}

.search_icon {
    display: block;
    position: absolute;
    left: 15px;
    top: 50%;
    margin-top: -8px;
    font-size: 16px;
    color: #aaa;
}

#search_input {
    border: 0;
    border-radius: 3px;
    margin: 0;
    width: 100%;
    font-size: 16px;
    -webkit-appearance: none;
    padding: 5px 10px 5px 40px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #666;
    background: #fff;
}

.content {
    width: 100%;
    height: 100%;
    padding-top: 83px;
    background: #fff;
}

.content .container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.empty {
    padding-top: 2.666667rem;
    text-align: center;
    font-size: 16px;
    color: #aaa;
}
.bottomLoad div {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #999;
}
</style>