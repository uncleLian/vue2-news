import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function() {
    this.isBack = true
    window.history.go(-1)
}

// 路由懒加载
const index = () => import('@/page/index/index')
const home = () => import('@/page/index/home/home')
const channel = () => import('@/page/index/home/children/channel')
const video = () => import('@/page/index/video/video')
const collect = () => import('@/page/index/collect/collect')
const user = () => import('@/page/index/user/user')
const userGuide = () => import('@/page/index/user/children/userGuide')
const QRcode = () => import('@/page/index/user/children/QRcode')
const feedBack = () => import('@/page/index/user/children/feedBack')
const myHistory = () => import('@/page/index/user/children/myHistory')
const myComment = () => import('@/page/index/user/children/myComment')
const health = () => import('@/page/index/user/children/health/health')
const publish = () => import('@/page/index/user/children/health/publish')
const preview = () => import('@/page/index/user/children/health/preview')
const detail = () => import('@/page/detail/detail')
const comment = () => import('@/page/detail/children/comment')
const search = () => import('@/page/search/search')
const login = () => import('@/page/login/login')

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/index/home',
            component: App,
            children: [
                // index页面
                {
                    name: 'index',
                    path: '/index',
                    redirect: '/index/home',
                    component: index,
                    children: [
                    // home页面
                    {
                        name: 'home',
                        path: 'home',
                        component: home,
                        children: [
                            // channel页面
                            {
                                name: 'channel',
                                path: 'channel',
                                component: channel
                            }
                        ]
                    },
                    // video页面
                    {
                        name: 'video',
                        path: 'video',
                        component: video
                    },
                    // collect页面
                    {
                        name: 'collect',
                        path: 'collect',
                        component: collect
                    },
                    // user页面
                    {
                        name: 'user',
                        path: 'user',
                        component: user,
                        children: [
                            // userGuide页面
                            {
                                name: 'userGuide',
                                path: 'userGuide',
                                component: userGuide
                            },
                                // QRcode页面
                            {
                                name: 'QRcode',
                                path: 'QRcode',
                                component: QRcode
                            },
                                // feedBack页面
                            {
                                name: 'feedBack',
                                path: 'feedBack',
                                component: feedBack
                            },
                            // myHistory页面
                            {
                                name: 'myHistory',
                                path: 'myHistory',
                                component: myHistory
                            },
                            // myComment页面
                            {
                                name: 'myComment',
                                path: 'myComment',
                                component: myComment
                            },
                            // health页面
                            {
                                name: 'health',
                                path: 'health',
                                component: health
                            },
                            // publish页面
                            {
                                name: 'publish',
                                path: 'publish',
                                component: publish,
                                children: [
                                    // preview页面
                                    {
                                        name: 'preview',
                                        path: 'preview',
                                        component: preview
                                    }
                                ]
                            }
                        ]
                    }
                    ]
                },
                // detail页面
                {
                    name: 'detail',
                    path: '/detail',
                    component: detail,
                    children: [
                        // comment页面
                        {
                            name: 'comment',
                            path: 'comment',
                            component: comment
                        }
                    ]
                },
                // search页面
                {
                    name: 'search',
                    path: '/search',
                    component: search
                },
                // login 页面
                {
                    name: 'login',
                    path: '/login',
                    component: login
                }
            ]
        }
    ]
})
