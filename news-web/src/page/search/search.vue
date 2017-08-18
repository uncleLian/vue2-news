<template>
    <div id="search">
        <div class="search_top">
            <my-header class='header'>
                <a class="back-black" slot='left' @click.stop='$router.go(-1)'></a>
                <form class='form' slot='mid' >
                    <i class="form_icon icon-search"></i>
                    <input class='form_input' type="search" placeholder="搜头条，知健康" v-model.trim='key'>
                </form>
                <a class='search_btn' slot='right' @click.stop='get_search' :class=" !!key? 'on' : '' ">搜索</a>
            </my-header>
        </div>
    
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}" v-swiper:swiperRight='true'>

            <!-- 搜索推荐 -->
            <div class="search_recommend" v-if="search_state == 'recommend'">
                <div class="keyword" v-if='keyWords'>
                    <div class="keyword_wrap">
                        <span @click.stop="$router.push(`/search?key=${item}`)" v-for='(item,index) in keyWords' :key='index'>{{item}}</span>
                    </div>
                     <div class="gray_line"></div>
                </div>
                <div class="article">
                    <h3><i class="hot_icon"></i> <span>今日热点</span></h3>
                    <ul v-if='hotJson.length > 0'>
                        <li v-for='(item, index) in hotJson' :key='index'>
                            <router-link :to='url(item)'>
                                <span :class="index+1 > 0 &&index+1 < 4? 'hot': ''">{{index + 1}}.</span>
                                {{item.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <loading :visible='hot_loading' type='absolute'></loading>
                <error :visible='hot_error' type='absolute' :method='get_hot'></error>
            </div>
            
            <!-- 搜索内容 -->
            <div class="container" v-infinite-scroll="get_search_more" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" v-if="search_state == 'search' || search_state == 'empty'">
                
                <list-item :itemJson="searchJson" v-if="searchJson.length > 0"></list-item>

                <div class="bottomLoad"  v-if="searchJson.length > 6" >
                    <div class="loading" v-show="bottomStatus == 'loading'">加载中...</div>
                    <div class="noData" v-if="bottomStatus =='noData'">没有更多的内容了</div>
                </div>

                <!-- 没有搜索结果 -->
                <div class="search_result-empty" v-if="search_state == 'empty' && !(searchJson.length > 0)">
                    <p>这个宇宙中搜寻不到</p>
                    <p>换个词试试</p>
                </div>

                <loading :visible='loading'></loading>

                <error fixed :visible='error' :method='get_search'></error>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    name: 'search',
    data() {
        return {
            key: '',
            page: 1,
            searchJson: [],
            hotJson: [],
            localtion: 0,
            keyWords: null,
            search_state: 'recommend',
            bottomLock: false,
            bottomStatus: 'loading',
            error: false,
            loading: false,
            hot_loading: false,
            hot_error: false
        }
    },
    computed: {
        ...mapGetters('search', [
            'search_history'
        ])
    },
    methods: {
        ...mapMutations('search', [
            'set_search_current',
            'set_search_history',
            'remove_search_current'
        ]),
        ...mapActions('search', [
            'get_search_data',
            'get_hot_data'
        ]),
        init(type) {
            if (type === 'ajax') {
                this.search_state = 'search'
                $('#search .container').scrollTop(0)
            } else if (type === 'route') {
                this.key = ''
                this.search_state = 'recommend'
                this.bottomLock = false
                this.loading = false
                this.remove_search_current()
                this.get_hot()
            }
            this.page = 1
            this.searchJson = []
            this.bottomStatus = 'loading'
        },
        get_search() {
            if (this.key) {
                this.error = false
                this.init('ajax')
                this.loading = true
                this.$router.push(`/search?key=${this.key}`)
                this.get_search_data({'key': this.key, 'page': this.page})
                .then(res => {
                    if (res.code === 0 && res.data) {
                        this.searchJson = res.data
                        this.page = 2
                        this.handleLocaltion('get')
                    } else {
                        this.search_state = 'empty'
                    }
                    this.loading = false
                })
                .catch(err => {
                    console.log(err)
                    this.search_state = 'empty'
                    this.loading = false
                    this.error = true
                })
            }
        },
        get_search_more() {
            this.bottomLock = true
            this.get_search_data({'key': this.key, 'page': this.page})
            .then(res => {
                if (res.code === 0 && res.data) {
                    this.searchJson = [...this.searchJson, ...res.data]
                    this.page++
                } else {
                    this.bottomStatus = 'noData'
                }
                this.bottomLock = false
            })
        },
        get_hot() {
            this.hot_error = false
            this.hot_loading = true
            this.get_hot_data()
            .then(res => {
                if (res.code === 0 && res.data) {
                    this.hotJson = res.data
                }
                if (res.code === 0 && res.keyword) {
                    this.keyWords = res.keyword
                }
                this.hot_loading = false
            })
            .catch(err => {
                console.log(err)
                this.hot_loading = false
                this.hot_error = true
            })
        },
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    if (this.localtion > 0) {
                        $('#search .container').scrollTop(this.localtion)
                    }
                })
            } else if (type === 'set') {
                let scrollTop = $('#search .container').scrollTop()
                this.localtion = scrollTop
            }
        },
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
        }
    },
    watch: {
        key(val) {
            if (!val) {
                this.search_state = 'recommend'
            }
        },
        $route(to, from) {
            if (this.$route.query.key) {
                this.key = this.$route.query.key
                this.get_search()
            }
            if (this.$route.fullPath === '/search') {
                this.key = ''
                this.search_state = 'recommend'
                $('#search .container').scrollTop(0)
            }
        },
        searchJson(val) {
            if (val && val.length > 0) {
                this.set_search_current({'key': this.key, 'page': this.page, 'data': val})
                this.set_search_history({...this.search_history, ...{[this.key]: val}})
            }
        }
    },
    mounted() {
        $('.form').on('submit', event => {
            event.preventDefault()
            this.get_search()
        })
        this.get_hot()
    },
    activated() {
        let routeKey = this.$route.query.key
        if (routeKey && routeKey !== this.key) {
            this.key = routeKey
            this.get_search()
        }
    },
    deactivated() {
        this.handleLocaltion('set')
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
    a{
        text-decoration: none;
    }
    .search_top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        header {
            background: #fff;
            padding-right: 0.27rem;
            border-bottom: 1px solid #eee;
            background: #f4f5f6;
            .form {
                position: relative;
                display: flex;
                align-items: center;
                color: #aaa;
                font-size: 14px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 50px;
                padding: 0.13rem 0.267rem;
                margin: 0 0.267rem;
                .form_icon {
                }
                .form_input {
                    width: 100%;
                    color: #666;
                    padding-left: 0.13rem;
                    margin: 0;
                    -webkit-appearance: none;
                    &::-webkit-input-placeholder{color:#c8c8c9;font-size: 12px}
                    &::-moz-placeholder{color:#c8c8c9;font-size: 12px}
                    &:-ms-placeholder{color:#c8c8c9;font-size: 12px}
                }
            }
            .search_btn{
                color: #aaa;
                font-size: 14px;
                &.on{
                    color: #00939c;
                    font-weight: bold;
                }
            }
        }
    }
    .content {
        background: #fff;
        .search_recommend {
            position: relative;
            height: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .keyword{
                padding-top: 0.27rem;
                .keyword_wrap{
                    padding: 0 0.4rem;
                    span{
                        display: inline-block;
                        font-size: 13px;
                        padding: 0.13rem 0.26rem;
                        margin: 0 0.26rem 0.26rem 0;
                        color: #403d3c;
                        background: #f4f5f6;
                        border-radius: 4px;
                    }
                }
                .gray_line{
                    height: 0.13rem;
                    background: #f4f5f6;
                }
            }
            .article{
                padding: 0.27rem 0.4rem 0;
                h3{
                    font-size: 15px;
                    color: #403d3c;
                    margin-bottom: 5px;
                    .hot_icon{
                        display: inline-block;
                        vertical-align: middle;
                        width: 24px;
                        height: 24px;
                        background: url(../../assets/img/hot.png)no-repeat center center;
                        background-size: 24px;
                        margin-right: 0.13rem;
                    }
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        margin-top: 2px
                    }
                }
                ul{
                    position: relative;
                    height: 100%;
                    li{
                        font-size: 14px;
                        color: #717071;
                        border-bottom: 1px solid #eee;
                        a{
                            display: block;
                            width: 100%;
                            padding: 0.27rem 0;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            text-align: justify;
                        }
                        span{
                            margin-right: 0.24rem;
                            &.hot{
                                color: #00939c;
                            }
                        }

                    }
                }
            }
            
        }
        .container {
            .search_result-empty {
                position: absolute;
                width: 100%;
                height: 150px;
                top: 40%;
                margin-top: -75px;
                padding: 70px 0 0;
                background: url(http://s3.pstatp.com/image/toutiao_mobile/noresuiticon_seach.png) no-repeat center top;
                background-size: 68px;
                text-align: center;
                color: #cacaca;
                font-size: 16px;
            }
        }
    }
}
</style>
