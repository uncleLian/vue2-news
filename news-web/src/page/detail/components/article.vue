<template>
    <article id="article">
        <h1 class="articleTitle">{{newsJson.title}}</h1>
        <div class="articleInfo">
            <span class="author"><i class="icon-author"></i> 文 / {{newsJson.befrom}}</span>
            <span class="publishTime">{{newsJson.newstime}}</span>
        </div>
        <template v-if="newsJson.playonlineurl">
            <div class="detail_video">
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
            <div class="articleText">
                <div class="articleText_html" v-html='newsJson.newstext' :class="{articleClose : articleMore}"></div>
                <div class='articleMore' v-if="articleMore" @click="articleMore = false">展开全文...</div>
            </div>
        </template>
    </article>
</template>
<script>
export default {
    name: 'article',
    props: {
        newsJson: {
            default: {},
        }
    },
    data() {
        return {
            videoplaying: false,
            articleMore: false,
        }
    },
    methods: {
        shrinkArticle() {
            if ( this.newsJson.newstext && this.newsJson.newstext.length >= 1400) {
                this.articleMore = true;
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
/* 左右边距 */

#article {
    padding-left: 16px;
    padding-right: 16px;
}

.articleTitle {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    padding-top: 15px;
    padding-bottom: 10px;
}

.articleInfo {
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 12px;
    color: #999;
}

.articleInfo .publishTime {
    float: right;
}

.articleText {
    position: relative;
    color: #333;
    font-size: 18px!important;
    line-height: 30px;
    margin: 10px 0;
}

.articleText img {
    width: 100%!important;
    height: auto!important;
}

.articleText_html {
    overflow: hidden;
}

.articleText_html p,span{
    font-size: inherit!important;
    font-family: inherit!important;
    line-height: inherit!important;
}

.articleMore {
    margin-top: 15px;
    padding: 5px 0;
    text-align: center;
    font-size: 14px;
    color: #5784df;
}

.articleClose {
    height: 1200px;
}


/* video */

.detail_video {
    width: 100%;
    margin-bottom: 40px;
}

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

[data-dpr="2"] #article {
    padding-left: 32px;
    padding-right: 32px;
}

[data-dpr="3"] #article {
    padding-left: 48px;
    padding-right: 48px;
}

[data-dpr="2"] h1.articleTitle {
    font-size: 40px;
    padding-top: 30px;
    padding-bottom: 20px;
}

[data-dpr="3"] h1.articleTitle {
    font-size: 60px;
    padding-top: 45px;
    padding-bottom: 30px;
}

[data-dpr="2"] .articleInfo {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 24px;
}

[data-dpr="3"] .articleInfo {
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 36px;
}

[data-dpr="2"] .articleInfo img {
    margin-top: 2px;
}

[data-dpr="3"] .articleInfo img {
    margin-top: 3px;
}

[data-dpr="2"] .articleText {
    font-size: 36px!important;
    line-height: 60px;
    margin: 20px 0;
}

[data-dpr="3"] .articleText {
    font-size: 54px!important;
    line-height: 90px;
    margin: 30px 0;
}


[data-dpr="2"] .articleMore {
    margin-top: 30px;
    padding: 10px 0;
    font-size: 28px;
}

[data-dpr="3"] .articleMore {
    margin-top: 45px;
    padding: 15px 0;
    font-size: 42px;
}

[data-dpr="2"] .articleClose {
    height: 2400px;
}

[data-dpr="3"] .articleClose {
    height: 3600px;
}


/* video */

[data-dpr="2"] .detail_video {
    margin-bottom: 80px;
}

[data-dpr="3"] .detail_video {
    margin-bottom: 120px;
}

[data-dpr="2"] .video .playRound {
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
    border: 2px solid #fff;
}

[data-dpr="3"] .video .playRound {
    width: 150px;
    height: 150px;
    margin-left: -75px;
    margin-top: -75px;
    border: 3px solid #fff;
}

[data-dpr="2"] .video .playSan {
    border-width: 32px;
    margin-left: -10px;
    margin-top: -32px;
}

[data-dpr="3"] .video .playSan {
    border-width: 48px;
    margin-left: -15px;
    margin-top: -48px;
}
</style>
