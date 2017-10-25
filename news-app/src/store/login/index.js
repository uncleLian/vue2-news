import { get_local_cache, set_local_cache } from '@/config/cache'
export default {
    namespaced: true,
    state: {
        login: '',
        // wx: {
        //     headimgurl: 'http://wx.qlogo.cn/mmopen/8IqTY9nvCLT3w8UibMQCorTs5kc7ZIrMvSTaAgvcNO9dxwNQGy7xjgdJKhYXoOZ5Nib1mlfUg1vicViaKCZYWXe5zfq6vrkmDv2R/0',
        //     nickname: '小鑫',
        //     city: '广州'
        // },
        wx: '',
        qq: ''
    },
    getters: {
        login: state => {
            return state.login
        },
        wx: state => {
            return state.wx
        },
        qq: state => {
            return state.qq
        }
    },
    mutations: {
        set_login (state, val) {
            state.login = val
            set_local_cache('login', val)
        },
        set_wx (state, val) {
            state.wx = val
            set_local_cache('wx', val)
        },
        set_qq (state, val) {
            state.qq = val
            set_local_cache('qq', val)
        }
    },
    actions: {
        get_user ({ commit }) {
            const login = get_local_cache('login')
            if (login) {
                commit('set_login', login)
                if (login === 'wx') {
                    const wx = JSON.parse(get_local_cache('wx'))
                    commit('set_wx', wx)
                    commit('set_userid', wx.unionid, { root: true })
                } else if (login === 'qq') {
                    const qq = JSON.parse(get_local_cache('qq'))
                    commit('set_qq', qq)
                    // commit('set_userid', qq.openid,{root:true})
                }
            }
        }
    }
}
