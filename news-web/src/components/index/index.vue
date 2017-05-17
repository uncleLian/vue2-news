<template>
	<div id="index">
		<!-- header -->
			<index-header class='indexHeader' :columnJson='newsColumn'></index-header>

		<!-- content -->
			<swiper-container class='swiperContainer' :columnJson='newsColumn'></swiper-container>

		<!-- footer -->
		  	<index-footer class='indexFooter'></index-footer>
	</div>
</template>

<script>

import indexHeader from './index_header'
import indexFooter from './index_footer'
import swiperContainer from './swiperContainer'
import { mapGetters, mapActions } from 'vuex'

export default{
	name:'index',
	components:{ indexHeader , indexFooter , swiperContainer },
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
	},
	mounted(){
	  	this.get_indexActive();	// 获取indexActive
	  	this.get_newsColumn_data(); // 获取newsColumn
	}
}

</script>

<style scoped>

#index{
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
}
.indexHeader{
	position: fixed;
	top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}
.swiperContainer{
 	padding-top: 80px;
}
[data-dpr="2"] .swiperContainer{
    padding-top: 160px;
}
[data-dpr="3"] .swiperContainer{
    padding-top: 240px;
}
.indexFooter{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
}
</style>