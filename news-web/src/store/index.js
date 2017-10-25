import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import detail_module from './detail/index'
import search_module from './search/index'
Vue.use(Vuex)

// 本项目为了尽可能深入vue的层面，这里vuex使用modules，以页面级的方式来进行状态管理 （适合大型项目：native端将会展示）
// 这里的全局状态可以用来管理类似：登录、设备信息等（更多内容请查看vuex官网）

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        index: index_module,
        detail: detail_module,
        search: search_module
    }
})
