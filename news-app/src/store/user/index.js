import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
  namespaced: true,
  state: {
    appreaduserdata_number: {
      plnum: 0,
      collectnum: 0
    },
    fb_histoty: []
  },
  getters: {
    appreaduserdata_number: state => {
      return state.appreaduserdata_number
    },
    fb_histoty: state => {
      return state.fb_histoty
    }
  },
  mutations: {
    set_fb_histoty(state, val) {
      state.fb_histoty = val
      set_local_cache('fb_histoty_at', val)
    },
    set_appreaduserdata_number(state, val) {
      state.appreaduserdata_number.plnum = val.plnum
      state.appreaduserdata_number.collectnum = val.collectnum
    }

  },
  actions: {

    get_fb_histoty({ commit, state }) {
      let fb_histoty
      fb_histoty = JSON.parse(get_local_cache('fb_histoty_at'))
      if (fb_histoty.length > 0) {
        return fb_histoty
      } else {
        return fb_histoty
      }
    },
    async get_appreaduserdata({ commit, state, rootState }) {
      let res
      let params = {
        'rdata': 'allnum',
        'userid': rootState.userid
      }
      await fetch('post', 'appreaduserdata', params)
        .then(json => {
          res = json
        })
      return res
    }

  }
}
