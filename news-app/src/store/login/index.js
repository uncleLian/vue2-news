import { set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        isLogin: 'wx',    // 是否登录，空为未登录
        isEditor: ''      // 是否编辑
    },
    getters: {
        isLogin: state => {
            return state.isLogin
        },
        isEditor: state => {
            return state.isEditor
        }
    },
    mutations: {
        set_isLogin (state, val) {
            state.isLogin = val
            set_local_cache('isLogin', val)
        },
        set_isEditor(state, val) {
            state.isEditor = val
        }
    },
    actions: {
        // 获取用户权限
        get_userPower_data({ commit }, userid) {
            let params = {
                type: 'check',
                userid: userid
            }
            fetch('POST', 'power', params).then(res => {
                if (res.data) {
                    console.log('editor:', res.data)
                    commit('set_isEditor', res.data)
                }
            })
        }
    }
}
