<template>
    <article id="article">
        <h1 class="article_title">{{newsJson.title}}</h1>

        <div class="article_info clearfix">
            <span class="author"><i class="icon-author"></i> 文 / {{newsJson.befrom}}</span>
            <span class="time">{{newsJson.newstime}}</span>
        </div>

        <template v-if="newsJson.playonlineurl">
            <div class="article_video">
                <div class="video">
                    <div class="video_info" v-if='!videoplaying'>
                        <img :src="newsJson.titlepic">
                    </div>
                    <div class="playRound" v-if='!videoplaying' @click="videoPlay">
                        <div class="playSan"></div>
                    </div>
                    <video :src="newsJson.playonlineurl"></video>
                </div>
            </div>
        </template>
        
        <template v-else>
            <section class="article_content">
                <div class="content_html" v-html='newsJson.newstext' :class="{'content_html-close' : content_more}"></div>
                <div class='content_moreBtn' v-if="content_more" @click="content_more = false">展开全文...</div>
            </section>
        </template>
    </article>
</template>
<script>
export default {
    props:['newsJson'],
    data() {
        return {
            videoplaying: false,
            content_more: false,
        }
    },
    methods: {
        shrinkArticle() {
            if ( this.newsJson.newstext && this.newsJson.newstext.length >= 1400) {
                this.content_more = true;
            }
        },
        videoPlay() {
            $('.video video').get(0).play();
            $('.video video').attr('controls', 'controls');
            this.videoplaying = true;
        },
    },
    watch: {
        newsJson(val) {
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
        .video video {
            width: 100%;
        }
        .video .video_info {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .video .video_info img {
            position: absolute;
            width: 100%;
            display: block;
            left: 0;
            top: 0;
            z-index: 111;
        }
        .video .playRound {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            border-radius: 50%;
            background: rgba(0, 0, 0, .3);
            z-index: 222;
            border: 1px solid #fff;
        }
        .video .playSan {
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
