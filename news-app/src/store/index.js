import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isIOS:false,
    indexActive: 0,
    indexContentPage:[
      { loadTopPage:1 , loadBottomPage:1},
      { classPage:1}, {classPage:1},{ classPage:1},{ classPage:1},
      { classPage:1}, { classPage:1},{ classPage:1},{ classPage:1},
    ],
    indexContentLocation:[ 
      {location:0},{location:0},{location:0},{location:0},{location:0},
      {location:0},{location:0},{location:0},{location:0},
    ],
    searchLocation:0,
    swiperMove:false,
    ajaxURL:{
      indexLoadTopURL:'http://data.toutiaojk.com/extend/list/apptop.php',
      indexLoadBottomURL:'http://data.toutiaojk.com/extend/list/appfoot.php',
      indexClassURL:'http://data.toutiaojk.com/extend/list/appclass.php',
      detailArticleURL: 'http://data.toutiaojk.com/extend/list/appnext.php',
      detailRecommendURL: 'http://data.toutiaojk.com/extend/list/apptuijian.php',
      searchURL: 'http://data.toutiaojk.com/extend/list/search.php',
    },
  },
  mutations: {
    isIOSMutation(state,val){
        state.isIOS = val;
    },
    indexActiveMutation(state,val){
      state.indexActive = val;
      sessionStorage.setItem('indexActive',val);
    },
    indexContentPage(state,obj){
      state.indexContentPage = obj;
    },
    indexContentLocation(state,obj){
      state.indexContentLocation = obj;
    },
    LocationChange(state,obj){
      state.indexContentLocation[obj.index].location = obj.location;
      sessionStorage.setItem('indexContentLocation',JSON.stringify(state.indexContentLocation));
    },
    topBottomPageChange(state,obj){
      state.indexContentPage[0].loadTopPage = obj.topPage;
      state.indexContentPage[0].loadBottomPage = obj.bottomPage;
      sessionStorage.setItem('indexContentPage',JSON.stringify(state.indexContentPage));
    },
    classPageChange(state,obj){
      state.indexContentPage[obj.index].classPage = obj.page;
      sessionStorage.setItem('indexContentPage',JSON.stringify(state.indexContentPage));
    },
    searchLocationChange(state,val){
      state.searchLocation = val;
    },
    swiperMoveChange(state,val){
      state.swiperMove = val;
    },
  }
})