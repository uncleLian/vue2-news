import Vue from 'vue'
import Vuex from 'vuex'
import index_module from './index/index'
import detail_module from './detail/index'
import search_module from './search/index'
import login_module from './login/index'
import { setCache, getCache } from '@/config/cache'

Vue.use(Vuex)

const state = {
    device:'android',
    uuid: '',
    apkURL: '../toutiaojk.apk',
}

const getters = {
    device: state => {
        return state.device
    },
    uuid: state => {
        return state.uuid
    },
    apkURL: state => {
        return state.apkURL
    },
    
}

const mutations = {
    set_device(state,val){
        state.device = val;
    },
    set_uuid(state,val){
      state.uuid = val;
    },
    set_apkURL(state,val){
        state.apkURL = val;
    },
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
        search: search_module,
        login: login_module,
    }
})
