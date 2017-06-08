import { getCache, setCache , removeCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        search_current: {},
        search_history: {},
    },
    getters:{
        search_current: state => {
            return state.search_current
        },
        search_history: state => {
            return state.search_history
        },
    },
    mutations: {
        set_search_current(state,val){
            state.search_current = val;
            setCache('search_current', val);
        },
        remove_search_current(state,val){
            removeCache('search_current');
        },
        set_search_history(state,val){
            state.search_history = val;
            setCache('search_history', val);
        },
    },
    actions: { 
        get_current_cache({ commit, state }) {
            let data = JSON.parse(getCache('search_current'));
            return data
        },
        async get_search_data({ commit, state }, { key, page }) {
            let res, currentData, historyData;
            historyData = JSON.parse(getCache('search_history'));
            if (historyData && historyData[key] && page == 1) {
                res = historyData[key];
            }else {
                await fetch('post', 'Search', { 'key': key, 'page': page })
                .then(json => {
                    res = json;
                })
            }
            return res
        },
    },
}
