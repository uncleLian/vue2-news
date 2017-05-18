<template>
	<div id="index">
		<keep-alive>
          <router-view></router-view>
        </keep-alive>
        <nav-bar></nav-bar>
	</div>
</template>

<script>
import navBar from './navBar'
export default{
	name:'index',
	components:{ navBar },
}
</script>

<style scoped>

#index{
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding-bottom: 55px;
}

</style>