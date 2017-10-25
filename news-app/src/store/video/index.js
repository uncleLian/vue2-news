import { setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
  namespaced: true,
  state: {
    indexPage: 1,
    indexLocation: 0,
    videoContent: '',
    videolocaltion: {}
  },
  getters: {
    indexPage: state => {
      return state.indexPage
    },
    videolocaltion: state => {
      return state.videolocaltion
    }
  },
  mutations: {
    set_indexPage(state, obj) {
      state.indexPage = obj
      setCache('video_Page', obj)
    },
    set_videoContent(state, val) {
      state.videoContent = val
      setCache('videoContent', val)
    },
    set_videolocaltion(state, val) {
      state.videolocaltion = val
    }

  },
  actions: {
    // 列表
    async get_videoItem_data({ rootState, getters }, page) {
      let params = {
        'userid': rootState.userid,
        'firsttime': rootState.firstTime,
        'classid': getters.activeClassid,
        'page': page,
        'count': 20,
        'time': new Date().getTime()
      }
      let res = await fetch('post', 'videoList', params)
      return res
    }
  }
}
