<template>
	<div id="home">
		<!-- header -->
			<home-header class='indexHeader' :columnJson='newsColumn'></home-header>

		<!-- content -->
			<swiper-container class='swiperContainer' :columnJson='newsColumn'></swiper-container>
	</div>
</template>

<script>

import homeHeader from './components/homeHeader'
import swiperContainer from './components/swiperContainer'
import { mapGetters, mapActions } from 'vuex'
export default{
	name:'home',
	components:{ homeHeader , swiperContainer },
	computed:{
		...mapGetters([
          'newsColumn',
        ]),
	},
	methods:{
		...mapActions([
	      'get_indexActive',
	      'get_newsColumn_data',
	    ]),
	  	onBackKeyDown(){
		    window.plugins.toast.showShortBottom('再点击一次退出程序');  
		    document.removeEventListener("backbutton", this.onBackKeyDown, false);   
		    document.addEventListener("backbutton", this.exitApp, false);
		    var timer = setTimeout(function() {  
		          document.removeEventListener("backbutton", this.exitApp, false);
		          document.addEventListener("backbutton", this.onBackKeyDown, false);  
		          clearTimeout(timer);  
		      },2000);
	  	},
		exitApp(){
		    navigator.app.exitApp();
	  	},
  	},
  	watch:{
  		$route(val){
  			if(this.$route.name != 'index'){
  				document.removeEventListener("backbutton", this.onBackKeyDown, false);
  				document.removeEventListener("backbutton", this.exitApp, false);
  			}
  		}
  	},
  	activated(){
        document.addEventListener("backbutton", this.onBackKeyDown, false);
  	},
  	mounted(){
  		this.get_indexActive();	// 获取indexActive
	  	this.get_newsColumn_data(); // 获取newsColumn
  	}
}

</script>

<style scoped>

#home{
	width: 100%;
	height: 100%;
	overflow: hidden;
}

</style>