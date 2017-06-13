<template>
    <div class="container" :class="type" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="pull_down">
            <div class="dataCount">已为你推荐{{dataCount}}条新内容</div>
            <div class="noNewData">没有最新的内容了</div>
            <div class="requestFail">网络请求失败,请检查网络</div>
        </div>
        <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false' :distance='indexSwiper'>
        
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus == 'pull'">下拉刷新↓</span>
                <span v-show="topStatus == 'drop'">释放更新↑</span>
                <span v-show="topStatus == 'loading'">加载中...</span>
            </div>

            <!-- banner -->
            <banner :bannerJson="bannerJson"></banner> 

            <!-- 置顶 -->
            <list-item :itemJson="stickJson" v-if='stickJson'></list-item> 
            
            <!-- listItem --> 
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
    props:['type'],
    data() {
        return {
            classPage: 1,
            bannerJson:'',  // banner数据
            stickJson:'',   // 置顶数据
            contentJson: '', // 整个列表数据arr
            topStatus: '', // 下拉状态
            bottomLoading: true,
            bottomNoData: false,
            distance: false, // 左右移动中，是否可以下拉
            dataCount: 0,   // 推荐数量
            bottomLock: false, // 上滑开关
        }
    },
    computed: {
        ...mapGetters('index',[
          'indexActive',
          'activeIndex',
          'indexPage',
          'indexLocation',
          'indexSwiper',
        ]),
    },
    watch: {
        indexActive(val){
            Indicator.close();
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
    methods: {
        ...mapMutations('index',[
            'set_currentContent',
            'set_indexPage',
            'set_indexLocation',
        ]),
        ...mapActions('index',[
            'get_listItem_cache',
            'get_listItem_data',
            'get_stick_data',
        ]),
        handleTopChange(status){
            this.topStatus = status;
        },
        init(){
            if(this.indexActive == this.type && !this.contentJson){
                this.classPage = this.indexPage[this.indexActive];
                this.get_banner(); //banner
                this.get_stick(); //置顶
                this.get_listItem_cache(this.indexActive)
                .then( cache =>{
                    if(cache){
                        this.contentJson = cache;
                        this.getLocation();
                    }else {
                        this.loadTopAjax();
                    }
                })
            }
        },
        get_banner(){
            this.get_stick_data({index:this.activeIndex,type:'banner'})
            .then(res=>{
                if(res){
                    this.bannerJson = res;
                }
            })
            .catch(err =>{
                console.log('banner',err);
            })
        },
        get_stick(){
            this.get_stick_data({index:this.activeIndex,type:'stick'})
            .then(res=>{
                if(res){
                    this.stickJson = res;
                }
            })
            .catch(err =>{
                console.log('stick',err);
            })
        },
        loadTopAjax() {
            Indicator.open();
            this.get_listItem_data({index:this.activeIndex,page:this.classPage})
            .then(json =>{
                if(json){
                    this.dataCount = json.length;
                    this.contentJson = [...json,...this.contentJson];
                    this.classPage++
                    $(`.container.${this.type} .pull_down .dataCount`).slideDown(200).delay(1000).slideUp(200);
                    this.newLookHere();
                }else {
                    $(`.container.${this.type} .pull_down .noNewData`).slideDown(200).delay(1000).slideUp(200);
                }
                this.$refs.loadmore.onTopLoaded();
                Indicator.close();
            })
            .catch(err =>{
                console.log(err);
                Indicator.close();
                $(`.container.${this.type} .pull_down .requestFail`).show();
            })
        },
        loadBottomAjax() {
            this.bottomLock = true;
            this.get_listItem_data({index:this.activeIndex,page:this.classPage})
            .then(json => {
                if (json) {
                    this.contentJson = [...this.contentJson,...json];
                    this.classPage++
                }else {
                    this.bottomLoading = false;
                    this.bottomNoData = true;
                }
                this.bottomLock = false;
            })
        },
        getLocation() {
            if(this.indexActive == this.type){
                this.$nextTick( ()=> {
                    $(`.container.${this.type}`).scrollTop(this.indexLocation[this.type]);
               })
            }
        },
        setLocation() {
            let scrollTop = $(`.container.${this.type}`).scrollTop();
            if(scrollTop >= 0){
                this.indexLocation[this.type] = scrollTop;
                this.set_indexLocation(this.indexLocation);
            }
        },
        newLookHere() {
            if(this.dataCount >= 10){
                let lookIndex = this.contentJson.findIndex((n) => n.type == 'lookHere');
                this.contentJson.splice(lookIndex, 1);
                this.contentJson.splice(10, 0, {type: 'lookHere'});
            }
            this.$nextTick(()=>{
                $(`.${this.indexActive} #lookHere`).prev().css('border', 'none');
            })
        },
        lookHereClick(){
            $(`.container.${this.type}`).on('click', '#lookHere', () => { 
                $(`.container.${this.indexActive}`).animate({scrollTop: 0}, () => {
                    this.loadTopAjax();
                });
            });
        }
    },
    mounted(){
        this.lookHereClick();
    },
    activated() {
        this.getLocation();
    },
    deactivated() {
        this.setLocation();
    },
    
}
</script>
<style scoped>
.container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
}

.pull_down div{
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

.requestFail {
    color: #f56767;
    background: #FBE9EF;
}

.mint-loadmore-top {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
}


</style>
