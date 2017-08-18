import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function() {
    this.isBack = true
    window.history.go(-1)
}

// 一级页面
const index = () => import('@/page/index/index')
    // 二级页面
const home = () => import('@/page/index/home/home')
    // 三级页面
const channel = () => import('@/page/index/home/children/channel')
const video = () => import('@/page/index/video/video')
const collect = () => import('@/page/index/collect/collect')
const user = () => import('@/page/index/user/user')
const profile = () => import('@/page/index/user/children/profile')
const userGuide = () => import('@/page/index/user/children/userGuide')
const QRcode = () => import('@/page/index/user/children/QRcode')
const feedBack = () => import('@/page/index/user/children/feedBack')
const readHistory = () => import('@/page/index/user/children/readHistory')
const myComments = () => import('@/page/index/user/children/myComments')
const userCover = () => import('@/page/index/user/children/userCover')
const detail = () => import('@/page/detail/detail')
// const myWindow = () => import('@/page/detail/myWindow')
const search = () => import('@/page/search/search')
const login = () => import('@/page/login/login')
const theme = () => import('@/page/theme/theme')

export default new Router({
    // mode:'history',
    routes: [{
        path: '',
        redirect: '/index/home',
        component: App,
        children: [
        {
            path: '/index',
            name: 'index',
            redirect: '/index/home',
            component: index,
            children: [
            {
                name: 'home',
                path: 'home',
                component: home,
                children: [
                {
                    path: 'channel',
                    component: channel
                }
                ]
            },
            {
                name: 'video',
                path: 'video',
                component: video
            },
            {
                name: 'collect',
                path: 'collect',
                component: collect
            },
            {
                name: 'user',
                path: 'user',
                component: user,
                children: [
                {
                    path: '',
                    component: profile
                },
                {
                    path: 'userGuide',
                    component: userGuide
                },
                {
                    path: 'QRcode',
                    component: QRcode
                },
                {
                    path: 'feedBack',
                    component: feedBack
                },
                {
                    path: 'readHistory',
                    component: readHistory
                },
                {
                    path: 'myComments',
                    component: myComments
                },
                {
                    path: 'userCover',
                    component: userCover
                }
                ]
            }
            ]
        },
        {
            path: '/detail',
            component: detail
        },
        // {
        //     path: '/myWindow',
        //     component: myWindow
        // },
        {
            path: '/search',
            component: search
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/theme',
            component: theme
        }
        ]
    }]
})
