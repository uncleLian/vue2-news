<template>
    <div id="search">
        <div class="search_top">
            <my-header class='header'>
                <a class="back" slot='left' @click.stop='$router.go(-1)'></a>
                <a slot='mid' @click.stop='goTop'>搜索</a>
            </my-header>
            <form class='form' @submit.prevent="searchAjax">
                <div class="form_border">
                    <i class="form_icon icon-search"></i>
                    <input class='form_input' type="search" placeholder="请输入搜索关键词" v-model.trim='key'>
                </div>
            </form>
        </div>
        
        <div class="search_content">
            <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" v-swiper:swiperRight='true'>
                <div class="search_info" v-if="!(searchJson.length > 0) && !loading && searchStatus == 'info' ">
                    <p>空空如也</p>
                    <p>快去搜索吧</p>
                </div>
                <div class="search_result-empty" v-if=" !(searchJson.length > 0) && !loading && searchStatus == 'empty'">
                    <p>这个宇宙中搜寻不到</p>
                    <p>换个词试试</p>
                </div>
    
                <list-item :itemJson="searchJson"></list-item>

                <div v-if="searchJson.length > 0" class="bottomLoad">
                    <div class="loading" v-show="bottomStatus == 'loading'">加载中...</div>
                    <div class="noData" v-if="bottomStatus =='noData'">没有更多的内容了</div>
                </div>

                <loading :show='loading'></loading>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            key: '',
            page: 1,
            searchJson: [],
            searchStatus: 'info',
            bottomLock: false,
            bottomStatus:'loading',
            loading: false,
        }
    },
    computed:{
        ...mapGetters('search',[
            'search_history',
        ]),
    },
    methods: {
        ...mapMutations('search',[
            'set_search_current',
            'set_search_history',
            'remove_search_current',
        ]),
        ...mapActions('search',[
            'get_current_cache',
            'get_search_data',
        ]),
        goTop(){
            $('#search .container').animate({scrollTop:0});
        },
        init(type){
            this.key = '';
            this.page = 1;
            this.searchJson = [];
            this.searchStatus = 'info';
            this.bottomLock =  false;
            this.loading =  false;
            this.remove_search_current();   
            this.bottomStatus = 'loading';
        },
        async searchAjax() {
            this.loading = true;
            $('#search .container').scrollTop(0);
            this.searchStatus = '';
            this.page = 1;
            this.searchJson = [];
            this.bottomStatus = 'loading';
            await this.get_search_data({'key': this.key, 'page': this.page})
                .then(res => {
                    if(res){
                        this.searchJson = res;
                        this.page = 2;
                    }else{
                        this.searchStatus = 'empty';
                    }
                })
                .catch(err => {
                    this.searchStatus = 'empty';
                })
            this.loading = false;
        },
        loadMore(){
            this.bottomLock = true;
            this.get_search_data({'key': this.key, 'page': this.page})
            .then(res =>{
                if (res) {
                    this.searchJson = [...this.searchJson,...res];
                    this.page++;
                }else {
                    this.bottomStatus = 'noData';
                }
                this.bottomLock = false;
            })
        },
        get_cache(){
            this.get_current_cache()
            .then(res => {
                if(res && res.data && res.data.length > 0){
                    this.searchStatus = '';
                    this.key = res.key;
                    this.page = res.page;
                    this.searchJson = res.data;
                    this.getLocation();
                }
            })
        },
        getLocation() {
            this.$nextTick(()=>{
                let location = sessionStorage.getItem('search_location');
                if (location) {
                    $('#search .container').scrollTop(location);
                }
            })
        },
        setLocation(){
            let location = $('#search .container').scrollTop();
            sessionStorage.setItem('search_location', location);
        },
    },
    watch: {
        $route(to, from) {
            if (from.path.includes('index')) {
                this.init();
            }
        },
        searchJson(val){
            if( val && val.length > 0 ){
                this.set_search_current( {'key': this.key, 'page': this.page, 'data':val} );
                this.set_search_history( {...this.search_history, ...{[this.key]: val} } );
            }
        },
    },
    activated() {
        this.getLocation();
        let routeKey = this.$route.query.key;
        if(routeKey && routeKey != this.key){
            this.key = routeKey;
            this.searchAjax();
        }
    },
    deactivated() {
        this.setLocation();
    },
    mounted() {
        this.get_cache();
    }
}
</script>
<style scoped lang='stylus'>
#search {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    .search_top{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        .header {
            font-size: 20px;
        }
        .form{
            position: relative;
            background: #c9c9c9;
            color: #aaa;
            .form_border{
                padding: 5px;
            }
            .form_icon{
                position: absolute;
                left: 15px;
                top: 50%;
                margin-top: -8px;
                font-size: 16px;
            }
            .form_input{
                border: none;
                margin: 0;
                border-radius: 3px;
                width: 100%;
                font-size: 16px;
                -webkit-appearance: none;
                padding: 5px 10px 5px 40px;
                color: #666;
                background: #fff;
            }
        }
    }
    .search_content{
        position: relative;
        height: 100%;
        background: #fff;
        padding-top: 82px;
        .container{
            position: relative;
            height: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            .search_info{
                padding-top: 100px;
                text-align: center;
                color: #999;
                line-height: 1.5em;
                font-size: 16px;
            }
            .search_result-empty {
                padding: 70px 0 0;
                background: url(http://s3.pstatp.com/image/toutiao_mobile/noresuiticon_seach.png) no-repeat center top;
                background-size: 68px;
                text-align: center;
                margin-top: 100px;
                color: #cacaca;
                font-size: 16px;
            }
        }
    }
}
</style>
