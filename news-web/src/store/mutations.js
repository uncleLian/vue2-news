import {setCache} from './cache'

export default {
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
    set_searchLocation(state, val) {
        state.searchLocation = val;
    },
    apkURLChange(state, val) {
        state.apkURL = val;
    },
    currentArticle(state,val){
        state.currentArticle = val;
    },
    currentSearch(state,val){
        state.currentSearch = val;
    },
    historyArticle(state,val){
        state.historyArticle = val;
        setCache('history_Article', val);
    },
    historySearch(state,val){
        state.historySearch = val;
        setCache('history_Search', val);
    },
}