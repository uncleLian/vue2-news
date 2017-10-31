import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        // 获取视频列表数据
        async get_videoItem_data({ rootState, getters }, page) {
            let params = {
                'userid': rootState.userid,
                'firsttime': rootState.firstTime,
                'page': page,
                'count': 20,
                'time': new Date().getTime()
            }
            let res = await fetch('post', 'videoList', params)
            return res
        }
    }
}
