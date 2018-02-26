import cache from '@/utils/cache'
import { request } from '@/utils/request'
export default {
    namespaced: true,
    state: {
        historyArticle: {},     // 文章历史数据
        location: {}            // 储存页面滚动条位置
    },
    getters: {
    },
    mutations: {
        set_historyArticle(state, val) {
            state.historyArticle = val
            cache.setSession('history_Article', val)
        },
        set_location(state, val) {
            state.location = val
        }
    },
    actions: {
        // 获取文章数据
        async get_Article_data({ commit, state }, { id, datafrom }) {
            let res
            let historyArticle
            historyArticle = JSON.parse(cache.getSession('history_Article'))
            if (historyArticle && historyArticle[id]) {
                res = historyArticle[id]
            } else {
                let params = {
                    'id': id,
                    'datafrom': datafrom
                }
                await request('post', 'Artilce', params)
                .then(json => {
                    res = json.data
                    state.historyArticle[id] = res
                    historyArticle = state.historyArticle
                })
            }
            commit('set_historyArticle', historyArticle)
            return res
        }
    }
}
