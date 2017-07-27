import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        id: null,
        currentArticle: {},
        historyArticle: [],
        recommend: [],
        localtion: {}
    },
    getters:{
        id: state => {
            return state.id
        },
        currentArticle: state => {
            return state.currentArticle
        },
        historyArticle: state => {
            return state.historyArticle
        },
        recommend: state => {
            return state.recommend
        },
        localtion: state => {
            return state.localtion
        },
    },
    mutations: {
        set_id(state, val) {
            state.id = val
        },
        set_currentArticle(state, val) {
            state.currentArticle = val
        },
        set_historyArticle(state, val) {
            state.historyArticle = val
            setCache('history_Article', val)
        },
        set_recommend(state, val) {
            state.recommend = val
        },
        set_localtion(state, val) {
            state.localtion = val
        }
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
                    currentData = res
                    historyData = { ...state.historyArticle, ...currentData };
                })
            }
            commit('set_historyArticle', historyData );
            return res
        },

        // 获取推荐数据
        async get_Recommend_data({ commit, rootState }, { classid, id }) {
            let params = {
                'classid': classid,
                'id': id
            }
            await fetch('post', 'Recommend', params)
            .then(res => {
                if (res) {
                    commit('set_recommend', res)
                }
            })
            .catch(err => {
                console.log('Recommend', err)
            })
        },
    },
}
