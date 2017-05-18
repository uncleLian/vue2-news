<template>
    <div class="container" :class="type" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="pull_down">
            <div class="dataCount messageBox">已为你推荐{{dataCount}}条新内容</div>
            <div class="noNewData messageBox">没有最新的内容了</div>
            <div class="requestFail messageBox">网络请求失败,请检查网络</div>
        </div>
        <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false' :distance='indexSwiper'>
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
import { Indicator } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
    props: ['type'],
    data() {
        return {
            location: 0,
            loadTopPage: 1,
            loadBottomPage: 1,
            classPage: 1,
            contentJson: [], // 整个json数据arr
            topStatus: '', // 下拉状态
            distance: false, // 左右移动中，是否可以下拉
            dataCount: 0,   // 推荐数量
            bottomStatus: false, // 上滑开关
            bottomLoading: true,   // 底部加载 提示
            bottomNoData: false,    // 底部无数据 提示
        }
    },
    methods: {
        handleTopChange(status) {
            this.topStatus = status;
        },
        init() {
            if(this.indexActive == this.type && !this.contentJson.length > 0 ){
                const sessionPageJson = JSON.parse(sessionStorage.getItem('indexPage'));
                if (sessionPageJson) {
                    this.loadTopPage = sessionPageJson[0].loadTopPage; // loadTopPage
                    this.loadBottomPage = sessionPageJson[0].loadBottomPage; // loadBottomPage
                    this.classPage = sessionPageJson[this.type].classPage; // classPage
                    this.$store.commit('indexPage',sessionPageJson);
                }
                this.$store.dispatch('get_currentContent_data',this.type)
                .then(res => {
                    if(res){
                        this.contentJson = res;
                    }else {
                        this.loadTopAjax();
                    }
                })
            }
        },
        loadTopAjax() {
            Indicator.open();
            let page;
            this.indexActive == 0 ? page = this.loadTopPage : page = this.classPage;
            this.$store.dispatch('get_indexContent_top_data',page)
            .then( res =>{
                if( res ){
                    this.contentJson = [...res,...this.contentJson];
                    let lookIndex = this.contentJson.findIndex((n) => n.type == 'lookHere');
                    this.contentJson.splice(lookIndex, 1);
                    this.contentJson.splice(10, 0, {type: 'lookHere'});
                    this.dataCount = res.length;
                    this.indexActive == 0 ? this.loadTopPage++ : this.classPage++
                    $(`.container.${this.type} .pull_down .dataCount`).slideDown(200).delay(1000).slideUp(200);
                }else {
                    $(`.container.${this.type} .pull_down .noNewData`).slideDown(200).delay(1000).slideUp(200);
                }
                Indicator.close();
                this.$refs.loadmore.onTopLoaded();
            })
            .catch(err =>{
                $(`.container.${this.type} .pull_down .requestFail`).show();
            }) 
        },
        loadBottomAjax() {
            this.bottomStatus = true;
            let page;
            this.indexActive == 0 ? page = this.loadBottomPage : page = this.classPage;
            this.$store.dispatch('get_indexContent_bottom_data', page)
            .then(json => {
                if (json) {
                    this.contentJson = [...this.contentJson,...json];
                    this.indexActive == 0 ? this.loadBottomPage++ : this.classPage++
                }else {
                    this.bottomLoading = false;
                    this.bottomNoData = true;
                }
                this.bottomStatus = false;
            })
        },
        getLocation() {
            const vm = this;
            const sessionLocationJson = JSON.parse(sessionStorage.getItem('indexLocation'));
            if (sessionLocationJson) {
                vm.location = sessionLocationJson[vm.type].location;
                $(`.container.${vm.type}`).scrollTop(vm.location);
                this.$store.commit('indexLocation', sessionLocationJson);
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
            $(`.container.${this.type}`).on('click', '#lookHere', () => { 
                $(`.container.${this.type}`).animate({scrollTop: 0}, () => {
                    this.loadTopAjax();
                });
            });
        }
    },
    computed: {
        ...mapGetters([
          'indexActive',
        ]),
        indexSwiper() {
            return this.$store.state.indexSwiper
        },
        topBottomPage() {
            return {
                topPage: this.loadTopPage,
                bottomPage: this.loadBottomPage
            }
        },
        
    },
    watch: {
        indexSwiper(val) {
            this.distance = val;
        },
        indexActive(val) {
            if ( this.type == val && this.contentJson.length == 0 ) {
                this.init(); 
            }
        },
        topBottomPage(val) {
            this.$store.commit('topBottomPageChange', val);
        },
        classPage(val) {
            const obj = {
                index: this.indexActive,
                page: val
            };
            this.$store.commit('classPageChange', obj);
        },
        contentJson(val){
            this.$store.commit('currentContent', val);
        }
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
