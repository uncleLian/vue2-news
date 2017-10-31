<template>
    <ul class="listItem" :class="{'checkBox' : visible}">
        <template v-for="section in itemJson">
            <!-- 视频 -->
            <li v-if="section.playonlineurl" @click.stop='saveData(section)'>
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <router-link :to="url(section)" class='video'>
                    <div class="video_wrapper">
                        <div class="video_info">
                            <div class="video_title">
                                <p v-html="section.title"></p>
                            </div>
                            <div class="totalTime">{{section.playtime}}</div>
                            <img v-lazy.container="section.titlepic">
                        </div>
                        <div class="playRound">
                            <div class="playSan"></div>
                        </div>
                    </div>
                    <list-info :json='section'></list-info>
                </router-link>
            </li>
            <!-- 1张大图 -->
            <li v-else-if="section.ptitlepic" @click.stop='saveData(section)'>
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <router-link :to="url(section)" class='oneLarge'>
                    <div class="news_title">
                        <h3 v-html="section.title"></h3>
                    </div>
                    <div class='news_img'>
                        <img v-lazy.container='section.ptitlepic'>
                    </div>
                    <list-info :json='section'></list-info>
                </router-link>
            </li>
            <!-- 3张小图 -->
            <li v-else-if="section.titlepic3" @click.stop='saveData(section)'>
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <router-link :to="url(section)" class='threeSmall'>
                    <div class="news_title">
                        <h3 v-html="section.title"></h3>
                    </div>
                    <div class='list_img'>
                        <ul>
                            <li><img v-lazy.container='section.titlepic'></li>
                            <li><img v-lazy.container='section.titlepic2'></li>
                            <li><img v-lazy.container='section.titlepic3'></li>
                        </ul>
                    </div>
                    <list-info :json='section'></list-info>
                </router-link>
            </li>
            <!-- 1张小图 -->
            <li v-else-if="section.titlepic" @click.stop='saveData(section)'>
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <router-link :to="url(section)" class='oneSmall'>
                    <div class="news_title">
                        <h3 v-html="section.title"></h3>
                        <list-info :json='section'></list-info>
                    </div>
                    <div class='news_img'>
                        <img v-lazy.container='section.titlepic'>
                    </div>
                </router-link>
            </li>
             <!-- 文字 -->
            <li v-else-if='section.title' @click.stop='saveData(section)'>
                <!-- checkBox -->
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='checkBoxMethod(section)'></div>
                </div>
                <router-link :to="url(section)" class='text'>
                    <h3 v-html="section.title"></h3>
                    <list-info :json='section'></list-info>
                </router-link>
            </li>
            <li v-else-if='section.type' id="lookHere">
                <p>上次看到这里，点击刷新 <i class="icon-refresh"></i></p>
            </li>
        </template>
    </ul>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    props: {
        itemJson: {
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        checkBoxMethod: Function
    },
    methods: {
        ...mapMutations('detail', [
            'set_listArticle'
        ]),
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
        },
        saveData(json) {
            this.set_listArticle(json)
        }
    }
}
</script>
<style scoped lang='stylus'>
small_height=1.96875rem 
larger_height=4.6875rem 
.listItem{
    li {
        margin: 0 0.4rem;
        border-bottom: 1px solid hsla(0, 0%, 87%, .6);
    }
    a {
        display: block;
        width: 100%;
        padding: 0.427rem 0;
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
    h3 {
        white-space: normal;
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
        font-size: 0;
        & > div{
            display: inline-block;
            vertical-align: middle;
        }
        .news_title {
            width: 67%;
            overflow: hidden;
            h3 {
                margin-right: 0.32rem;
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
            margin-top: 0.16rem;
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
            margin-top: 0.16rem;
            ul {
                width: 100%;
                /*display: flex;*/
                font-size: 0;
            }
            li {
                display: inline-block;
                width: 33.3%;
                height: small_height;
                overflow: hidden;
                margin: 0!important;
                /*flex: 1;*/
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
                    padding: 8px 0.4rem 0;
                    margin: 0;
                    color: #fff!important;
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
    #lookHere {
        background: #f4f5f6;
        border: none !important;
        margin: 0 !important;
        p {
            font-size: 12px;
            line-height: 18px;
            color: #00939c;
            text-align: center;
            user-select: none;
            margin: 0;
            padding: 10px 0;
        }
    }
    &.checkBox li {
        white-space: nowrap;
        position: relative;
        a {
            display: inline-block!important;
        }
        .checkBox {
            width: 30px;
            padding: 0.427rem 0;
            display: inline-block;
            vertical-align: top;
            input[type="checkbox"] {
                display: none;
            }
            label {
                position: absolute;
                top: 50%;
                left: 0;
                width: 20px;
                height: 20px;
                line-height: 20px;
                margin-top: -10px;
                background: #fff;
                border: 1px solid #aaa;
                border-radius: 100%;
                text-align: center;
            }
            input[type="checkbox"]:checked + label {
                border-color: #00939c;
                background-color: #00939c;
                color: #fff;
            }
            input[type="checkbox"]:checked + label:after {
                border: 2px solid transparent;
                border-left: 0;
                border-top: 0;
                content: " ";
                top: 3px;
                left: 6px;
                position: absolute;
                width: 4px;
                height: 8px;
                -webkit-transform: rotate(45deg) scale(0);
                transform: rotate(45deg) scale(0);
                -webkit-transition: -webkit-transform .2s;
                transition: -webkit-transform .2s;
                transition: transform .2s;
                transition: transform .2s,-webkit-transform .2s;
                border-color: #fff;
                -webkit-transform: rotate(45deg) scale(1);
                transform: rotate(45deg) scale(1);
            }
            .checked_btn {
                position: absolute;
                width: 120%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 888;
            }
        }
    }
}
</style>
<style>
.listItem li a highlight{
    color: #fe3333!important;
    font-weight: bold;
}
</style>
