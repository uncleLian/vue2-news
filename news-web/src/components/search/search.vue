<template>
    <div id="search">
        <div class="header">
            <header>
                <div class="top_bar">
                    <div class="abs_l"> <a class="back" @click='$router.go(-1)'></a></div>
                    <div class="abs_m" @click.stop='goTop'>搜索</div>
                </div>
            </header>
            <form id='search_form'>
                <div id="search_container">
                    <i class="icon-search search_icon"></i>
                    <input id='search_input' type="search" placeholder="请输入搜索关键词" v-model.trim='searchVal'>
                </div>
            </form>
        </div>
        <div class="content" v-swiper:swiperRight='true'>
            <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
                <div class="empty" v-if="!searchJson.length">
                    <p>空空如也</p>
                    <p>快去搜索吧</p>
                </div>
                <list-item :itemJson="searchJson"></list-item>
                <div v-if="searchJson.length > 0" class="bottomLoad">
                    <div class="loading" v-show='bottomLoading'>加载中...</div>
                    <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
                </div>
                <spinner-load :show='spinnerLoad'></spinner-load>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'search',
    data() {
        return {
            searchVal: '',
            searchPage: 2,
            searchURL: this.$store.state.ajaxURL.searchURL,
            searchJson: [],
            bottomStatus: false,
            spinnerLoad: false,
            bottomLoading: true,
            bottomNoData: false,
        }
    },
    methods: {
        goTop() {
            $("#search .container").animate({
                scrollTop: 0
            });
        },
        searchAjax() {
            const vm = this;
            vm.spinnerLoad = true;
            $('#search .container').scrollTop(0);
            $.ajax({
                    url: vm.searchURL,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        key: vm.searchVal,
                        page: 1
                    },
                })
                .done(function(json) {
                    // console.log('searchAjax',json);
                    vm.spinnerLoad = false;
                    if (json) {
                        vm.searchJson = json;
                        vm.searchPage = 2;
                    }
                })
                .fail(function() {
                    console.log("error");
                })
        },
        loadMore() {
            const vm = this;
            vm.bottomStatus = true;
            $.ajax({
                    url: vm.searchURL,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        key: vm.searchVal,
                        page: vm.searchPage
                    }
                })
                .done(function(json) {
                    // console.log('searchLoadMore',json);
                    if (json) {
                        for (var i = 0; i < json.length; i++) {
                            vm.searchJson.push(json[i]);
                        }
                        vm.searchPage++;
                    } else {
                        vm.bottomLoading = false;
                        vm.bottomNoData = true;
                    }
                    vm.bottomStatus = false;
                })
                .fail(function() {
                    console.log("error");
                })
        },
        tagsSearch() {
            if (this.$route.query.key) {
                this.searchVal = this.$route.query.key;
                this.searchAjax();
            }
        },
        getLocation() {
            const location = this.$store.state.searchLocation;
            if (location) {
                $('#search .container').scrollTop(location);
            }
        },
        setLocation() {
            const location = $('#search .container').scrollTop();
            this.$store.commit('searchLocationChange', location);
        },
    },
    watch: {
        $route(to, from) {
            if (from.matched[0].name == 'index') {
                this.searchVal = '';
                this.searchJson = [];
            }
        },
    },
    activated() {
        this.getLocation();
        this.tagsSearch();
    },
    deactivated() {
        this.setLocation();
    },
    mounted() {
        const vm = this;
        $('#search_form').on('submit', function(event) {
            event.preventDefault();
            vm.searchAjax();
        });
    }
}
</script>
<style scoped lang='stylus'>
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
[data-dpr="2"] .top_bar {
    height: 88px;
}

[data-dpr="2"] .top_bar .back {
    height: 88px;
    width: 88px;
    background-size: 40px;
}

[data-dpr="2"] .top_bar .abs_l,
[data-dpr="2"] .top_bar .abs_m,
[data-dpr="2"] .top_bar .abs_r {
    width: 88px;
    height: 88px;
}

[data-dpr="2"] .top_bar .abs_m {
    width: 100%;
    font-size: 40px;
    line-height: 88px;
}

[data-dpr="2"] #search_container {
    padding: 10px;
}

[data-dpr="2"] .search_icon {
    left: 30px;
    margin-top: -16px;
    font-size: 32px;
}

[data-dpr="2"] #search_input {
    border-radius: 6px;
    font-size: 32px;
    padding: 10px 20px 10px 80px;
}

[data-dpr="2"] .content {
    padding-top: 166px;
}

[data-dpr="2"] .empty {
    font-size: 32px;
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
}

[data-dpr="3"] .top_bar .abs_m {
    width: 100%;
    font-size: 60px;
    line-height: 132px;
}

[data-dpr="3"] #search_container {
    padding: 15px;
}

[data-dpr="3"] .search_icon {
    left: 45px;
    margin-top: -24px;
    font-size: 48px;
}

[data-dpr="3"] #search_input {
    border-radius: 9px;
    font-size: 48px;
    padding: 15px 30px 15px 120px;
}

[data-dpr="3"] .content {
    padding-top: 249px;
}

[data-dpr="3"] .empty {
    font-size: 48px;
}

.bottomLoad {
    width: 100%;
    height: 50px;
    overflow: hidden;
    position: relative;
}
[data-dpr="2"] .bottomLoad {
    height: 100px;
}

[data-dpr="2"] .bottomLoad div {
    height: 100px;
    line-height: 100px;
    font-size: 32px;
}

[data-dpr="3"] .bottomLoad {
    height: 150px;
}

[data-dpr="3"] .bottomLoad div {
    height: 150px;
    line-height: 150px;
    font-size: 48px;
}
</style>
