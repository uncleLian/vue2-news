import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

// 一级页面
const index = () => import('@/page/index/index')
	// 二级页面
	const channel = () => import('@/page/index/children/channel')
const detail = () => import('@/page/detail/detail')
const search = () => import('@/page/search/search')
const theme = () => import('@/page/theme/theme')

export default new Router({
	// mode:'history',
  	routes:[
	    {	
	    	path: '', 
	    	redirect: '/index',
	    	component: App,
	    	children:[
		    	{	
		    		path: '/index', 
		    		component: index,
		    		children:[
		    			{
		    				path: 'channel',
		    				component: channel
		    			}
		    		]
	 			},
			    {	
			    	path: '/detail', 
			    	component:  detail
			    },
			    {	
			    	path: '/search', 
			    	component: search
			    },
			    {	
			    	path: '/theme', 
			    	component: theme
			    },
		    ]
		},
	],
})
