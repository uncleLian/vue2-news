// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import myHeader from '@/components/myHeader' // header
import spinnerLoad from '@/components/spinnerLoad' // 转场load
import listItem from '@/components/listItem'     // 列表
import popupMenu from '@/components/popupMenu'     // 弹框
import { swiperDirective } from '@/components/swiperDirective.js' //手势指令

Vue.use(MintUI) // 饿了么移动端UI组件
Vue.use(VueAwesomeSwiper)　// swiper滑动组件

Vue.config.productionTip = false;

// 注册全局 组件
Vue.component('my-header', myHeader)  // header
Vue.component('spinner-load', spinnerLoad)  // 加载动画
Vue.component('list-item', listItem)   // 列表组件
Vue.component('popup-menu', popupMenu)  // 弹框组件

// 注册全局 指令 ** 右滑返回上一页 **
Vue.directive('swiper', {
    inserted: function (el,binding,vnode) {
      if(binding.value){
        { swiperDirective( el , binding.arg , vnode.context) }
      }else{
        return
      }
    }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
