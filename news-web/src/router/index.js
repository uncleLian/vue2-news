import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

const index = () => import('@/page/index/index')
const detail = () => import('@/page/detail/detail')
const search = () => import('@/page/search/search')

export default new Router({
	// mode:'history',
  	routes:[
	    {	
	    	path: '/', 
	    	redirect: '/index',
	    	component: App,
	    	children:[
		    	{	
		    		path: '/index', 
		    		component: index
	 			},
			    {	
			    	path: '/detail', 
			    	component:  detail
			    },
			    {	
			    	path: '/search', 
			    	component: search
			    },
		    ]
		},
	],
})
