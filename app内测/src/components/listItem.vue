<template>
    <ul id="listItem">
        <template v-for="section in itemJson">
            <!-- 视频 -->
            <li v-if="section.playonlineurl" @click.stop='saveData(section)'>
                <router-link :to="url(section)" class='video'>
                    <div class="video_wrapper">
                        <div class="video_info">
                            <div class="video_title">
                                <p>{{section.title}}</p>
                            </div>
                            <div class="totalTime">{{section.playtime}}</div>
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
            <li v-else-if="section.ptitlepic"  @click.stop='saveData(section)'>
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
            <li v-else-if="section.titlepic3" @click.stop='saveData(section)'>
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
            <li v-else-if="section.titlepic" @click.stop='saveData(section)'>
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
            <li v-else-if='section.title' @click.stop='saveData(section)'>
                <router-link :to="url(section)" class='text'>
                    <p>{{section.title}}</p>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
        </template>
    </ul>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    props: ['itemJson'],
    methods:{
        ...mapMutations('detail',[
            'set_listArticle',
        ]),
        url(item){
            return `/detail?classid=${item.classid}&id=${item.id}`
        },
        saveData(json){
            this.set_listArticle(json);
        },
    }
}
</script>
<style scoped lang='stylus'>
@import "../assets/css/listItem.styl"
</style>
