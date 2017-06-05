import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        searchLocation: 0,
        currentSearch: {},
        historySearch: {},
    },
    getters:{
        currentSearch: state => {
            return state.currentSearch
        },
        historySearch: state => {
            return state.historySearch
        },
    },
    mutations: {
        set_searchLocation(state, val) {
            state.searchLocation = val;
        },
        currentSearch(state,val){
            state.currentSearch = val;
        },
        historySearch(state,val){
            state.historySearch = val;
            setCache('history_Search', val);
        },
    },
    actions: { 
        async get_Search_data({ commit, state }, { key, page }) {
            let res, currentData, historyData;
            historyData = JSON.parse(getCache('history_Search'));
            if (historyData && historyData[key] && page == 1) {
                res = historyData[key];
            } else {
                await fetch('post', 'Search', { 'key': key, 'page': page })
                .then(json => {
                    res = json;
                    currentData = { [key]: res };
                    historyData = { ...state.historySearch, ...currentData };
                })
            }
            commit('currentSearch', currentData );
            commit('historySearch', historyData);
            return res
        },
    },
}
