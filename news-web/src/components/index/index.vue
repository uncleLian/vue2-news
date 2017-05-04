<template>
	<div id="index">
		<!-- header -->
			<index-header :navJson='columnData'></index-header>
			
		<!-- content -->
			<swiper-container :contentJson='columnData'></swiper-container>

		<!-- footer -->
		  	<index-footer></index-footer>
	</div>
</template>

<script>

import indexHeader from './index_header'
import indexFooter from './index_footer'
import swiperContainer from './swiperContainer'


export default{
	name:'index',
	components:{ indexHeader , indexFooter , swiperContainer },
	data(){
		return {
			columnData:[
				{type: '0', name: '推荐', componentName:'recommend'}, 
				{type: '1',	name: '头条', componentName:'headLine'},
				{type: '2',	name: '女性', componentName:'female'},
				{type: '3', name: '育儿', componentName:'childRearing'},
				{type: '4', name: '中医', componentName:'chineseMedicine'}, 
				{type: '5', name: '本地', componentName:'policy'},
             	{type: '6',	name: '政策', componentName:'local'},
             	{type: '7',	name: '产业', componentName:'industry'},
             	{type: '8', name: '旅游', componentName:'tourism'},
            ],
		}
	},
}

</script>

<style scoped>

#index{
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
}

</style>