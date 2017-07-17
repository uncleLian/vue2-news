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
        reply: [],
        localtion: {}
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
        reply: state => {
            return state.reply
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
        set_reply(state, val) {
            state.reply = val
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
            historyData = JSON.parse(get_local_cache('history_Article'))
            if (historyData) {
                if (!state.historyArticle.length > 0) {
                    commit('set_historyArticle', historyData)
                }
                for (let i = 0; i < historyData.length; i++) {
                    if (historyData[i].id === id) {
                        res = historyData[i]
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
                    if (state.historyArticle) {
                        historyData = [res, ...state.historyArticle]
                    } else {
                        historyData = res
                    }
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

        // 获取我的评论数据
        async get_MyComment_data({ commit, state, rootState }) {
            let params = {
                'comment': 'userself',
                'id': state.id,
                'datafrom': state.datafrom,
                'userid': rootState.userid
            }
            await fetch('post', 'getComment', params)
            .then(res => {
                if (res && typeof res === 'object') {
                    commit('set_myComment', res)
                } else {
                    commit('set_myComment', [])
                }
            })
        },

        // 获取全部评论数据
        async get_Comment_data({ commit, state, rootState }, page) {
            let params = {
                'comment': 'remark',
                'id': state.id,
                'datafrom': state.datafrom,
                'userid': rootState.userid,
                'page': page
            }
            await fetch('post', 'getComment', params)
            .then(res => {
                if (res && typeof res === 'object') {
                    commit('set_comment', res)
                } else {
                    commit('set_comment', [])
                }
            })
        },

        // 获取回复数据
        async get_Reply_data({ commit, state, rootState }, { remarkid, page }) {
            let params = {
                'comment': 'reply',
                'userid': rootState.userid,
                'remarkid': remarkid,
                'page': page
            }
            fetch('post', 'getComment', params)
            .then(res => {
                if (res && typeof res === 'object') {
                    commit('set_reply', res)
                } else {
                    commit('set_reply', [])
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

        // 发送喜好数据 ： 喜欢/收藏
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
        send_comment_data({ commit, state, rootState }, { content }) {
            let params = {
                'comment': 'remark',
                'id': state.id,
                'datafrom': state.datafrom,
                'userid': rootState.userid,
                'content': content
            }
            let res = fetch('post', 'sendComment', params)
            return res
        },

        // 发送回复数据
        send_reply_data({ commit, state, rootState }, { remarkid, content }) {
            let params = {
                'comment': 'reply',
                'remarkid': remarkid,
                'userid': rootState.userid,
                'content': content
            }
            let res = fetch('post', 'sendComment', params)
            return res
        },

        // 发送点赞数据
        send_zan_data({ commit, state, rootState }, { type, id }) {
            let params = {
                'comment': 'dz',
                'dz': type,
                'userid': rootState.userid
            }
            if (type === 'remark') {
                params.remarkid = id
            } else if (type === 'reply') {
                params.replyid = id
            }
            let res = fetch('post', 'sendComment', params)
            return res
        },

        // 发送删除评论数据
        send_delete_data({ commit, state, rootState }, { type, id }) {
            let params = {
                'comment': 'delcomment',
                'del': type,
                'userid': rootState.userid
            }
            if (type === 'remark') {
                params.remarkid = id
            } else if (type === 'reply') {
                params.replyid = id
            }
            let res = fetch('post', 'sendComment', params)
            return res
        }
    }
}
