import { getCache, setCache } from '@/config/cache'
import { fetch } from '@/config/fetch'
export default {
    namespaced: true,
    state: {
        indexActive: 'news_recommend',          // active的栏目
        indexPage: { news_recommend: 1 },       // 记录各个栏目page的对象
        indexLocation: { news_recommend: 0 },   // 各个栏目location的对象
        // 栏目数据
        indexColumn: [{
            classname: '推荐',
            classid: 0,
            classpath: 'news_recommend'
        }],
        currentContent: '', // 当前栏目的数据，为了缓存各个栏目的数据，刷新时不用再次请求
        indexSwiper: false  // 是否在滑动
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
        // 以下都是为了方便取到当前active的数据
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
            setCache('index_Active', val)
        },
        set_indexPage(state, obj) {
            state.indexPage = obj
            setCache('index_Page', obj)
        },
        set_indexLocation(state, obj) {
            state.indexLocation = obj
            setCache('index_Location', obj)
        },
        set_indexColumn(state, arr) {
            state.indexColumn = arr
            setCache('index_Column', arr)
        },
        set_currentContent(state, val) {
            state.currentContent = val
            setCache(`${state.indexActive}_json`, val)
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val
        }
    },
    actions: {
        // 获取active栏目缓存
        get_indexActive_cache({ commit, dispatch }) {
            const data = getCache('index_Active')
            if (data) {
                commit('set_indexActive', data)
            } else {
                commit('set_indexActive', 'news_recommend')
            }
        },

        // 获取page缓存
        get_indexPage_cache({ commit }, indexColumn) {
            const data = JSON.parse(getCache('index_Page'))
            if (data) {
                commit('set_indexPage', data)
            } else {
                // 栏目数据是动态获取的，生成对应的page、location对象
                if (indexColumn) {
                    let pageObj = {}
                    for (let i = 0; i < indexColumn.length; i++) {
                        pageObj[indexColumn[i].classpath] = 1
                    }
                    commit('set_indexPage', pageObj)
                }
            }
        },

        // 获取location缓存
        get_indexLocation_cache({ commit }, indexColumn) {
            const data = JSON.parse(getCache('index_Location'))
            if (data) {
                commit('set_indexLocation', data)
            } else {
                // 栏目数据是动态获取的，生成对应的page、location对象
                if (indexColumn) {
                    let locationObj = {}
                    for (let i = 0; i < indexColumn.length; i++) {
                        locationObj[indexColumn[i].classpath] = 0
                    }
                    commit('set_indexLocation', locationObj)
                }
            }
        },

        // 获取列表数据缓存
        get_listItem_cache({ commit, state }, activeType) {
            let data = JSON.parse(getCache(`${state.indexActive}_json`))
            return data
        },

        // 获取栏目数据
        async get_indexColumn_data({commit, state, dispatch}) {
            let res
            const data = JSON.parse(getCache('index_Column'))
            if (data) {
                res = data
            } else {
                let json = await fetch('post', 'classID')
                res = [...state.indexColumn, ...json]
            }
            commit('set_indexColumn', res)
            dispatch('get_indexPage_cache', res)
            dispatch('get_indexLocation_cache', res)
            dispatch('get_indexActive_cache')
            return res
        },

        // 获取文章列表数据
        async get_listItem_data({ getters }, page) {
            let params = {
                'classid': getters.activeClassid,
                'page': page
            }
            let res = await fetch('post', 'Class', params)
            return res
        },

        // 获取置顶数据
        async get_stick_data({ commit, getters }) {
            let params = { 'classid': getters.activeClassid, 'type': 'stick' }
            let res = await fetch('post', 'Stick', params)
            return res
        },

        // 获取banner数据
        async get_banner_data({ commit, getters }) {
            let params = { 'classid': getters.activeClassid, 'type': 'banner' }
            let res = await fetch('post', 'Stick', params)
            return res
        },

        // 获取频道数据
        async get_channel_data({ state }) {
            let res = await fetch('post', 'classID', { 'channel': 'channel' })
            return res
        }
    }
}
