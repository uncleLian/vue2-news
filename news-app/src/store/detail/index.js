import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        currentArticle: {},
        historyArticle: {},
    },
    getters:{
        currentArticle: state => {
            return state.currentArticle
        },
        historyArticle: state => {
            return state.historyArticle
        },
    },
    mutations: {
        currentArticle(state,val){
            state.currentArticle = val;
        },
        historyArticle(state,val){
            state.historyArticle = val;
            setCache('history_Article', val);
        },
    },
    actions: { 
        async get_Article_data({ commit, state }, id) {
            let res, currentData, historyData;
            historyData = JSON.parse(getCache('history_Article'));
            if ( historyData && historyData[id] ) {
                res = historyData[id];
            } else {
                await fetch( 'post', 'Artilce', { 'id': id } )
                .then(json =>{
                    res = json[0];
                    currentData = { [id]: res };
                    historyData = { ...state.historyArticle, ...currentData };
                })
            }
            commit('currentArticle', currentData );
            commit('historyArticle', historyData );
            return res
        },

        async get_Recommend_data({ commit, state }, query) {
            let res = fetch('post', 'Recommend', { 'id': query.id, 'classid': query.classid } )
            return res
        },
    },
}
