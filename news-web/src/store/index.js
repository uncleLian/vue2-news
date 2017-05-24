import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'
import { setStore } from './cache'

Vue.use(Vuex)

const state = {
    indexActive: null,
    indexPage: {},
    indexColumn: [],
    indexLocation: {},
    indexSwiper: false,
    currentContent: [],
    currentArticle: {},
    currentSearch: {},
    historyArticle: {},
    historySearch: {},
    searchLocation: 0,
    apkURL: '../toutiaojk.apk',
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})
