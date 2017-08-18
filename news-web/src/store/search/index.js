import { setCache, removeCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        search_current: {},
        search_history: {}
    },
    getters: {
        search_current: state => {
            return state.search_current
        },
        search_history: state => {
            return state.search_history
        }
    },
    mutations: {
        set_search_current(state, val) {
            state.search_current = val
            setCache('search_current', val)
        },
        remove_search_current(state, val) {
            removeCache('search_current')
        },
        set_search_history(state, val) {
            state.search_history = val
            setCache('search_history', val)
        }
    },
    actions: {
        async get_search_data({ commit, state }, { key, page }) {
            // let res
            // let historyData
            // historyData = JSON.parse(getCache('search_history'))
            // if (historyData && historyData[key] && page === 1) {
            //     res = historyData[key]
            // } else {
            //     res = await fetch('post', 'Search', { 'key': key, 'page': page })
            // }
            let res = await fetch('post', 'Search', { 'key': key, 'page': page })
            return res
        },

        async get_hot_data() {
            let res = await fetch('post', 'Search')
            return res
        },

        async get_topic_data() {
            let res = await fetch('post', 'Search', {type: 'topic'})
            return res
        }
    }
}
