import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function() {
    this.isBack = true
    window.history.go(-1)
}

const index = () => import('@/page/index/index')
const channel = () => import('@/page/index/children/channel')
const detail = () => import('@/page/detail/detail')
const search = () => import('@/page/search/search')

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/index',
            component: App,
            children: [
                {
                    name: 'index',
                    path: '/index',
                    component: index,
                    children: [{
                        path: 'channel',
                        component: channel
                    }]
                },
                {
                    name: 'detail',
                    path: '/detail',
                    component: detail
                },
                {
                    name: 'search',
                    path: '/search',
                    component: search
                }
            ]
        }
    ]
})
