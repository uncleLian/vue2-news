// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import spinnerLoad from '@/components/spinnerLoad' // 转场load
import listItem from '@/components/listItem'     // 列表
import popupMenu from '@/components/popupMenu'     // 弹框
import { swiperDirective } from '@/components/swiperDirective.js'

Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;

// 注册全局 组件
Vue.component('spinner-load', spinnerLoad)
Vue.component('list-item', listItem)
Vue.component('popup-menu', popupMenu)

// 注册全局 指令
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
