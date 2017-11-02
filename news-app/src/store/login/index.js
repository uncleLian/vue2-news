import { set_local_cache } from '@/config/cache'
export default {
    namespaced: true,
    state: {
        isLogin: 'wx'
    },
    getters: {
        isLogin: state => {
            return state.isLogin
        }
    },
    mutations: {
        set_isLogin (state, val) {
            state.isLogin = val
            set_local_cache('isLogin', val)
        }
    },
    actions: {
    }
}
