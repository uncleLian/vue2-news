import { get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        listArticle: {},        // 点进去详情页的列表数据（用于改变列表的评论数）
        currentArticle: {},     // 当前文章数据（用于跨组件数据共用）
        historyArticle: [],     // 历史文章数据（用于浏览的历史记录功能）
        talkReply: '',          // 被@的那条数据（用于跨组件获取被@的数据）
        localtion: {}           // 储存页面滚动条位置
    },
    getters: {
        listArticle: state => {
            return state.listArticle
        },
        currentArticle: state => {
            return state.currentArticle
        },
        historyArticle: state => {
            return state.historyArticle
        },
        talkReply: state => {
            return state.talkReply
        },
        localtion: state => {
            return state.localtion
        }
    },
    mutations: {
        set_listArticle(state, val) {
            state.listArticle = val
        },
        set_currentArticle(state, val) {
            state.currentArticle = val
        },
        set_historyArticle(state, val) {
            state.historyArticle = val
            set_local_cache('history_Article', val)
        },
        set_talkReply(state, val) {
            state.talkReply = val
        },
        set_localtion(state, val) {
            state.localtion = val
        }
    },
    actions: {

        // 获取文章缓存
        get_historyArticle_cache({ commit }) {
            let historyData = JSON.parse(get_local_cache('history_Article'))
            if (historyData && historyData.length > 0) {
                commit('set_historyArticle', historyData)
            }
        },

        // 获取文章数据
        async get_Article_data({ commit, state, rootState }, { id, datafrom }) {
            let res
            if (state.historyArticle && state.historyArticle.length > 0) {
                for (let i = 0; i < state.historyArticle.length; i++) {
                    if (state.historyArticle[i] && state.historyArticle[i].id === id) {
                        res = state.historyArticle[i]
                    }
                }
            }
            if (!res) {
                let params = {
                    'userid': rootState.userid,
                    'id': id,
                    'datafrom': datafrom
                }
                await fetch('post', 'Artilce', params)
                .then(json => {
                    res = json.data
                    let historyData = [res, ...state.historyArticle]
                    commit('set_historyArticle', historyData)
                })
            }
            if (res) {
                commit('set_currentArticle', res)
            }
            return res
        },

        // 获取评论数据： 用户/全部
        async get_Comment_data({ commit, state, rootState }, { page, type }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'remark',
                'type': type,
                'page': page
            }
            let res = fetch('post', 'getComment', params)
            return res
        },

        // 获取回复数据： 用户/全部
        async get_Reply_data({ state, rootState }, { page, type, remarkid }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'reply',
                'type': type,
                'remarkid': remarkid,
                'page': page
            }
            let res = fetch('post', 'getComment', params)
            return res
        },

        // 提交用户离开页面时需要收集的数据
        post_user_data({ state, rootState }, entertime) {
            let params = {
                'wdata': 'userread',
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'entertime': entertime,
                'leavetime': new Date().getTime()
            }
            let res = fetch('post', 'userData', params)
            return res
        },

        // 提交喜好数据 喜欢/收藏
        post_favorite_data({ state, rootState }, type) {
            let params = {
                'wdata': type,
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom
            }
            let res = fetch('post', 'userData', params)
            return res
        },

        // 提交评论数据
        post_Comment_data({ state, rootState }, content) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
                'comment': 'remark',
                'type': 'user',
                'content': content
            }
            let res = fetch('post', 'postComment', params)
            return res
        },

        // 提交回复数据
        post_Reply_data({ state, rootState }, { remarkid, content, altUserId }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
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

        // 提交点赞数据
        post_zan_data({ state, rootState }, { comment, remarkid, replyid }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
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

        // 提交删除评论数据
        post_delete_data({ state, rootState }, { type, remarkid, replyid }) {
            let params = {
                'userid': rootState.userid,
                'id': state.currentArticle.id,
                'datafrom': state.currentArticle.datafrom,
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
