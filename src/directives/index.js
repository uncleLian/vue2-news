import Vue from 'vue'
import swiper from './swiper'
import goTop from './goTop'

// 右滑返回上一页
Vue.directive('swiper', {
    inserted: function(el, binding, vnode) {
        if (binding.value) {
            swiper(el, binding.arg, binding.value, vnode.context)
        } else {
            return ''
        }
    }
})
// 点击头部返回页面顶部
Vue.directive('goTop', {
    inserted: function(el, binding, vnode) {
        if (binding.value) {
            goTop(el, binding.arg, vnode.context)
        } else {
            return ''
        }
    }
})
