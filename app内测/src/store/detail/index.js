import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        listArticle: '',
        historyArticle: '',
        datafrom: ''
    },
    getters: {
        listArticle: state => {
            return state.listArticle
        },
        historyArticle: state => {
            return state.historyArticle
        },
        get_historyArticle: state => {
            if (state.historyArticle) {
                return state.historyArticle
            } else {
                return JSON.parse(get_local_cache('history_Article'))
            }
        },
        datafrom: state => {
            return state.datafrom
        }
    },
    mutations: {
        set_listArticle(state, val) {
            state.listArticle = val
        },

        set_historyArticle(state, val) {
            state.historyArticle = val
            set_local_cache('history_Article', val)
        },

        set_datafrom(state, val) {
            state.datafrom = val
        }
    },
    actions: {

        async get_Article_data({ commit, state, rootState }, { id, datafrom }) {
            let res, historyData
            historyData = JSON.parse(get_local_cache('history_Article'))
            if (historyData && historyData[id]) {
                res = historyData[id]
            } else {
                let params = {
                    'id': id,
                    'userid': rootState.userid,
                    'datafrom': datafrom
                }
                await fetch('post', 'Artilce', params)
                    .then(json => {
                        res = json[0]
                        historyData = [res, ...state.historyArticle]
                    })
            }
            commit('set_historyArticle', historyData)
            return res
        },

        get_Recommend_data({ commit, state }, query) {
            let res = fetch('post', 'Recommend', { 'id': query.id, 'classid': query.classid })
            return res
        },

        send_user_data({ commit, state, rootState }, params) {
            let res = fetch('post', 'userData', params)
            return res
        }
    }
}
