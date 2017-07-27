import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
  namespaced: true,
  state: {
    id: null,
    datafrom: null,
    listArticle: null,
    currentArticle: {},
    historyArticle: [],
    recommend: [],
    myComment: [],
    comment: [],
    myReply: [],
    reply: [],
    talkReply: '',
    localtion: {},
    readHistorylenth: ''
  },
  getters: {
    id: state => {
      return state.id
    },
    datafrom: state => {
      return state.datafrom
    },
    listArticle: state => {
      return state.listArticle
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
    myComment: state => {
      return state.myComment
    },
    comment: state => {
      return state.comment
    },
    myReply: state => {
      return state.myReply
    },
    reply: state => {
      return state.reply
    },
    talkReply: state => {
      return state.talkReply
    },
    localtion: state => {
      return state.localtion
    },
    get_historyArticle: state => {
      if (state.historyArticle) {
        return state.historyArticle
      } else {
        return JSON.parse(get_local_cache('history_Article'))
      }
    },
    readHistorylenth: state => {
      if (state.readHistorylenth) {
        return state.readHistorylenth
      } else {
        return JSON.parse(get_local_cache('history_Article')).length
      }
    }
  },
  mutations: {
    set_id(state, val) {
      state.id = val
    },
    set_datafrom(state, val) {
      state.datafrom = val
    },
    set_listArticle(state, val) {
      state.listArticle = val
    },
    set_currentArticle(state, val) {
      state.currentArticle = val
    },
    set_historyArticle(state, val) {
      state.historyArticle = val
      state.readHistorylenth = val.length
      set_local_cache('history_Article', val)
    },
    set_recommend(state, val) {
      state.recommend = val
    },
    set_myComment(state, val) {
      state.myComment = val
    },
    set_comment(state, val) {
      state.comment = val
    },
    set_myReply(state, val) {
      state.myReply = val
    },
    set_reply(state, val) {
      state.reply = val
    },
    set_talkReply(state, val) {
      state.talkReply = val
    },
    set_localtion(state, val) {
      state.localtion = val
    }
  },
  actions: {
    // 获取文章数据和设置历史记录
    async get_Article_data({ commit, state, rootState }, { id, datafrom }) {
      let res
      let historyData
      if (state.historyArticle.length > 0) {
        for (let i = 0; i < state.historyArticle.length; i++) {
          if (state.historyArticle[i].id === id) {
            res = state.historyArticle[i]
          }
        }
      } else {
        historyData = JSON.parse(get_local_cache('history_Article'))
        if (historyData && historyData.length > 0) {
          commit('set_historyArticle', historyData)
          for (let i = 0; i < historyData.length; i++) {
            if (historyData[i].id === id) {
              res = historyData[i]
            }
          }
        }
      }
      if (!res) {
        let params = {
          'id': id,
          'userid': rootState.userid,
          'datafrom': datafrom
        }
        await fetch('post', 'Artilce', params)
          .then(json => {
            res = json[0]
            historyData = [res, ...state.historyArticle]
            commit('set_historyArticle', historyData)
          })
      }
      return res
    },

    // 获取推荐数据
    async get_Recommend_data({ commit, rootState }, { classid, id, datafrom }) {
      let params = {
        'classid': classid,
        'id': id,
        'datafrom': datafrom,
        'userid': rootState.userid
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

    // 获取评论数据： 用户/全部
    async get_Comment_data({ commit, state, rootState }, { page, type }) {
      let params = {
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'comment': 'remark',
        'type': type,
        'page': page
      }
      await fetch('post', 'getComment', params)
        .then(res => {
          if (type === 'userself') {
            if (res && typeof res === 'object') {
              commit('set_myComment', res)
            } else {
              commit('set_myComment', [])
            }
          } else if (type === 'all') {
            if (res && typeof res === 'object') {
              commit('set_comment', res)
            } else {
              commit('set_comment', [])
            }
          }
        })
    },

    // 获取回复数据： 用户/全部
    async get_Reply_data({ commit, state, rootState }, { page, type, remarkid }) {
      let params = {
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'comment': 'reply',
        'type': type,
        'remarkid': remarkid,
        'page': page
      }
      fetch('post', 'getComment', params)
        .then(res => {
          if (type === 'userself') {
            if (res && typeof res === 'object') {
              commit('set_myReply', res)
            } else {
              commit('set_myReply', [])
            }
          } else if (type === 'all') {
            if (res && typeof res === 'object') {
              commit('set_reply', res)
            } else {
              commit('set_reply', [])
            }
          }
        })
    },

    // 发送用户离开页面数据
    send_user_data({ commit, state, rootState }, entertime) {
      let params = {
        'wdata': 'userread',
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'entertime': entertime,
        'leavetime': new Date().getTime()
      }
      let res = fetch('post', 'userData', params)
      return res
    },

    // 发送喜好数据 喜欢/收藏
    send_favorite_data({ commit, state, rootState }, type) {
      let params = {
        'wdata': type,
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom
      }
      let res = fetch('post', 'userData', params)
      return res
    },

    // 发送评论数据
    post_Comment_data({ commit, state, rootState }, { content }) {
      let params = {
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'comment': 'remark',
        'type': 'user',
        'content': content
      }
      let res = fetch('post', 'postComment', params)
      return res
    },

    // 发送回复数据
    post_Reply_data({ commit, state, rootState }, { remarkid, content, altUserId }) {
      let params = {
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'comment': 'reply',
        'type': 'user',
        'remarkid': remarkid,
        'content': content
      }
      if (altUserId) {
        params.replyid = altUserId
      }
      let res = fetch('post', 'postComment', params)
      return res
    },

    // 发送点赞数据
    post_zan_data({ commit, state, rootState }, { comment, remarkid, replyid }) {
      let params = {
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'comment': 'dz'
      }
      if (comment === 'remark') {
        params.type = 'remark'
        params.remarkid = remarkid
      } else if (comment === 'reply') {
        params.type = 'reply'
        params.remarkid = remarkid
        params.replyid = replyid
      }
      let res = fetch('post', 'postComment', params)
      return res
    },

    // 发送删除评论数据
    post_delete_data({ commit, state, rootState }, { type, remarkid, replyid }) {
      let params = {
        'userid': rootState.userid,
        'id': state.id,
        'datafrom': state.datafrom,
        'comment': 'del',
        'type': type
      }
      if (type === 'remark') {
        params.remarkid = remarkid
      } else if (type === 'reply') {
        params.remarkid = remarkid
        params.replyid = replyid
      }
      let res = fetch('post', 'postComment', params)
      return res
    }
  }
}
