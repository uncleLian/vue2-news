import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        login: '',
        wx: '',
        qq: '',
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
        },
    },
    mutations: {
        set_login(state, val) {
            state.login = val;
            setCache('login', val);
        },
        set_wx(state, val) {
            state.wx = val;
            setCache('wx', val);
        },
        set_qq(state, val) {
            state.qq = val;
            setCache('qq', val);
        },
    },
    actions: {
        get_user({ commit }) {
            const login = getCache('login');
            if (login) {
                commit('set_login', login);
                if (login == 'wx') {
                    const wx = JSON.parse(getCache('wx'));
                    commit('set_wx', wx);
                } else if (login == 'qq') {
                    const qq = JSON.parse(getCache('qq'));
                    commit('set_qq', qq);
                }
            }
        },
    }
}
