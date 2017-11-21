import { set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        // 用户信息，这里是我微信登录的信息
        userInfo: {
            headimgurl: 'http://wx.qlogo.cn/mmopen/vi_32/kAPpoX9tk40ZdeV9lyaJ9FjicsHJamL6MRsNicObcr1ejXkh00qtoG56NIiaWjLia5wd9lrGuWVlnXWxOu1icjkbHhQ/0',
            nickname: '思鑫',
            city: '广州'
        }
        // userInfo: ''
    },
    getters: {
        userInfo: state => {
            return state.userInfo
        }
    },
    mutations: {
        set_userInfo(state, val) {
            state.userInfo = val
            set_local_cache('userInfo', val)
        }
    },
    actions: {
        // 获取用户信息数量
        async get_userInfoNum_data({ rootState }) {
            let params = {
                'rdata': 'allnum',
                'userid': rootState.userid
            }
            let res = await fetch('post', 'appreaduserdata', params)
            return res
        },

        // 获取我的评论数据
        async get_myComment_data({ rootState }, page) {
            let params = {
                userid: rootState.userid,
                page: page
            }
            let res = await fetch('post', 'historyComment', params)
            return res
        },

        // 提交我的评论数据
        async post_myComment_data({ rootState }, params) {
            params.userid = rootState.userid
            let res = await fetch('post', 'postComment', params)
            return res
        }
    }
}
