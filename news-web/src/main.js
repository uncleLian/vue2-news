// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(MintUI) // 饿了么移动端UI组件
Vue.use(VueAwesomeSwiper) // swiper滑动组件

import myHeader from '@/components/myHeader' // header
import loading from '@/components/loading' // loading
import error from '@/components/error' // error
import listInfo from '@/components/info' // 底部信息
import listItem from '@/components/listItem' // 列表
import commentItem from '@/components/commentItem' // 评论列表
import banner from '@/components/banner' // banner
import popupMenu from '@/components/popupMenu' // 弹框

// 注册全局 组件
Vue.component('my-header', myHeader) // header
Vue.component('loading', loading) // 加载动画
Vue.component('error', error) // 加载动画
Vue.component('list-info', listInfo) // 列表组件
Vue.component('list-item', listItem) // 列表组件
Vue.component('comment-item', commentItem) // 列表组件
Vue.component('banner', banner) // 列表组件
Vue.component('popup-menu', popupMenu) // 弹框组件

import { swiper, goTop } from '@/components/directive.js' // 手势指令
// 注册全局指令

// 右滑返回上一页 & 滑动input失去焦点
Vue.directive('swiper', {
    inserted: function(el, binding, vnode) {
        if (binding.value) {
            swiper(el, binding.arg, binding.value, vnode.context)
        } else {
            return
        }
    }
})
// 点击回到页面顶部
Vue.directive('goTop', {
    inserted: function(el, binding, vnode) {
        if (binding.value) {
            goTop(el, binding.arg, vnode.context)
        } else {
            return
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
