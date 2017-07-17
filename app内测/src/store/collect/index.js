import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        collectArticle: [],
        checkedArr: []
    },
    getters: {
        collectArticle: state => {
            return state.collectArticle
        },
        checkedArr: state => {
            return state.checkedArr
        }
    },
    mutations: {
        set_collectArticle(state, val) {
            state.collectArticle = val
            set_local_cache('collect_Article', val)
        },
        set_checkedArr(state, val) {
            state.checkedArr = val
        }
    },
    actions: {
        get_collect_cache({commit}) {
            let res = JSON.parse(get_local_cache('collect_Article'))
            if (res) {
                commit('set_collectArticle', res)
            }
            return res
        },

        async get_collect_data({rootState}, page) {
            let params = {
                rdata: 'collect',
                userid: rootState.userid
            }
            let res = await fetch('post', 'collectList', params)
            return res
        },

        del_collect_data({state, rootState}) {
            let params = {
                del: 'collect',
                userid: rootState.userid,
                data: state.checkedArr
            }
            let res = fetch('post', 'userData', params)
            return res
        }
    }
}
