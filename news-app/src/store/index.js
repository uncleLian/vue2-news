import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'
import { setStore } from './cache'

Vue.use(Vuex)

const state = {
    indexActive: 0,
    newsColumn:[],
    currentContent:[],
    indexPage: [{ loadTopPage: 1, loadBottomPage: 1 }, ...new Array(8).fill({ classPage: 1 })],
    indexLocation: new Array(9).fill({ location: 0 }),
    indexSwiper: false,
    currentArticle:{},
    historyArticle:{},
    currentSearch:{},
    historySearch:{},
    searchLocation: 0,
    apkURL: '../toutiaojk.apk',
    isIOS:false,
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})

