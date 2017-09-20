<template>
  <transition name='fadeIn'>
    <div id="health">
      <my-header fixed title='宜健康' v-goTop:click='true'>
        <a slot="left" class="back-black" @click.stop='$router.go(-1)'></a>
      </my-header>
      <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
        <mt-tabbar v-model="selected">
          <mt-tab-item id="作品">作品</mt-tab-item>
          <mt-tab-item id="公告">公告</mt-tab-item>
          <mt-tab-item id="数据">数据</mt-tab-item>
          <div class="publish"><span>发表</span></div>
        </mt-tabbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="作品">
            <publish-item :itemJson="itemJson"></publish-item>
          </mt-tab-container-item>
          <mt-tab-container-item id="公告">公告</mt-tab-container-item>
          <mt-tab-container-item id="数据">数据</mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      selected: '作品',
      itemJson: [],
      page: 1
    }
  },
  methods: {
    ...mapActions('health', [
      'get_articleList_data'
    ]),
    get_article() {
      let params = {
        type: 'all',
        page: this.page
      }
      this.get_articleList_data(params)
        .then(res => {
          if (res.data) {
            this.itemJson = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.get_article()
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
      top: .2rem;
      right: 15px;
      z-index: 2009;
      span {
        display: block;
        padding: 0 .32rem;
        font-size: 14px;
        background-color: #fff;
        line-height: .69333333rem;
        border-radius: 6px;
        border: 1px solid rgba(34, 34, 34, .5);
        color: #222;
        text-align: center;
      }
    }
  }
}

</style>
