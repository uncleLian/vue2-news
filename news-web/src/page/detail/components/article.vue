<template>
    <article id="article">
        <!-- 信息 -->
        <div class="article_info">
            <h1 class="title">{{json.title}}</h1>
            <span class="befrom">{{json.befrom}}</span>
            <span class="newstime">{{json.newstime}}</span>
        </div>
        <!-- 视频 -->
        <template v-if="json.playonlineurl">
            <div class="article_video">
                <div class="video" :class="{'video-fixed': video_fixed}">
                    <template v-if="video_poster">
                        <div class="video_info">
                            <img :src="json.titlepic">
                        </div>
                        <div class="playRound" @click.stop="videoPlay">
                            <div class="playSan"></div>
                        </div>
                    </template>
                    <template v-if="video_ended">
                        <div class="video_info">
                            <img :src="json.titlepic">
                        </div>
                        <div class="repeat">
                            <div class="repeat_round" @click.stop="videoPlay"></div>
                            <p class="repeat_text">重播</p>
                        </div>
                        <div class="black"></div>
                    </template>
                    <div class="loading" v-show='video_loading'>
                        <mt-spinner :type="0" :size='50'></mt-spinner>
                    </div>
                    <div class="video_box">
                        <video ref='video' :controls='!video_poster' :key='json.playonlineurl'>
                            <source :src="json.playonlineurl" type="video/mp4">
                        </video>
                    </div>
                </div>
            </div>
        </template>
        <!-- 文字 & 图片 -->
        <template v-else>
            <section class="article_content">
                <div class="content_html" v-html='json.newstext' :class="{'content_html-close' : content_more}"></div>
                <div class='content_moreBtn' v-if="content_more" @click.stop="content_more = false">展开全文...</div>
            </section>
        </template>
    </article>
</template>
<script>
export default {
    props: ['json'],
    data() {
        return {
            video: '',              // video元素
            video_poster: true,     // video封面
            video_playing: false,   // video是否播放
            video_ended: false,     // video是否播放结束
            video_loading: false,   // video是否正在缓冲
            video_fixed: false,      // video是否悬浮
            content_more: false
        }
    },
    watch: {
        json(val) {
            this.shrinkArticle()
            this.video = this.$el.querySelector('video')
            // 自己调用自己的时候，需要初始化一些数据状态，这是自己调用自己所带来的弊端，使用场景：在详情页打开其他详情页的时候会用到。
            this.video_poster = true
            this.video_playing = false
            this.video_ended = false
            this.video_loading = false
            this.video_fixed = false
        }
    },
    methods: {
        videoPlay() {
            this.video = this.$el.querySelector('video')
            this.video.play()
            this.videoEvent()
            this.videoFixed()
        },
        videoEvent() {
            // 播放
            this.video.onplay = () => {
                this.video_playing = true
                this.video_poster = false
                this.video_ended = false
            }
            // 暂停
            this.video.onpause = () => {
                this.video_playing = false
                this.video_loading = false
            }
            // 等待
            this.video.onwaiting = () => {
                this.video_loading = true
            }
            // 可以播放
            this.video.oncanplay = () => {
                this.video_loading = false
            }
            // 结束
            this.video.onended = () => {
                this.video_ended = true
            }
        },
        videoFixed() {
            let videoTop = $('.video').position().top   // video元素相对于屏幕上方的距离
            $('#detail .container').on('scroll', (event) => {
                event.preventDefault()
                // 滚动到video元素 && video正在播放
                if ($('#detail .container').scrollTop() >= videoTop && this.video_playing) {
                    this.video_fixed = true
                } else {
                    this.video_fixed = false
                }
            })
        },
        // 是否显示查看全文
        shrinkArticle() {
            if (this.json.newstext && this.json.newstext.length >= 1400) {
                this.content_more = true
            } else {
                this.content_more = false
            }
        },
        backTo() {
            // 监听应用是否回到手机后台，是就暂停播放。（效果可在手机上查看）
            document.addEventListener('pause', () => {
                this.video.pause()
            }, false)
        }
    },
    mounted() {
        this.backTo()
    }
}
</script>
<style lang='stylus'>
#article {
    width: 100%;
    position: relative;
    .article_info {
        font-size: 12px;
        overflow: hidden;
        background: #fff;
        padding: 0 0.427rem 0.4rem;
        border-bottom: 1px solid #eee;
        background: #fff;
        .title {
            color: #000;
            font-size: 20px;
            font-weight: bold;
            padding: 0.4rem 0;
        }
        .befrom {
            margin-right: 5px;
        }
    }
    .article_video {
        width: 100%;
        margin-bottom: 40px;
        .video {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 5.3rem;
        }
        .video-fixed {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 1000;
        }
        .video_info {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 111;
            img {
                width: 100%;
                height: 5.3rem;
            }
        }
        .playRound {
            position: absolute;
            width: 48px;
            height: 48px;
            left: 50%;
            top: 50%;
            margin-left: -24px;
            margin-top: -24px;
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
        .loading {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            z-index: 222;
        }
        .repeat {
            position: absolute;
            width: 44px;
            height: 44px;
            left: 50%;
            top: 50%;
            margin-left: -22px;
            margin-top: -22px;
            border-radius: 50%;
            z-index: 444;
            background: #f8f8f8;
            .repeat_round {
                width: 44px;
                height: 44px;
                background: url(../../../assets/img/repeat.png) no-repeat center center;
                background-size: 28px;
            }
            .repeat_text {
                font-size: 12px;
                color: #fff;
                text-align: center;
                margin-top: 4px;
            }
        }
        .black {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 333;
            height: 200px;
            background: rgba(0, 0, 0, .3);
        }
        .video_box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            text-align: center;
            height: 5.3rem;
            video {
                width: 100%;
            }
        }
    }
    .article_content {
        position: relative;
        color: #333;
        font-size: 18px !important;
        line-height: 30px;
        padding: 0.4rem 0.427rem;
        .content_html {
            overflow: hidden;
            text-indent: none !important;
            font-size: inherit;
            &.content_html-close{
                height: 1200px;
            }
            img {
                width: 100% !important;
                height: auto !important;
            }
            img[type="icon"]{
                width: initial!important;
            }
            *{
                text-indent: inherit !important;
                font-size: inherit !important;
                font-family: inherit !important;
                line-height: inherit !important;
                text-align: justify !important;
            }
            div,p{
                width: 100% !important;
                padding-bottom: 15px;
            }
        }
        .content_moreBtn {
            margin-top: 15px;
            padding: 5px 0;
            text-align: center;
            font-size: 14px;
            color: #00939c;
        }
    }
}
</style>
