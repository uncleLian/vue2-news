import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import detail_module from './detail/index'
import search_module from './search/index'

Vue.use(Vuex)

const state = {
    device: 'android',
}

const getters = {
    device: state => {
        return state.device
    },
}

const mutations = {
    set_device(state, val) {
        state.device = val
    }
}

const actions = {}

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
