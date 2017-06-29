import { getCache, setCache , get_local_cache , set_local_cache} from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
       	collectArticle: [],
       	checkedArr: [],
    },
    getters: {
        collectArticle: state => {
            return state.collectArticle
        },
        checkedArr: state => {
            return state.checkedArr
        },
    },
    mutations: {
        set_collectArticle(state,val){
            state.collectArticle = val;
            set_local_cache('collect_Article', val);
        },
        set_checkedArr(state,val){
            state.checkedArr = val;
        },

    },
    actions: {
    	async get_collect_data({ commit, rootState,state }, page) {
            let res, cache;
            cache = JSON.parse(get_local_cache('collect_Article'));
            if(cache){
                res = cache;
            }else if(rootState.login.login){
                let params = {
                    rdata: 'collect',
                    userid: rootState.userid,
                    page: page,
                }
                res = await fetch('post', 'collectList', params);
            }
            commit('set_collectArticle',res);
            return res
        },

        del_collect_data({ commit, state , rootState }, query) {
        	let params = {
        		del: 'collect',
        		userid: rootState.userid,
        		data: query
        	};
            let res = fetch('post', 'userData', params);
            return res
        },
    }
}
