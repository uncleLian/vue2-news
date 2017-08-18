<template>
	<div id="user">
		 <keep-alive exclude='userCover'>
	        <router-view></router-view>
	    </keep-alive>
	</div>
</template>
<script>
export default {
    name: 'user'
}
</script>
<style scoped>
#user{
	position: relative;
	width: 100%;
	height: 100%;
	overflow: auto;
	padding-bottom: 48px;
}
</style>
