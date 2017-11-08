<template>
    <transition name='fadeIn'>
        <div id="health">
            <!-- 头部 -->
            <my-header fixed :title='userInfo.nickname' v-goTop:click='true'>
                <a slot="left" class="back-black" @click='$router.go(-1)'></a>
            </my-header>
            <!-- 正文 -->
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <!-- tabbar -->
                    <mt-tabbar v-model="selected">
                        <mt-tab-item id="作品">作品</mt-tab-item>
                        <mt-tab-item id="公告">公告</mt-tab-item>
                        <mt-tab-item id="数据">数据</mt-tab-item>
                        <router-link  class="publish" to="publish"><span>发表</span></router-link>
                    </mt-tabbar>
                    <!-- tabContainer -->
                    <mt-tab-container v-model="selected">
                        <mt-tab-container-item id="作品" v-infinite-scroll="get_article" infinite-scroll-disabled="lock" infinite-scroll-distance="10">
                            <publish-item :itemJson="itemJson"></publish-item>
                            <div class="bottomLoad">
                                <div class="loading" v-show='loading'>加载中...</div>
                                <div class="noData" v-if='nothing'>没有更多数据啦</div>
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="公告">
                            <p>暂无公告</p>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="数据">
                            <p>暂无数据</p>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'health',
    data() {
        return {
            selected: '作品',
            itemJson: [],
            page: 1,
            lock: false,
            loading: false,
            nothing: false
        }
    },
    computed: {
        ...mapGetters('user', [
            'userInfo'
        ])
    },
    methods: {
        ...mapActions('health', [
            'get_articleList_data'
        ]),
        get_article() {
            this.loading = true
            this.lock = true
            let params = {
                type: 'all',
                page: this.page
            }
            this.get_articleList_data(params)
            .then(res => {
                if (res && res.data) {
                    this.itemJson.push(...res.data)
                    this.page++
                    this.lock = false
                } else {
                    this.nothing = true
                }
                this.loading = false
            })
            .catch(err => {
                console.log(err)
                this.lock = false
            })
        }
    }
}
</script>
<style lang='stylus'>
#health {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;
    background-color: #fff;
    header {
        background-color: #fff;
        color: #222;
        border-bottom: 1px solid #e0e0e0;
        box-shadow: 0 1px 2px #e8e8e8;
    }
    .mint-tabbar {
        padding: 0 15px;
        position: relative;
        display: block;
        text-align: left;
        border-bottom: 1px solid #e8e8e8;
        border-bottom-width: .5px;
        font-size: 0;
        background: #fff;
        a{
            text-decoration: none;
        }
        .mint-tab-item {
            position: relative;
            display: inline-block;
            margin-right: 1.12rem;
            padding: 13px 0;
            &.is-selected {
                color: #f85959;
                border-bottom: 2px solid #f85959;
                background-color: #fff;
            }
            .mint-tab-item-label {
                font-size: 14px;
            }
        }
        .publish {
            position: absolute;
            right: 15px;
            top: 50%;
            margin-top: -14.5px;
            span {
                display: block;
                padding: 4px .32rem;
                font-size: 14px;
                background-color: #fff;
                border-radius: 6px;
                border: 1px solid rgba(34, 34, 34, .5);
                color: #222;
                text-align: center;
            }
        }
    }
    .mint-tab-container-item{
        p{
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-top: 15px;
        }
    }
}
</style>
