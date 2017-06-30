<template>
	<div id="collect" :class="{edit: editBtn}">

		<my-header fixed title='收藏'>
			<a slot='right' class="edit_btn icon-edit" :class="{disable:!(collectArticle.length > 0)}" @click.stop='editClick'></a>
		</my-header>

		<div class="content" :class="{isIOS: $store.state.device == 'ios'}">
			<div class="container" v-infinite-scroll="getCollectAjax" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">

				<collect-list :collectJson='collectArticle' :visible='editBtn'></collect-list>

				<div class="noData" v-if='!(collectArticle.length > 0)'>
					<p>沒有文章哦，</p>
					<p>赶快去收藏吧！</p>
				</div>

				<error :visible='error' :method='getCollectAjax'></error>
			</div>
		</div>
		<div class="delete" v-if='editBtn' :class="{ active: checkedArr.length > 0 }">
			<span class="delete_btn" @click.stop='deleteClick'>删除<span>({{checkedArr.length}})</span></span>
		</div>
	</div>
</template>

<script>
import collectList from './collectList'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { MessageBox } from 'mint-ui';
export default{
	name:'collect',
	components:{collectList},
	data(){
		return{
			page: 1,
			editBtn: false,
			error: false,
            bottomLock: false, // 上滑开关
		}
	},
	computed:{
		...mapGetters('collect',[
			'collectArticle',
			'checkedArr',
		]),
	},
	methods:{
		...mapMutations('collect',[
			'set_collectArticle',
			'set_checkedArr',
		]),
		...mapActions('collect',[
			'get_collect_data',
			'del_collect_data',
		]),
		editClick(){
			if(this.collectArticle.length != 0){
				this.editBtn = !this.editBtn;
				if(!this.editBtn){
					this.set_checkedArr([]);
				}
			}
		},
		deleteClick(){
			MessageBox.confirm('确定执行此操作?')
			.then(action => {
			  	this.del_collect_data(this.checkedArr);
			  	for (var i = 0; i < this.checkedArr.length; i++) {
			  		for (var j = this.collectArticle.length - 1; j >= 0; j--) {
			  			if(this.collectArticle[j].id == this.checkedArr[i].id){
				  			this.collectArticle.splice(j,1);
				  		}
			  		}
			  	}
			  	this.set_collectArticle(this.collectArticle);
			  	this.editBtn = false;
			  	this.set_checkedArr([]);
			});
		},
		getCollectAjax(){
			this.get_collect_data(this.page)
			.then(res =>{
				if(res){
					this.set_collectArticle(res);
					this.page++;
				}
				this.error = false;
			})
			.catch(err =>{
				console.log(err);
				this.error = true;
			})
		}
	},
	created(){
		this.getCollectAjax();
	},
}
</script>

<style scoped lang='stylus'>
#collect.edit{
	padding-bottom: 88px;
}
#collect{
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding-bottom: 48px;
	background: #fff;
	header{
		.edit_btn{
			font-size: 20px;
	        font-weight: bold;
	        line-height: 44px;
	        &.disable{
	        	color: #999;
	        }
		}
	}
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
            .noData{
            	position: absolute;
            	left: 0;
            	right: 0;
            	top: 30%;
            	& p{
            		width: 100%;
            		text-align: center;
            		font-size: 18px;
            		color: #999;
            	}
            }
		}
	}
	.delete{
    	position: fixed;
    	bottom: 48px;
    	left: 0;
    	right: 0;
    	z-index: 999;
    	height: 40px;
    	line-height: 40px;
    	background: #f8f8f8;
    	text-align: right;
    	padding: 0 6px;
    	&.active span{
			color: red;
	    }
    	.delete_btn{
    		display: inline-block;
    		width: 60px;
    		height: 100%;
			color: #999;
			font-size: 16px;
			text-align: center;
    	}
    }
}
</style>