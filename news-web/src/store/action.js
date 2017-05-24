import { getCache } from './cache'
import { fetch } from './fetch'

const ajaxURL = {
    classID:'appclassid.php',
    loadTop: 'apptop.php',
    loadBottom: 'appfoot.php',
    Class: 'appclass.php',
    Artilce: 'apparticle.php',
    Recommend: 'apptuijian.php',
    Search: 'search.php',
}

export default {

    async get_indexActive({ commit, dispatch }) {
        const data = getCache('index_Active');
        if (data) {
            commit('set_indexActive', data);
        }else {
            let res = await dispatch('get_indexColumn_data')
            commit('set_indexActive', res[0].classpath);
        }
    },

    async get_indexPage({ commit, dispatch }) {
        const data = JSON.parse(getCache('index_Page'));
        if(data){
            commit('set_indexPage',data);
        }else{
            let pageObj = {};
            let res = await dispatch('get_indexColumn_data')
            for (let i = 0; i < res.length; i++) {
                pageObj[res[i].classpath] = 1;
            }
            commit('set_indexPage', pageObj);
        }
    },

    async get_indexLocation({ commit, dispatch }) {
        const data = JSON.parse(getCache('index_Location'));
        if(data){
            commit('set_indexLocation',data);
        }else{
            let locationObj = {};
            let res = await dispatch('get_indexColumn_data')
            for (let i = 0; i < res.length; i++) {
                locationObj[res[i].classpath] = 0;
            }
            commit('set_indexLocation', locationObj);
        }
    },

    async get_indexColumn_data({ commit, state }) {
        let res;
        const data = JSON.parse(getCache('index_Column'));
        if (data) {
            res = data;
        }else {
            res = await fetch('post', ajaxURL.classID)
        }
        commit('set_indexColumn', res);
        return res
    },

    get_listItem_cache({ commit, state }) {
        const data = JSON.parse(getCache(`${state.indexActive}_json`));
        return data
    },

    async get_listItem_data({ commit, state }, query) {
        let params, res;
        params = { 'page': query.page, 'classid': state.indexColumn[query.index].classid };
        res = await fetch('post', ajaxURL.Class, params)
        return res
    },

    async get_Article_data({ commit, state }, id) {
        let res, currentData, historyData;
        historyData = JSON.parse(getCache('history_Article'));
        if ( historyData && historyData[id] ) {
            res = historyData[id];
        } else {
            await fetch( 'post', ajaxURL.Artilce, { 'id': id } )
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
        let res = fetch('post', ajaxURL.Recommend, { 'id': query.id, 'classid': query.classid } )
        return res
    },

    async get_Search_data({ commit, state }, { key, page }) {
        console.log({ key, page });
        let res, currentData, historyData;
        historyData = JSON.parse(getCache('history_Search'));
        if (historyData && historyData[key] && page == 1) {
            res = historyData[key];
        } else {
            await fetch('post', ajaxURL.Search, { 'key': key, 'page': page })
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
}
