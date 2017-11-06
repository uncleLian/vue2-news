import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        collectArticle: []  // 收藏的文章
    },
    getters: {
        collectArticle: state => {
            return state.collectArticle
        }
    },
    mutations: {
        set_collectArticle(state, val) {
            state.collectArticle = val
            set_local_cache('collect_Article', val)
        }
    },
    actions: {
        // 获取收藏缓存
        get_collectArticle_cache({commit}) {
            let res = JSON.parse(get_local_cache('collect_Article'))
            if (res && res.length > 0) {
                commit('set_collectArticle', res)
            }
            return res
        },

        // 获取收藏数据
        async get_collect_data({rootState, commit}, page) {
            let params = {
                rdata: 'collect',
                userid: rootState.userid
            }
            let res = await fetch('post', 'collectList', params)
            return res
        },

        // 提交删除的收藏数据
        post_collect_data({state, rootState}, data) {
            let params = {
                del: 'collect',
                userid: rootState.userid,
                data: data
            }
            let res = fetch('post', 'userData', params)
            return res
        }
    }
}
