import { getCache, setCache, get_local_cache, set_local_cache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        indexActive: 'news_recommend',
        indexPage: { news_recommend: 1 },
        indexLocation: { news_recommend: 0 },
        indexColumn: [{
            classname: '推荐',
            classid: 0,
            classpath: 'news_recommend'
        }],
        currentContent: '',
        stickJson: '',
        bannerJson: '',
        indexSwiper: false,
        channelData: ''
    },
    getters: {
        indexActive: state => {
            return state.indexActive
        },
        indexColumn: state => {
            return state.indexColumn
        },
        indexPage: state => {
            return state.indexPage
        },
        indexLocation: state => {
            return state.indexLocation
        },
        indexSwiper: state => {
            return state.indexSwiper
        },
        stickJson: state => {
            return state.stickJson
        },
        bannerJson: state => {
            return state.bannerJson
        },
        channelData: state => {
            return state.channelData
        },
        activeIndex: state => {
            return state.indexColumn.findIndex(obj => obj.classpath === state.indexActive)
        },
        activeClassid: (state, getters) => {
            return state.indexColumn[getters.activeIndex].classid
        },
        activePage: state => {
            return state.indexPage[state.indexActive]
        },
        activeLocation: state => {
            return state.indexLocation[state.indexActive]
        }
    },
    mutations: {
        set_indexActive(state, val) {
            state.indexActive = val
        },
        set_indexPage(state, obj) {
            state.indexPage = obj
            setCache('index_Page', obj)
        },
        set_indexLocation(state, obj) {
            state.indexLocation = obj
        },
        set_indexColumn(state, arr) {
            state.indexColumn = arr
            set_local_cache('index_Column', arr)
        },
        set_currentContent(state, val) {
            state.currentContent = val
            setCache(`${state.indexActive}_json`, val)
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val
        },
        set_channelData(state, val) {
            state.channelData = val
        },
        set_stickJson(state, val) {
            state.stickJson = val
        },
        set_bannerJson(state, val) {
            state.bannerJson = val
        }
    },
    actions: {
        get_indexPage({ commit }, indexColumn) {
            const data = JSON.parse(getCache('index_Page'))
            if (data) {
                commit('set_indexPage', data)
            } else {
                if (indexColumn) {
                    let pageObj = {}
                    for (let i = 0; i < indexColumn.length; i++) {
                        pageObj[indexColumn[i].classpath] = 1
                    }
                    commit('set_indexPage', pageObj)
                }
            }
        },

        get_indexLocation({ commit }, indexColumn) {
            if (indexColumn) {
                let locationObj = {}
                for (let i = 0; i < indexColumn.length; i++) {
                    locationObj[indexColumn[i].classpath] = 0
                }
                commit('set_indexLocation', locationObj)
            }
        },

        async get_indexColumn_data({ commit, state, dispatch }) {
            let res
            const data = JSON.parse(get_local_cache('index_Column'))
            if (data) {
                res = data
            } else {
                let json = await fetch('post', 'classID')
                res = [...state.indexColumn, ...json]
            }
            dispatch('get_indexPage', res)
            dispatch('get_indexLocation', res)
            commit('set_indexColumn', res)
            return res
        },

        get_listItem_cache({ commit, state }) {
            let data = JSON.parse(getCache(`${state.indexActive}_json`))
            return data
        },

        // 列表
        async get_listItem_data({ rootState, getters }, page) {
            let params = {
                'userid': rootState.userid,
                'firsttime': rootState.firstTime,
                'classid': getters.activeClassid,
                'page': page,
                'count': 20,
                'time': new Date().getTime()
            }
            let res = await fetch('post', 'Class', params)
            return res
        },

        // 置顶
        async get_stick_data({ commit, getters }) {
            let params = { 'classid': getters.activeClassid, 'type': 'stick' }
            let res = await fetch('post', 'Stick', params)
            commit('set_stickJson', res)
            return res
        },

        // banner
        async get_banner_data({ commit, getters }) {
            let params = { 'classid': getters.activeClassid, 'type': 'banner' }
            let res = await fetch('post', 'Stick', params)
            commit('set_bannerJson', res)
            return res
        },

        // 频道
        async get_channel_data({ commit, state }) {
            let res = await fetch('post', 'classID', { 'channel': 'channel' })
            commit('set_channelData', res)
            return res
        }
    }
}
