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

            <div v-if="contentJson.length > 0" class="bottomLoad">
                <div class="loading" v-show='bottomLoading'>加载中...</div>
                <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: ['type'],
    data() {
        return {
            active: 0,
            classPage: 1,
            location: 0,
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
        ...mapMutations([
            'set_currentContent',
            'set_indexPage',
            'set_indexLocation',
        ]),
        ...mapActions([
            'get_listItem_cache',
            'get_listItem_data',
        ]),
        handleTopChange(status){
            this.topStatus = status;
        },
        init(){
            if(this.indexActive == this.type && !this.contentJson.length > 0 ){
                this.active = this.indexColumn.findIndex(obj => obj.classpath == this.indexActive);
                this.classPage = this.indexPage[this.indexActive];
                this.get_listItem_cache()
                .then(json=>{
                    if(json){
                        this.contentJson = json;
                    }else {
                        this.loadTopAjax();
                    }
                })
            }
        },
        loadTopAjax() {
            Indicator.open();
            this.get_listItem_data({index:this.active,page:this.classPage})
            .then(json =>{
                if(json){
                    this.dataCount = json.length;
                    this.contentJson = [...json,...this.contentJson];
                    this.classPage++
                    $(`.container.${this.type} .pull_down .dataCount`).slideDown(200).delay(1000).slideUp(200);
                    this.lookHereClick();
                }else {
                    $(`.container.${this.type} .pull_down .noNewData`).slideDown(200).delay(1000).slideUp(200);
                }
                this.$refs.loadmore.onTopLoaded();
                Indicator.close();
            })
            .catch(err =>{
                console.log(err);
                $(`.container.${this.type} .pull_down .requestFail`).show();
            })
        },
        loadBottomAjax() {
            this.bottomStatus = true;
            this.get_listItem_data({index:this.active,page:this.classPage})
            .then(json => {
                if (json) {
                    this.contentJson = [...this.contentJson,...json];
                    this.classPage++
                }else {
                    this.bottomLoading = false;
                    this.bottomNoData = true;
                }
                this.bottomStatus = false;
            })
        },
        getLocation() {
           this.location = this.indexLocation[this.type];
           $(`.container.${this.type}`).scrollTop(this.location);
        },
        setLocation() {
            this.indexLocation[this.type] = $(`.container.${this.type}`).scrollTop();
            this.set_indexLocation(this.indexLocation);
        },
        lookHereClick() {
            if(this.dataCount >= 10){
                let lookIndex = this.contentJson.findIndex((n) => n.type == 'lookHere');
                this.contentJson.splice(lookIndex, 1);
                this.contentJson.splice(10, 0, {type: 'lookHere'});
            }
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
          'indexPage',
          'indexLocation',
          'indexColumn',
          'indexSwiper',
        ]),
    },
    watch: {
        indexActive(val){
            this.init(); 
        },
        classPage(val) {
            this.indexPage[this.indexActive] = val;
            this.set_indexPage(this.indexPage);
        },
        contentJson(val){
            this.set_currentContent(val);
        },
        indexSwiper(val) {
            this.distance = val;
        },
    },
    activated() {
        this.getLocation();
    },
    deactivated() {
        this.setLocation();
    },
    mounted() {
        this.init(); 
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
