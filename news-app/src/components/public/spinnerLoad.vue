<template>
      <div id="spinnerLoad" v-show="visible">
        <mt-spinner :type="0" :color="color" :size="size"></mt-spinner>
      </div>
    </div>
</template>

<script>

export default{
	name:'spinnerLoad',
	props:{
		show: {
	        type: Boolean,
	        default:false,
      }
	},
	data () {
		return {
			visible:false,
			size:36,
			color:'rgb(240, 61, 61)',
		}
	},
	watch:{
		show(val){
			this.visible = val;
		}
	},
}

</script>

<style >
#spinnerLoad{
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;
	background-color:#fff; 
	z-index: 888;
}
#spinnerLoad span{
	position: absolute;
	top: 26%;
	left: 50%;
	margin-left: -18px;
}
</style>