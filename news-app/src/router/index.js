import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// mode:'history',
  	routes:[
	    {	path: '/', redirect: '/index'  },
	    {	path: '/index', name: 'index', component: () => import('@/components/index/index')  },
	    {	path: '/detail', name: 'detail', component: () => import('@/components/detail/detail') 	},
	    {	path: '/search', name: 'search', component: () => import('@/components/search/search')	},
	],
})
