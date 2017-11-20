<template>
    <div id="video">
        <!-- 头部 -->
        <my-header fixed title='视频' v-goTop:click='true'></my-header>
        <!-- 正文 -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <!-- 加载更多 -->
            <div class="container" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                <!-- 顶部提示 -->
                <div class="globalTip">
                    <div class="dataCount">已为你推荐{{dataCount}}条新内容</div>
                    <div class="noNewData">没有最新的内容了</div>
                    <div class="requestFail">网络请求失败,请检查网络</div>
                </div>
                <!-- 下拉组件 -->
                <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false'>
                    <!-- 下拉提示 -->
                    <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus === 'pull'"><img class='pullLoading' src="~@/assets/img/loading.png"> 下拉刷新↓</span>
                        <span v-show="topStatus === 'drop'"><img class='pullLoading' src="~@/assets/img/loading.png"> 释放更新↑</span>
                        <span v-show="topStatus === 'loading'"><img class='pullLoading' src="~@/assets/img/loading.gif"> 加载中...</span>
                    </div>
                    <!-- 列表 -->
                    <list-item :itemJson="contentJson" v-if='contentJson.length > 0'></list-item>
                    <!-- 底部提示 -->
                    <div class="bottomLoad" v-if="contentJson.length > 0">
                        <div class="loading" v-show='bottomLoading'>加载中...</div>
                        <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
                    </div>
                </mt-loadmore>
            </div>
        </div>
        <!-- 请求提示 -->
        <my-loading :visible="loading"></my-loading>
        <my-error :visible='error' :method='init'></my-error>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'video',
    data() {
        return {
            classPage: 1,           // 当前栏目的翻页页数
            contentJson: [],        // 整个列表数据
            dataCount: 0,           // 推荐文章数量
            topStatus: '',          // 下拉状态
            bottomLock: false,      // 上滑开关
            bottomLoading: true,    // 底部loading
            bottomNoData: false,    // 底部nothing
            loading: false,
            error: false,
            location: 0
        }
    },
    methods: {
        ...mapActions('video', [
            'get_videoItem_data'
        ]),
        init() {
            if (this.contentJson.length === 0) {
                this.loading = true
                this.loadTopAjax()
            }
        },
        loadTopAjax() {
            this.get_videoItem_data(this.classPage)
                .then(res => {
                    this.loading = false
                    if (res) {
                        this.contentJson.unshift(...res)
                        this.dataCount = res.length
                        this.classPage++
                            this.globalTip = 'dataCount'
                        $(`#video .dataCount`).slideDown(200).delay(1000).slideUp(200)
                    } else {
                        $(`#video .noNewData`).slideDown(200).delay(1000).slideUp(200)
                    }
                    this.$refs.loadmore.onTopLoaded()
                    this.error = false
                    $(`#video .requestFail`).hide()
                })
                .catch(err => {
                    console.log(err)
                    if (this.contentJson.length > 0) {
                        $(`#video .requestFail`).show()
                    } else {
                        this.error = true
                    }
                    this.loading = false
                })
        },
        loadBottomAjax() {
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.get_videoItem_data(this.classPage)
                .then(res => {
                    if (res) {
                        this.contentJson.push(...res)
                        this.classPage++
                    } else {
                        this.bottomLoading = false
                        this.bottomNoData = true
                    }
                    this.bottomLock = false
                })
            }
        },
        handleTopChange(status) {
            this.topStatus = status
        },
        handleLocaltion(type) {
            if (type === 'get') {
                this.$nextTick(() => {
                    $(`#video .container`).scrollTop(this.location)
                })
            } else if (type === 'set') {
                this.location = $(`#video .container`).scrollTop()
            }
        }
    },
    created() {
        this.init()
    },
    activated() {
        this.handleLocaltion('get')
    },
    deactivated() {
        this.handleLocaltion('set')
    }
}
</script>
<style lang='stylus'>
#video {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
    background: #fff;
    .content {
        position: relative;
        .container {
            .globalTip {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 999;
                div {
                    height: 32px;
                    line-height: 34px;
                    font-size: 14px;
                    color: #2a90d7;
                    background: rgba(213, 233, 247, .9);
                    text-align: center;
                    display: none;
                    &.requestFail {
                        color: #f56767;
                        background: #FBE9EF;
                    }
                }
            }
            .mint-loadmore-top {
                height: 50px;
                line-height: 50px;
                font-size: 14px;
                color: #999;
                span {
                    display: block;
                }
                .pullLoading {
                    width: 24px;
                    height: 24px;
                    vertical-align: middle;
                    margin-top: -4px;
                    margin-right: 3px;
                }
            }
        }
    }
}
</style>
