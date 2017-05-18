import axios from 'axios'
import { getStore } from './cache'

const ajaxURL = {
    i_LoadTop: 'http://data.toutiaojk.com/extend/list/apptop.php',
    i_loadBottom: 'http://data.toutiaojk.com/extend/list/appfoot.php',
    i_class: 'http://data.toutiaojk.com/extend/list/appclass.php',
    Artilce: 'http://data.toutiaojk.com/extend/list/appnext.php',
    Recommend: 'http://data.toutiaojk.com/extend/list/apptuijian.php',
    Search: 'http://data.toutiaojk.com/extend/list/search.php',
}

export default {

	// indexActive
    get_indexActive({ commit }) {
        let res;
        const data = getStore('indexActive');
        if (data) {
            res = data;
            commit('indexActive', res);
        }
    },

    // indexNav
    async get_newsColumn_data({ commit }) {
        let res;
        const data = JSON.parse(getStore('newsColumn'));
        if (data) {
            res = data;
        } else {
            res = [
                { type: '0', name: '推荐', componentName: 'recommend' },
                { type: '1', name: '头条', componentName: 'headLine' },
                { type: '2', name: '女性', componentName: 'female' },
                { type: '3', name: '育儿', componentName: 'childRearing' },
                { type: '4', name: '中医', componentName: 'chineseMedicine' },
                { type: '5', name: '本地', componentName: 'policy' },
                { type: '6', name: '政策', componentName: 'local' },
                { type: '7', name: '产业', componentName: 'industry' },
                { type: '8', name: '旅游', componentName: 'tourism' },
            ]
        }
        commit('newsColumn', res);
    },

    // get_indexContent_data
    async get_currentContent_data({ commit, state, dispatch}, type){
        let result;
        const data = JSON.parse(getStore(`${type}Json`));
        if(data){
            result = await data;
            commit('currentContent', result);
        }
        return result
    },

    // indexContent_top
    async get_indexContent_top_data({ commit, state }, page){
        let result,url;
        let params = new URLSearchParams();
        state.indexActive == 0? url = ajaxURL.i_LoadTop : url = ajaxURL.i_class
        params.append('page', page);
        params.append('classid', state.indexActive);
        await axios.post(url, params)
        .then(function(response) {
            result = response.data;
        })
        return result
    },

    // indexContent_bottom
    async get_indexContent_bottom_data({ commit, state },page){
        let result;
        let params = new URLSearchParams();
        params.append('page', page);
        params.append('classid', state.indexActive);
        await axios.post(ajaxURL.i_loadBottom, params)
        .then(function(response) {
            result = response.data;
        })
        return result
    },  

    // Article
    async get_Article_data({ commit, state }, id) {
        let result, historyData;
        historyData = JSON.parse(getStore('historyArticle'));
        if (historyData && historyData[id]) {
            result = historyData[id];
        }else {
            let params = new URLSearchParams();
            params.append('id', id);
            await axios.post(ajaxURL.Artilce, params)
            .then(function(response) {
                result = response.data[0];
                historyData = {...state.historyArticle, ...{[id]: result } };
            })
        }
        commit('currentArticle', {[id]: result });
        commit('historyArticle', historyData);
        return result
    },

    // Recommend
    async get_Recommend_data({ commit, state }, query) {
        let result;
        let params = new URLSearchParams();
        params.append('id', query.id);
        params.append('classid', query.classid);
        await axios.post(ajaxURL.Recommend, params)
        .then(function(response) {
            result = response.data;
        })
        return result
    },

    // Search
    async get_Search_data({ commit, state }, {searchVal, searchPage}) {
        let result, historyData;
        historyData = JSON.parse(getStore('historySearch'));
        if (historyData && historyData[searchVal] && searchPage == 1) {
            result = historyData[searchVal];
        } else {
            let params = new URLSearchParams();
            params.append('key', searchVal);
            params.append('page', searchPage);
            await axios.post(ajaxURL.Search, params)
            .then(function(response) {
                result = response.data;
                historyData = {...state.historySearch, ...{[searchVal]: result } };
            })
        }
        commit('currentSearch', {[searchVal]: result });
        commit('historySearch', historyData);
        return result
    },
}

