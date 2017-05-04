<template>
    <ul id="listItem">
        <template v-for="section in itemJson">
            <!-- 视频 -->
            <li v-if="section.playonlineurl">
                <router-link :to="section.titleurl | urlFilter" class='video'>
                    <div class="video_wrapper">
                        <div class="video_info">
                            <div class="video_title">
                                <p>{{section.title}}</p>
                            </div>
                            <div class="totalTime">{{section.playtime}}</div>
                            <img :src="section.titlepic">
                        </div>
                        <div class="playRound">
                            <div class="playSan"></div>
                        </div>
                    </div>
                    <div class='news_info'>
                        <span class="news_label recommend">视频</span>
                        <span class='from' v-if='!$store.state.isIOS'>{{section.befrom}}</span>
                        <span class='news_click'>{{section.onclick | watchFilter }}阅</span>
                        <span class='news_time'>{{section.time}}</span>
                    </div>
                </router-link>
            </li>
            <!-- 1张大图 -->
            <li v-else-if="section.ptitlepic">
                <router-link :to="section.titleurl | urlFilter" class='oneLarge'>
                    <div class="news_title">
                        <h3>{{section.title}}</h3>
                    </div>
                    <div class='news_img'>
                        <img :src="section.ptitlepic">
                    </div>
                    <div class='news_info'>
                        <span v-if="section.isgood >= 6" class="news_label recommend">荐</span>
                        <span v-else-if="section.firsttitle >= 6" class="news_label hot">热</span>
                        <span class='from' v-if='!$store.state.isIOS'>{{section.befrom}}</span>
                        <span class='news_click'>{{section.onclick | watchFilter }}阅</span>
                        <span class='news_time'>{{section.time}}</span>
                    </div>
                </router-link>
            </li>
            <!-- 3张小图 -->
            <li v-else-if="section.titlepic3">
                <router-link :to="section.titleurl | urlFilter" class='threeSmall'>
                    <div class="news_title">
                        <h3>{{section.title}}</h3>
                    </div>
                    <div class='list_img'>
                        <ul class='clearfix'>
                            <li><img :src="section.titlepic"></li>
                            <li><img :src="section.titlepic2"></li>
                            <li><img :src="section.titlepic3"></li>
                        </ul>
                    </div>
                    <div class='news_info'>
                        <span class="news_label recommend" v-if="section.isgood >= 6">荐</span>
                        <span class="news_label hot" v-else-if="section.firsttitle >= 6">热</span>
                        <span class='from' v-if='!$store.state.isIOS'>{{section.befrom}}</span>
                        <span class='news_click'>{{section.onclick | watchFilter }}阅</span>
                        <span class='news_time'>{{section.time}}</span>
                    </div>
                </router-link>
            </li>
            <!-- 1张小图 -->
            <li v-else-if="section.titlepic">
                <router-link :to="section.titleurl | urlFilter" class='oneSmall clearfix'>
                    <div class="news_title">
                        <h3>{{section.title}}</h3>
                        <div class='news_info'>
                            <span class="news_label recommend" v-if="section.isgood >= 6">荐</span>
                            <span class="news_label hot" v-else-if="section.firsttitle >= 6">热</span>
                            <span class='from' v-if='!$store.state.isIOS'>{{section.befrom}}</span>
                            <span class='news_click'>{{section.onclick | watchFilter }}阅</span>
                            <span class='news_time'>{{section.time}}</span>
                        </div>
                    </div>
                    <div class='news_img'>
                        <img :src="section.titlepic">
                    </div>
                </router-link>
            </li>
            <!-- 上次观看到这里 -->
            <li v-else-if='section.type' id="lookHere">
                <p>上次看到这里，点击刷新 <i class="icon-refresh"></i></p>
            </li>
        </template>
    </ul>
</template>
<script>
export default {
    name: 'listItem',
    props: ['itemJson'],
    filters: {
        urlFilter(val) {
            if (!val) return ''

            function GetQueryString(url, name) {
                var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
                var r = url.substr(0).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
            const classid = GetQueryString(val, 'classid');
            const id = GetQueryString(val, 'id');
            const url = `/detail?classid=${classid}&id=${id}`;
            return url
        },
        watchFilter(val) {
            if (!val) return ''
            return 107 + parseInt(val)
        },
    },
    watch: {
        itemJson() {
            $('#lookHere').prev().css('border', 'none');
        }
    },
    mounted() {
        $('#lookHere').prev().css('border', 'none');
    }
}
</script>
<style scoped lang='stylus'>
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
}

.news_info {
    font-size: 10px;
    color: #999;
    margin-top: 6px;
    span {
        display: inline-block;
        margin-right: 2px;
        border: 1px solid #fff;
    }
    .news_label {
        font-size: 10px;
        line-height: 11px;
        text-align: center;
        border-radius: 2px;
        padding: 1px;
    }
    .recommend {
        color: #fff;
        background:#3d99d4;
    }
    .hot {
        color: #fff;
        background:#f85959;
    }
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
        height: 68px;
        overflow: hidden;
        img {
            width: 100%;
            min-height: 68px;
        }
    }
}

