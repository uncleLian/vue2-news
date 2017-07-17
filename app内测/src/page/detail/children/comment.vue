<template>
    <transition name='fadeIn'>
        <div id='comment' v-if="visible">

            <my-header fixed title='评论'>
                <a slot="left" @click.stop="visible = false"><i class="icon-close"></i></a>
            </my-header>

            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <h1 class="article_title">{{currentArticle.title}}</h1>
                    <div class="article_info clearfix">
                        <span class="author"><i class="icon-author"></i> 文 / {{currentArticle.befrom}}</span>
                        <span class="time">{{currentArticle.time}}</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
        	visible: false
        }
    },
    computed: {
        ...mapGetters('detail', [
            'currentArticle'
        ])
    },
    methods: {
    	open(){
    		this.visible = true
    	}
    },
    mounted() {
    }
}
</script>
<style scoped lang='stylus'>
#comment {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1111;
    header {
        background: #fdfdfd;
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        i {
            font-size: 20px;
            vertical-align: middle;
        }
    }
    .content {
        height: 100%;
        padding-top: 44px;
        background-color: #f8f8f8;
        &.isIOS {
            padding-top: 64px;
        }
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }
    }
    .article_title {
        color: #000;
        font-size: 20px;
        font-weight: bold;
        padding: 15px 0 10px;
    }
    .article_info {
        color: #999;
        font-size: 12px;
        padding: 5px 0;
        overflow: hidden;
        position: relative;
        .author {
            float: left;
        }
        .time {
            float: right;
        }
    }
}
</style>
