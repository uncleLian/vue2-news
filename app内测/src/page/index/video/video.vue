<template>
  <div id="video">
    <my-header fixed title='视频' v-goTop:click='true'></my-header>
    <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
      <div class="container" v-infinite-scroll="loadBottomAjax" infinite-scroll-disabled="bottomLock"
           infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <div class="globalTip">
          <div class="dataCount">已为你推荐{{dataCount}}条新内容</div>
          <div class="noNewData">没有最新的内容了</div>
          <div class="requestFail">网络请求失败,请检查网络</div>
        </div>
        <mt-loadmore :top-method="loadTopAjax" @top-status-change="handleTopChange" ref="loadmore" :auto-fill='false'>

          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus == 'pull'"><img class='pullLoading' src="~@/assets/img/loading.png"> 下拉刷新↓</span>
            <span v-show="topStatus == 'drop'"><img class='pullLoading' src="~@/assets/img/loading.png"> 释放更新↑</span>
            <span v-show="topStatus == 'loading'"><img class='pullLoading'
                                                       src="~@/assets/img/loading.gif"> 加载中...</span>
          </div>
          <video-list :videoJson='videoJson'></video-list>
          <div class="bottomLoad" v-if="videoJson.length > 0">
            <div class="loading" v-show='bottomLoading'>加载中...</div>
            <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import videoList from './videoList'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'video',
    components: {videoList},
    data() {
      return {
        classPage: 1,
        videoJson: '', // 整个列表数据arr
        topStatus: '', // 下拉状态
        bottomLoading: true,
        bottomNoData: false,
        dataCount: 0, // 推荐数量
        bottomLock: false, // 上滑开关
        loading: false,
        error: false
      }
    },
    computed: {
      ...mapGetters('video', [
        'indexPage'
      ]),
      ...mapGetters('video', [
        'videolocaltion'
      ])
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapMutations('video', [
        'set_indexPage',
        'set_videoContent',
        'set_videolocaltion'
      ]),
      ...mapActions('video', [
        'get_videoItem_data'
      ]),

      handleTopChange(status) {
        this.topStatus = status
      },
      init() {
        if (!this.videoJson) {
          this.classPage = this.indexPage
          this.loading = true
          this.loadTopAjax()
        }
      },
      loadTopAjax() {
        this.get_videoItem_data(this.classPage)
          .then(res => {
            this.loading = false
            if (res && typeof res === 'object') {
              this.videoJson = [...res, ...this.videoJson]
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
            $(`#video .requestFail`).show()
            this.loading = false
            console.log(err)
          })
      },
      loadBottomAjax() {
        this.bottomLock = true
        this.get_videoItem_data(this.classPage)
          .then(res => {
            if (res && typeof res === 'object') {
              // this.videoJson = [...this.videoJson, ...res]
              this.videoJson.push(...res)
              this.classPage++
            } else {
              this.bottomLoading = false
              this.bottomNoData = true
            }
            this.bottomLock = false
          })
      },

      handleLocaltion(type) {
        if (type === 'get') {
          this.$nextTick(() => {
            $(`.container`).scrollTop(this.videolocaltion)
          })
        } else if (type === 'set') {
          let scrollTop = $(`.container`).scrollTop()
          if (scrollTop >= 0) {
            this.indexLocation = scrollTop
            this.set_videolocaltion(this.indexLocation)
          }
        }
      }
    },
    watch: {
      classPage(val) {
        this.indexPage = val
        this.set_indexPage(this.indexPage)
      },
      videoJson(val) {
        this.set_videoContent(val)
      }
    },
    activated () {
      this.handleLocaltion('get')
    },
    deactivated () {
      this.handleLocaltion('set')
    }
  }
</script>
<style scoped lang='stylus'>
  #video {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
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
          .pullLoading{
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
