import {setStore} from './cache'

export default {
    indexActive(state, val) {
        state.indexActive = val;
        setStore('indexActive', val);
    },
    newsColumn(state,val){
        state.newsColumn = val;
        setStore('newsColumn', val);
    },
    currentContent(state,val){
        state.currentContent = val;
        setStore(`${state.indexActive}Json`, val);
    },
    indexPage(state, obj) {
        state.indexPage = obj;
    },
    indexLocation(state, obj) {
        state.indexLocation = obj;
    },
    indexSwiper(state, val) {
        state.indexSwiper = val;
    },
    LocationChange(state, obj) {
        state.indexLocation[obj.index].location = obj.location;
        sessionStorage.setItem('indexLocation', JSON.stringify(state.indexLocation));
    },
    topBottomPageChange(state, obj) {
        state.indexPage[0].loadTopPage = obj.topPage;
        state.indexPage[0].loadBottomPage = obj.bottomPage;
        sessionStorage.setItem('indexPage', JSON.stringify(state.indexPage));
    },
    classPageChange(state, obj) {
        state.indexPage[obj.index].classPage = obj.page;
        sessionStorage.setItem('indexPage', JSON.stringify(state.indexPage));
    },
    searchLocationChange(state, val) {
        state.searchLocation = val;
    },
    apkURLChange(state, val) {
        state.apkURL = val;
    },
    currentArticle(state,val){
        state.currentArticle = val;
    },
    historyArticle(state,val){
        state.historyArticle = val;
        setStore('historyArticle', val);
    },
    currentSearch(state,val){
        state.currentSearch = val;
    },
    historySearch(state,val){
        state.historySearch = val;
        setStore('historySearch', val);
        console.log('historySearch',val);
    },
}