.oneLarge {
    .news_img {
        width: 100%;
        margin-top: 6px;
        overflow: hidden;
        height: 190px;
    }
    img {
        width: 100%;
        min-height: 190px;
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
            height: 68px;
            overflow: hidden;
            margin: 0!important;
            flex: 1;
        }
        li:nth-child(2) {
            padding: 0 2px;
        }
        img {
            width: 100%;
            min-height: 68px;
        }
    }
}

.video {
    video {
        width: 100%;
    }
    .video_wrapper {
        width: 100%;
        height: 190px;
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
                min-height: 190px;
                display: block;
                left: 0;
                top: 0;
                z-index: 111;
            }
        }
        .video_title {
            position: absolute;
            width: 100%;
            height: 1.6rem;
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
}

#lookHere p {
    font-size: 12px;
    line-height: 18px;
    color: rgb(255, 51, 51);
    text-align: center;
    user-select: none;
    margin: 0;
    padding: 5px 0;
}
@media screen and (min-width: 414px) and (max-width: 500px){
    #listItem li {
        margin: 0 18px;
    }
    #listItem li a.oneSmall .news_img{
        height: 92px;
    }
    #listItem li a.oneSmall .news_img img{
        min-height:92px;
    }
    #listItem li a.oneLarge .news_img{
        height: 160px;
    }
    #listItem li a.oneLarge .news_img img{
        min-height: 160px;
    }
    #listItem li a.threeSmall .list_img li {
        height: 92px;
        padding:0;
        margin:0;
    }
    #listItem li a.threeSmall .list_img  li img{
        min-height: 92px;
    }
    #listItem .video .video_wrapper{
        height: 180px;
    }
    #listItem .video .video_info img{
        min-height: 180px;
    }
}
 @media screen and (min-width: 501px) and (max-width: 620px){
    #listItem .nav_ul a{
        padding: 0 10px;
        margin-left:8px;
    }
    #listItem li {
        margin: 0 20px;
    }
    #listItem li a.oneSmall .news_title h3{
        margin-right: 20px;
    }
    #listItem li a.oneSmall .news_title{
        width: 65%;
    }
    #listItem li a.oneSmall .news_img{
        width: 35%;
        height: 116px;
    }
    #listItem li a.oneSmall .news_img img{
        min-height:116px;
    }
    #listItem li a.oneLarge .news_img{
        height: 200px;
    }
    #listItem li a.oneLarge .news_img img{
        min-height: 200px;
    }
    #listItem li a.threeSmall .list_img li {
        height: 116px;
        padding:0;
        margin:0;
    }
    #listItem li a.threeSmall .list_img  li img{
        min-height: 116px;
    }
    #listItem .video .video_wrapper{
        height: 220px;
    }
    #listItem .video .video_info img{
        min-height: 220px;
    }
}
    
@media screen and (min-width: 621px) and (max-width: 767px){
    #listItem .nav_ul a{
        padding: 0 12px;
        margin-left:8px;
    }
    /*图片*/
    #listItem li {
        margin: 0 22px;
    }
    #listItem li a.oneSmall .news_title h3{
        margin-right: 30px;
    }
    #listItem li a.oneSmall .news_title{
        width: 64%;
    }
    #listItem li a.oneSmall .news_img{
        width: 36%;
        height: 140px;
    }
    #listItem li a.oneSmall .news_img img{
        min-height:140px;
    }
    #listItem li a.oneLarge .news_img{
        height: 240px;
    }
    #listItem li a.oneLarge .news_img img{
        min-height: 240px;
    }
    #listItem li a.threeSmall .list_img li {
        height: 140px;
        padding:0;
        margin:0;
    }
    #listItem li a.threeSmall .list_img  li img{
        min-height: 140px;
    }
    #listItem .video .video_wrapper{
        height: 260px;
    }
    #listItem .video .video_info img{
        min-height: 260px;
    }

}
    
@media only screen and (min-width: 768px){
    #listItem li a .news_info{
        margin-top: 8px;
    }
    /*导航*/
    #listItem .nav_ul a{
        padding: 0 12px;
        margin-left:10px;
    }
    /*图片*/
    #listItem li {
        margin: 0 24px;
    }
    #listItem li a.oneSmall .news_title h3{
        margin-right: 50px;
    }
    #listItem li a.oneSmall .news_title{
        width: 64%;
    }
    #listItem li a.oneSmall .news_img{
        width: 36%;
        height: 160px;
    }
    #listItem li a.oneSmall .news_img img{
        min-height:160px;
    }
    #listItem li a.oneLarge .news_img{
        height: 280px;
        margin-top: 8px;
    }
    #listItem li a.oneLarge .news_img img{
        min-height: 280px;
    }
    #listItem li a.threeSmall .list_img{
        width: 100%;
        margin-top: 8px;
    }
    #listItem li a.threeSmall .news_info{
        margin-top: 6px;
    }
    #listItem li a.threeSmall .list_img li {
        height: 160px;
        padding:0;
        margin:0;
    }
    #listItem li a.threeSmall .list_img  li img{
        min-height: 160px;
    }
    /*视频*/
    #listItem .video .video_wrapper{
        height: 300px;
    }
    #listItem .video .video_info img{
        min-height: 300px;
    }
}
</style>
