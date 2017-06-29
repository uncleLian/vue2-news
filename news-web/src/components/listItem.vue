<template>
    <ul id="listItem">
        <template v-for="section in itemJson">
            <!-- 视频 -->
            <li v-if="section.playonlineurl">
                <router-link :to="url(section)" class='video'>
                    <div class="video_wrapper">
                        <div class="video_info">
                            <div class="video_title">
                                <p>{{section.title}}</p>
                            </div>
                            <div class="totalTime">{{section.playtime}}</div>
                            <!-- <img v-lazy.container='section.titlepic'> -->
                            <img v-lazy.container="section.titlepic">
                        </div>
                        <div class="playRound">
                            <div class="playSan"></div>
                        </div>
                    </div>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
            <!-- 1张大图 -->
            <li v-else-if="section.ptitlepic">
                <router-link :to="url(section)" class='oneLarge'>
                    <div class="news_title">
                        <h3>{{section.title}}</h3>
                    </div>
                    <div class='news_img'>
                        <img v-lazy.container='section.ptitlepic'>
                    </div>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
            <!-- 3张小图 -->
            <li v-else-if="section.titlepic3">
                <router-link :to="url(section)" class='threeSmall'>
                    <div class="news_title">
                        <h3>{{section.title}}</h3>
                    </div>
                    <div class='list_img'>
                        <ul class='clearfix'>
                            <li><img v-lazy.container='section.titlepic'></li>
                            <li><img v-lazy.container='section.titlepic2'></li>
                            <li><img v-lazy.container='section.titlepic3'></li>
                        </ul>
                    </div>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
            <!-- 1张小图 -->
            <li v-else-if="section.titlepic">
                <router-link :to="url(section)" class='oneSmall clearfix'>
                    <div class="news_title">
                        <h3>{{section.title}}</h3>
                        <list-info :infoJson='section'></list-info>
                    </div>
                    <div class='news_img'>
                        <img v-lazy.container='section.titlepic'>
                    </div>
                </router-link>
            </li>
            <!-- 上次观看到这里 -->
            <li v-else-if='section.type' id="lookHere">
                <p>上次看到这里，点击刷新 <i class="icon-refresh"></i></p>
            </li>
            <!-- 文字 -->
            <li v-else-if='section.title'>
                <router-link :to="url(section)" class='text'>
                    <p>{{section.title}}</p>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
        </template>
    </ul>
</template>
<script>
import listInfo from './info'
export default {
    props: ['itemJson'],
    components: {
        listInfo
    },
    methods:{
        url(item){
            return `/detail?classid=${item.classid}&id=${item.id}`
        }
    }
}
</script>
<style scoped lang='stylus'>
small_height = 1.96875rem
larger_height = 4.6875rem
#listItem li {
    margin: 0 15px;
    border-bottom: 1px solid hsla(0, 0%, 87%, .6);
    a {
        display: block;
        width: 100%;
        padding: 16px 0;
        outline: none;
        color: #131313;
        -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
        text-decoration: none;
    }
    a:visited h3 {
        color: #999;
    }
    img {
        background: #ddd;
    }
    img[lazy=loading] {
        height: 100%;
    }
}

.news_title h3 {
    font-size: 17px;
    line-height: 21px;
    color: #222;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.oneSmall {
    .news_title {
        width: 67%;
        float: left;
        overflow: hidden;
        h3 {
            margin-right: 12px;
        }
    }
    .news_img {
        width: 33%;
        height: small_height;
        overflow: hidden;
        img {
            width: 100%;
            min-height: small_height;
        }
    }
}

.oneLarge {
    .news_img {
        width: 100%;
        margin-top: 6px;
        overflow: hidden;
        height: larger_height;
    }
    img {
        width: 100%;
        min-height: larger_height;
    }
}

.threeSmall {
    .list_img {
        width: 100%;
        margin-top: 6px;
        ul {
            width: 100%;
            display: flex;
        }
        li {
            width: 33%;
            height: small_height;
            overflow: hidden;
            margin: 0!important;
            flex: 1;
        }
        li:nth-child(2) {
            padding: 0 2px;
        }
        img {
            width: 100%;
            min-height: small_height;
        }
    }
}

.video {
    video {
        width: 100%;
    }
    .video_wrapper {
        width: 100%;
        height: larger_height;
        position: relative;
        overflow: hidden;
        color: #999;
        .video_info {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            img {
                position: absolute;
                width: 100%;
                min-height: larger_height;
                display: block;
                left: 0;
                top: 0;
                z-index: 111;
            }
        }
        .video_title {
            position: absolute;
            width: 100%;
            height: 80px;
            top: 0;
            left: 0;
            color: #fff;
            background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, .5)), color-stop(100%, transparent));
            z-index: 222;
            p {
                width: 100%;
                font-size: 14px;
                line-height: 24px;
                padding: 8px 15px 0;
                margin: 0;
            }
        }
        .totalTime {
            position: absolute;
            display: inline-block;
            width: 40px;
            right: 5px;
            bottom: 5px;
            background: rgba(0, 0, 0, .5);
            color: #fff;
            font-size: 12px;
            text-align: center;
            height: 20px;
            line-height: 20px;
            border-radius: 10px;
            z-index: 222;
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
            z-index: 222;
            border: 1px solid #fff;
        }
        .playSan {
            position: absolute;
            width: 0;
            height: 0;
            font-size: 0;
            border: 16px solid white;
            border-color: transparent transparent transparent rgba(255, 255, 255, .6);
            left: 50%;
            top: 50%;
            margin-left: -5px;
            margin-top: -16px;
        }
    }
}

#listItem #lookHere {
    width: 86%;
    margin: 10px 7%;
    border-radius: 5px;
    border: 1px solid rgb(245, 103, 103);
    background: rgb(255, 240, 245);
    p {
        font-size: 12px;
        line-height: 18px;
        color: rgb(255, 51, 51);
        text-align: center;
        user-select: none;
        margin: 0;
        padding: 5px 0;
    }
}

.text{
    p{
        font-size: 17px;
        line-height: 21px;
        color: #222;
        font-weight: 400;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>
