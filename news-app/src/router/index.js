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
const health = () => import('@/page/index/user/children/health/health')
const publish = () => import('@/page/index/user/children/health/publish')
const preview = () => import('@/page/index/user/children/health/preview')
const detail = () => import('@/page/detail/detail')
const comment = () => import('@/page/detail/children/comment')
const search = () => import('@/page/search/search')
const login = () => import('@/page/login/login')

export default new Router({
    routes: [{
        path: '',
        redirect: '/index/home',
        component: App,
        children: [
        {
            name: 'index',
            path: '/index',
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
                    name: 'userGuide',
                    path: 'userGuide',
                    component: userGuide
                },
                {
                    name: 'QRcode',
                    path: 'QRcode',
                    component: QRcode
                },
                {
                    name: 'feedBack',
                    path: 'feedBack',
                    component: feedBack
                },
                {
                    name: 'readHistory',
                    path: 'readHistory',
                    component: readHistory
                },
                {
                    path: 'myComments',
                    component: myComments
                },
                {
                    name: 'userCover',
                    path: 'userCover',
                    component: userCover
                },
                {
                    name: 'health',
                    path: 'health',
                    component: health
                },
                {
                    path: 'publish',
                    component: publish,
                    children: [
                        {
                            path: 'preview',
                            component: preview
                        }
                    ]
                }
                ]
            }
            ]
        },
        {
            name: 'detail',
            path: '/detail',
            component: detail,
            children: [
                {
                    name: 'comment',
                    path: 'comment',
                    component: comment
                }
            ]
        },
        {
            name: 'search',
            path: '/search',
            component: search
        },
        {
            name: 'login',
            path: '/login',
            component: login
        }
        ]
    }]
})
