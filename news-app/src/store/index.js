import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import detail_module from './detail/index'
import search_module from './search/index'

Vue.use(Vuex)

const state = {
    device:'android',
    apkURL: '../toutiaojk.apk',
}

const mutations = {
    set_device(state,val){
        state.device = val;
    },
    set_apkURL(state,val){
        state.apkURL = val;
    },
}

export default new Vuex.Store({
    state,
    mutations,
    modules: {
        index: index_module,
        detail: detail_module,
        search: search_module,
    }
})
