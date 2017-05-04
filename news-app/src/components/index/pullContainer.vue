<template>
    <div class="container" :class="type" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="pull_down">
            <div class="dataCount messageBox">已为你推荐{{dataCount}}条新内容</div>
            <div class="noNewData messageBox">没有最新的内容了</div>
            <div class="requestFail messageBox">网络请求失败,请检查网络</div>
        </div>
        <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false' :distance='distance'>
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus == 'pull'">下拉刷新↓</span>
                <span v-show="topStatus == 'drop'">释放更新↑</span>
                <span v-show="topStatus == 'loading'">加载中...</span>
            </div>
            <list-item :itemJson="contentJson"></list-item>
            <!-- 上滑提示 -->
            <div v-if="contentJson.length > 0" class="bottomLoad">
                <div class="loading" v-show='bottomLoading'>加载中...</div>
                <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
import {
    Indicator
} from 'mint-ui'

export default {
    props: ['type'],
    data() {
        return {
            location: 0,
            classid: 0,
            loadTopPage: 1,
            loadBottomPage: 1,
            classPage: 1,
            loadTopURL: this.$store.state.ajaxURL.indexLoadTopURL,
            loadBottomURL: this.$store.state.ajaxURL.indexLoadBottomURL,
            classURL: this.$store.state.ajaxURL.indexClassURL,
            contentJson: [], // 整个json数据arr
            dataCount: 0, // 推荐内容数量
            topStatus: '', // 下拉 状态
            bottomStatus: false, // 上滑 防止多次触发
            bottomLoading: true,
            bottomNoData: false,
            distance: false, // 左右移动中 是否可以下拉
        }
    },
    methods: {
        handleTopChange(status) {
            this.topStatus = status;
        },
        init() {
            const vm = this;
            const index = sessionStorage.getItem('indexActive');
            const sessionPageJson = JSON.parse(sessionStorage.getItem('indexContentPage'));
            const sessionAjaxJson = JSON.parse(sessionStorage.getItem(`${vm.type}Json`));
            if (index) {
                vm.classid = index;
            }
            if (sessionPageJson) {
                vm.loadTopPage = sessionPageJson[0].loadTopPage; // loadTopPage
                vm.loadBottomPage = sessionPageJson[0].loadBottomPage; // loadBottomPage
                vm.classPage = sessionPageJson[vm.type].classPage; // classPage
            }
            if (sessionAjaxJson) {
                vm.contentJson = sessionAjaxJson; // 缓存 sessionPageJson
            } else if (vm.classid == vm.type) {
                this.loadTopAjax();
            }
        },
        loadTopAjax() {
            const vm = this;
            Indicator.open();
            var url;
            var page;
            vm.classid == 0 ? url = vm.loadTopURL : url = vm.classURL;
            vm.classid == 0 ? page = vm.loadTopPage : page = vm.classPage;
            $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        page: page,
                        classid: vm.classid
                    },
                })
                .done(function(json) {
                    // console.log('loadTop', json);
                    $('.pull_down .requestFail').hide();
                    if (json) {
                        var len = json.length;
                        vm.dataCount = len;
                        for (var i = len - 1; i >= 0; i--) {
                            vm.contentJson.unshift(json[i]);
                        }
                        vm.classid == 0 ? vm.loadTopPage++ : vm.classPage++
                            /*上次观看到这里*/
                            for (var i = 0; i < vm.contentJson.length; i++) {
                                if (vm.contentJson[i].type == 'lookHere') {
                                    vm.contentJson.splice(i, 1);
                                    break
                                }
                            }
                        vm.contentJson.splice(10, 0, {
                            type: 'lookHere'
                        });
                        $(`.container.${vm.type} .pull_down .dataCount`).slideDown(200).delay(1000).slideUp(200);

                    } else {
                        $(`.container.${vm.type} .pull_down .noNewData`).slideDown(200).delay(1000).slideUp(200);
                    }
                    Indicator.close();
                    vm.$refs.loadmore.onTopLoaded();

                })
                .fail(function(error) {
                    $(`.container.${vm.type} .pull_down .requestFail`).show();
                });
        },
        loadBottomAjax() {
            const vm = this;
            vm.bottomStatus = true;
            var url;
            var page;
            vm.classid == 0 ? url = vm.loadBottomURL : url = vm.classURL;
            vm.classid == 0 ? page = vm.loadBottomPage : page = vm.classPage;
            $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        page: page,
                        classid: vm.classid
                    },
                })
                .done(function(json) {
                    // console.log('loadBottom',json);
                    if (json) {
                        for (var i = 0; i < json.length; i++) {
                            vm.contentJson.push(json[i]);
                        }
                        vm.classid == 0 ? vm.loadBottomPage++ : vm.classPage++
                    } else {
                        vm.bottomLoading = false;
                        vm.bottomNoData = true;
                    }
                    vm.bottomStatus = false;
                })
                .fail(function() {
                    console.log("error")
                });
        },
        getLocation() {
            const vm = this;
            const sessionLocationJson = JSON.parse(sessionStorage.getItem('indexContentLocation'));
            if (sessionLocationJson) {
                vm.location = sessionLocationJson[vm.type].location;
                $(`.container.${vm.type}`).scrollTop(vm.location);
                this.$store.commit('indexContentLocation', sessionLocationJson);
            }
        },
        setLocation() {
            const vm = this;
            var indexActive = vm.indexActive;
            if (indexActive == vm.type) {
                const locationObj = {
                    index: indexActive,
                    location: $(`.container.${vm.type}`).scrollTop(),
                };
                vm.$store.commit('LocationChange', locationObj);
            }
        },
        lookHereClick() {
            var vm = this;
            $(`.container.${vm.type}`).on('click', '#lookHere', function() {
                $(`.container.${vm.type}`).animate({
                    scrollTop: 0
                }, function() {
                    vm.loadTopAjax();
                });
            });
        }
    },
    computed: {
        indexActive() {
            return this.$store.state.indexActive
        },
        topBottomPage() {
            return {
                topPage: this.loadTopPage,
                bottomPage: this.loadBottomPage
            }
        },
        swiperMove() {
            return this.$store.state.swiperMove
        },
    },
    watch: {
        swiperMove(val) {
            this.distance = val;
        },
        indexActive(val) {
            this.classid = val;
            this.$store.commit('indexActiveMutation', val);
            if (this.classid == this.type && this.contentJson.length == 0) {
                this.loadTopAjax();
            }
        },
        contentJson(val) {
            sessionStorage.setItem(`${this.type}Json`, JSON.stringify(val));
        },
        topBottomPage(val) {
            this.$store.commit('topBottomPageChange', val);
        },
        classPage(val) {
            const obj = {
                index: this.classid,
                page: val
            };
            this.$store.commit('classPageChange', obj);
        },
    },
    activated() {
        this.getLocation();
    },
    deactivated() {
        this.setLocation();
    },
    mounted() {
        this.init(); // 初始化组件
        this.lookHereClick();
    }
}
</script>
<style>
.container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
}

.messageBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 32px;
    line-height: 34px;
    font-size: 14px;
    color: #2a90d7;
    background: rgba(213, 233, 247, .9);
    text-align: center;
    display: none;
}

.requestFail.messageBox {
    color: #f56767;
    background: #FBE9EF;
}

.bottomLoad {
    width: 100%;
    height: 50px;
    overflow: hidden;
    position: relative;
}

.bottomLoad div {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #999;
}

.mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
}

</style>
