import { get_local_cache } from '@/config/cache'
export default {
  namespaced: true,
  state: {
    readHistory: '',
    readHistorylenth: ''
  },
  getters: {
    readHistorylenth: state => {
      return state.readHistorylenth
    }
  },
  mutations: {
    set_readHistory(state, val) {
      state.readHistorylenth = val
    }
  },
  actions: {
    get_readHistory({ commit, state, rootState }) {
      let historyData
      historyData = JSON.parse(get_local_cache('history_Article'))
      if (rootState.detail.historyArticle.length > 0) {
        return rootState.detail.historyArticle
      } else if (historyData) {
        // commit('set_historyArticle', historyData , {root: true})
        return historyData
      }
    }
  }
}
