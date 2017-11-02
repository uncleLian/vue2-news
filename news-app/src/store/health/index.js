import { fetch } from '@/config/fetch.js'
export default {
    namespaced: true,
    state: {
        isEditor: false     // 是否编辑
    },
    getters: {
        isEditor: state => {
            return state.isEditor
        }
    },
    mutations: {
        set_isEditor(state, val) {
            state.isEditor = val
        }
    },
    actions: {
        // 获取用户权限
        get_userPower_data({ rootState, commit }, userid) {
            let params = {
                type: 'check',
                userid: userid
            }
            fetch('POST', 'power', params).then(res => {
                commit('set_isEditor', true)
            })
        },

        // 获取文章列表数据
        async get_articleList_data({ rootState }, params) {
            params.userid = rootState.userid
            let res = await fetch('GET', 'list', params)
            return res
        },

        // 获取文章数据
        async get_article_data({ rootState }, id) {
            let params = {
                'userid': rootState.userid,
                'id': id,
                'type': 'edit'
            }
            let res = await fetch('GET', 'list', params)
            return res
        },

        // 提交文章数据
        async post_article_data({ rootState }, params) {
            params.userid = rootState.userid
            let res = await fetch('POST', 'edit', params)
            return res
        }
    }
}
