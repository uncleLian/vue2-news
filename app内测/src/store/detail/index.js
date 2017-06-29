import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        listArticle: '',
        historyArticle: '',
        datafrom: '',
    },
    getters:{
        listArticle: state => {
            return state.listArticle
        },
        historyArticle: state => {
            return state.historyArticle
        },
        datafrom: state => {
            return state.datafrom
        },
    },
    mutations: {
        set_listArticle(state,val){
            state.listArticle = val;
        },
        set_historyArticle(state,val){
            state.historyArticle = val;
            setCache('history_Article', val);
        },
        set_datafrom(state,val){
            state.datafrom = val;
        },
    },
    actions: { 
        async get_Article_data({ commit, state,rootState}, id) {
            let res,historyData;
            historyData = JSON.parse(getCache('history_Article'));
            if ( historyData && historyData[id] ) {
                res = historyData[id];
            } else {
                await fetch( 'post', 'Artilce', { 'id': id ,'userid': rootState.userid } )
                .then(json =>{
                    res = json[0];
                    historyData = { ...state.historyArticle, ...{ [id]: res } };
                })
            }
            commit('set_historyArticle', historyData );
            return res
        },

        get_Recommend_data({ commit, state }, query) {
            let res = fetch('post', 'Recommend', { 'id': query.id, 'classid': query.classid } )
            return res
        },

        send_user_data({ commit, state , rootState }, params) {
            let res = fetch('post', 'userData', params)
            return res
        },
    },
}
