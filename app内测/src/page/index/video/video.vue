<template>
	<div id="video">
		<my-header fixed title='视频'></my-header>
		<div class="content" :class="{isIOS: $store.state.device == 'ios'}">
			<div class="container">
				<video-list :videoJson='videoJson'></video-list>
			</div>
		</div>
	</div>
</template>
<script>
import videoList from './videoList'
export default{
	name:'video',
	components:{ videoList },
	data(){
		return {
			videoJson: [],
		}
	},
	mounted(){
	},
}
</script>
<style scoped lang='stylus'>

#video{
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding-bottom: 48px;
	.content{
		width: 100%;
		height: 100%;
		padding-top: 44px;
		position: relative;
		&.isIOS{
			padding-top: 64px;
		}
		.container{
			height: 100%;
			overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            position: relative;
        }
    }
}
</style>