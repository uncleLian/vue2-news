<template>
    <article id="article">
        <h1 class="article_title">{{json.title}}</h1>

        <div class="article_info clearfix">
            <span class="author"><i class="icon-author"></i> 文 / {{json.befrom}}</span>
            <span class="time">{{json.newstime}}</span>
        </div>

        <template v-if="json.playonlineurl">
            <div class="article_video">
                <div class="video" :class="{'video-fixed': video_fixed}">
                    <div class="video_info" v-if='video_poster'>
                        <img :src="json.titlepic">
                    </div>
                    <div class="playRound" v-if='!video_playing'  @click.stop="videoPlay">
                        <div class="playSan"></div>
                    </div>
                    <div class="loading" v-show='video_loading'>
                        <mt-spinner :type="0" :size='50'></mt-spinner>
                    </div>
                    <video ref='video' @click.stop='videoPause'>
                        <source :src="json.playonlineurl" type="video/mp4">
                    </video>
                </div>
            </div>
        </template>
        
        <template v-else>
            <section class="article_content">
                <div class="content_html" v-html='json.newstext' :class="{'content_html-close' : content_more}"></div>
                <div class='content_moreBtn' v-if="content_more" @click="content_more = false">展开全文...</div>
            </section>
        </template>
    </article>
</template>
<script>
export default {
    props:['json'],
    data() {
        return {
            video_poster: true,
            video_playing: false,
            video_loading: false,
            video_fixed: false,
            content_more: false,
        }
    },
    computed:{
        video(){
            return this.$refs.video
        }
    },
    methods: {
        shrinkArticle() {
            if ( this.json.newstext && this.json.newstext.length >= 1400) {
                this.content_more = true;
            }else{
                this.content_more = false;
            }
        },
        videoPlay(){
            this.video.play();
            this.video.setAttribute('controls','controls');
            this.video_playing = true;
            this.video_poster = false;
            this.videoEvent();
            this.videoFixed();
        },
        videoPause(){
            if(this.video_playing && !this.video_loading){
                this.video.pause();
            }
        },
        videoEvent(){
            this.video.onpause = () => {
                this.video_loading = false;
            }
            this.video.onwaiting = () => {
                this.video_loading = true;
            }
            this.video.oncanplay = () => {
                this.video_loading = false;
            }
        },
        videoFixed(){
            const vm = this;
            let videoTop = $('.video').position().top;
            let videoHeight = $('video').height();
            $('#detail .container').on('scroll', function(event) {
                event.preventDefault();
                if($('#detail .container').scrollTop() >= videoTop && vm.video_playing){
                    $('.article_video').height(videoHeight);
                    vm.video_fixed = true;
                }else{
                    vm.video_fixed = false;
                }
            });
        },
    },
    watch: {
        json(val) {
            this.video_poster = true;
            this.video_playing = false;
            this.video_fixed = false;
            this.video_loading = false;
            this.video_fixed = false;
            this.shrinkArticle();
        },
    },
}
</script>
<style lang='stylus'>

#article {
    width: 100%;
    position: relative;
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
        .author{
            float: left;
        }
        .time {
            float: right;
        }
    }
    .article_video{
        width: 100%;
        margin-bottom: 40px;
        .video {
            position: relative;
            width: 100%;
        }
        .video-fixed{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 1000;
        }
        video {
            width: 100%;
        }
        .video_info {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 111;
            img {
                width: 100%;
            }
        }
        .playRound {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            border-radius: 50%;
            background: rgba(0, 0, 0, .3);
            z-index: 333;
            border: 1px solid #eee;
            .playSan {
                position: absolute;
                width: 0;
                height: 0;
                font-size: 0;
                border-width: 16px;
                border-style: solid;
                border-color: transparent transparent transparent rgba(255, 255, 255, .6);
                left: 50%;
                top: 50%;
                margin-left: -5px;
                margin-top: -16px;
            }
        }
        .loading{
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            z-index: 222;
        }
    }
    .article_content{
        position: relative;
        color: #333;
        font-size: 18px!important;
        line-height: 30px;
        margin: 10px 0;
        .content_html{
            overflow: hidden;
            text-indent: none!important;
            img{
                width: 100%!important;
                height: auto!important;
            }
            p,span,a,h1,h2,h3,h4,h5,h6{
                text-indent: inherit!important;
                font-size: inherit!important;
                font-family: inherit!important;
                line-height: inherit!important;
            } 
        }
        .content_html-close {
            height: 1200px;
        }
        .content_moreBtn{
            margin-top: 15px;
            padding: 5px 0;
            text-align: center;
            font-size: 14px;
            color: #5784df;
        }
    }
}
</style>
