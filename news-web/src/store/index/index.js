import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        indexActive: '', // news_recommend
        indexPage: { news_recommend: 1 },
        indexColumn: [ 
            { 
                classname: '推荐',
                classid: 0,
                classpath: 'news_recommend' 
            } 
        ],
        indexLocation: { news_recommend: 0 },
        currentContent: [],
        indexSwiper: false,
    },
    getters:{
        indexActive: state => {
            return state.indexActive
        },
        activeIndex : getters => {
            return getters.indexColumn.findIndex(obj => obj.classpath == getters.indexActive)
        },
        indexPage: state => {
            return state.indexPage
        },
        indexLocation: state => {
            return state.indexLocation
        },
        indexColumn: state => {
            return state.indexColumn
        },
        indexSwiper: state => {
            return state.indexSwiper
        },
    },
    mutations: {
        set_indexActive(state, val) {
            state.indexActive = val;
            setCache('index_Active', val);
        },
        set_indexPage(state, obj) {
            state.indexPage = obj;
            setCache('index_Page', obj);
        },
        set_indexLocation(state, obj) {
            state.indexLocation = obj;
            setCache('index_Location', obj);
        },
        set_indexColumn(state, arr){
            state.indexColumn = arr;
            setCache('index_Column', arr);
        },
        set_currentContent(state,val){
            state.currentContent = val;
            setCache(`${state.indexActive}_json`, val);
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val;
        },
    },
    actions: { 
        get_indexActive({ commit, dispatch }) {
            const data = getCache('index_Active');
            if (data) {
                commit('set_indexActive', data);
            }else{
                commit('set_indexActive', 'news_recommend');
            }
        },

        get_indexPage( { commit } , indexColumn ) {
            const data = JSON.parse(getCache('index_Page'));
            if(data){
                commit('set_indexPage',data);
            }else{
                if(indexColumn){
                    let pageObj = {};
                    for (let i = 0; i < indexColumn.length; i++) {
                        pageObj[indexColumn[i].classpath] = 1;
                    }
                    commit('set_indexPage', pageObj);
                }
            }
        },

        get_indexLocation( { commit } , indexColumn ) {
            const data = JSON.parse(getCache('index_Location'));
            if(data){
                commit('set_indexLocation',data);
            }else{
                if(indexColumn){
                    let locationObj = {};
                    for (let i = 0; i < indexColumn.length; i++) {
                        locationObj[indexColumn[i].classpath] = 0;
                    }
                    commit('set_indexLocation', locationObj);
                }
            }
        },

        async get_indexColumn_data({ commit, state, dispatch}) {
            let res;
            const data = JSON.parse(getCache('index_Column'));
            if (data) {
                res = data;
            }else {
                let json = await fetch('post', 'classID');
                res = [...state.indexColumn,...json];
            }
            commit('set_indexColumn', res);
            return res
        },

        get_listItem_cache({ commit, state },type) {
            let data = JSON.parse(getCache(`${type}_json`));
            return data
        },

        async get_listItem_data({ commit, state }, query) {
            let params = { 'page': query.page, 'classid': state.indexColumn[query.index].classid };
            let res = await fetch('post', 'Class', params)
            return res
        },

        async get_stick_data({ commit, state }, index) {
            let params = { 'classid': state.indexColumn[index].classid };
            let res = await fetch('post', 'Stick', params)
            return res
        },
    },
}
