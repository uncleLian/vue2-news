import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
	// mode:'history',
  	routes:[
	    {	
	    	path: '/', 
	    	redirect: '/index' ,
	    	component:() => import('@/App'),
	    	children:[
		    	{	path: '/index', name: 'index', component: () => import('@/components/index/index')  },
			    {	path: '/detail', name: 'detail', component: () => import('@/components/detail/detail') 	},
			    {	path: '/search', name: 'search', component: () => import('@/components/search/search')	},
		    ]
		},
	    
	],
})
