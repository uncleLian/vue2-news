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
        // 获取热点数据
        async get_hot_data() {
            let res = await fetch('post', 'Search')
            return res
        },

        // 获取搜索数据
        async get_search_data({ commit, state }, { key, page }) {
            let res = await fetch('post', 'Search', { 'key': key, 'page': page })
            return res
        },

        // 获取热点标题数据
        async get_topic_data() {
            let res = await fetch('post', 'Search', {type: 'topic'})
            return res
        }
    }
}
