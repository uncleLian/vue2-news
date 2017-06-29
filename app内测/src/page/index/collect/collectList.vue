<template>
    <ul id="listItem">
        <template v-for="section in collectJson">
            <!-- 视频 -->
            <li v-if="section.playonlineurl" @click.stop='saveData(section)'>
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id"  v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='labelCheck(section)'></div>
                </div>
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
            <li v-else-if="section.ptitlepic" @click.stop='saveData(section)'>
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='labelCheck(section)'></div>
                </div>
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
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='labelCheck(section)'></div>
                </div>
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
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='labelCheck(section)'></div>
                </div>
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
            <!-- 文字 -->
            <li v-else-if='section.title' @click.stop='saveData(section)'>
                <div class="checkBox" v-if='visible'>
                    <input type="checkbox" :id="section.id" v-if='visible'>
                    <label :for="section.id"></label>
                    <div class="checked_btn" @click='labelCheck(section)'></div>
                </div>
                <router-link :to="url(section)" class='text'>
                    <p>{{section.title}}</p>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
        </template>
    </ul>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    props: {
        collectJson: {
            default: '',
        },
        visible: {
            type: Boolean,
            default: false,
        }
    },
    computed:{
        ...mapGetters('collect',[
            'checkedArr',
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_listArticle',
        ]),
        ...mapMutations('collect', [
            'set_checkedArr',
        ]),
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}`
        },
        saveData(json) {
            this.set_listArticle(json);
        },
        labelCheck(item){
            let checkBox = $(`#${item.id}`)[0];
            checkBox.checked = !checkBox.checked;
            if(checkBox.checked){
                let obj = {
                    'id': item.id,
                    'datafrom': item.datafrom,
                }
                this.checkedArr.push(obj);
            }else{
                let index = this.checkedArr.findIndex( val => val.id == item.id);
                if(index > -1){
                    this.checkedArr.splice(index,1);
                }
            }
            this.set_checkedArr(this.checkedArr);
        }
    }
}
</script>
<style scoped lang='stylus'>
@import '../../../assets/css/listItem.styl'
#listItem li {
    white-space: nowrap;
    position: relative;
    a {
        display: inline-block!important;
    }
    .checkBox {
        width: 30px;
        padding: 16px 0;
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
            border: 1px solid #ddd;
            border-radius: 100%;
            text-align: center;
        }
        input[type="checkbox"]:checked + label {
            border: 1px solid #d81e06;
            background: #d81e06;
            color: #fff;
        }
        input[type="checkbox"]:checked + label:after {
            content: "\2714";
        }
        .checked_btn{
            position: absolute;
            width: 120%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 888;
        }
    }
}

</style>
