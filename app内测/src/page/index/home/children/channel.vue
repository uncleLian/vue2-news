<template>
    <transition name='fadeIn' >
        <div id="channel">
        
            <my-header fixed title='频道管理'>
                <a class="back" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            
            <div class="content"  :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container" v-swiper:swiperRight='true'>
                    <section class="column">
                        <p class="title">点击删除以下频道</p>
                        <ul>
                            <li v-for='(item,index) in indexColumn' @click='remove(item,index)' :key='item' >
                                <a href='javascript:;' :class='item.classpath'>{{item.classname}}</a>
                            </li>
                        </ul>
                    </section>
                    <section class="column">
                        <p class="title">点击添加以下频道</p>
                        <ul>
                            <li v-for='(item,index) in channel' @click='add(index)' :key='item'>
                                <a href='javascript:;'>{{item.classname}}</a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            channel: '',
        }
    },
    computed:{
        ...mapGetters('index',[
          'indexActive',
          'indexPage',
          'indexLocation',
          'indexColumn',
          'channelData',
        ]),
    },
    methods: {
        ...mapMutations('index',[
            'set_indexActive',
            'set_indexPage',
            'set_indexLocation',
            'set_indexColumn',
        ]),
        ...mapActions('index',[
            'get_channel_data',
        ]),
        remove(item,index){
            if( item.classpath == 'news_recommend' ){
                return
            }else{
                let removeEle = this.indexColumn.splice(index,1);
                this.channel.push(...removeEle);
            }
        },
        add(index){
            let addEle = this.channel.splice(index,1);
            this.indexColumn.push(...addEle);
        },
        sync(){
            let pageObj = {};
            let locationObj = {};
            for (let i = 0; i < this.indexColumn.length; i++){
                var className = this.indexColumn[i].classpath;
                if(this.indexPage[className] > 1 ){
                    pageObj[className] = this.indexPage[className];
                }else{
                    pageObj[className] = 1;
                }
                if(this.indexLocation[className] > 0){
                    locationObj[className] = this.indexLocation[className];
                }else{
                    locationObj[className] = 0;
                }
            }
            this.set_indexPage(pageObj);
            this.set_indexLocation(locationObj);
        },
        get_channel_ajax(){
            this.get_channel_data()
            .then(res=>{
                if(res){
                    this.channel = res;
                }
            })
        }
    },
    watch:{
        indexColumn(){
            this.set_indexColumn(this.indexColumn);
            this.set_indexActive('news_recommend');
        }
    },
    deactivated(){
        this.sync();
    },
    mounted(){
        this.get_channel_ajax();
    },
}
</script>
<style scoped lang='stylus'>
#channel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    .content {
        height: 100%;
        padding-top: 44px;
        background-color: #f8f8f8;
        &.isIOS{
            padding-top: 64px;
        }
        .container{
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }
        .column {
            margin-top: 5px;
            .title {
                font-size: 12px;
                padding: 0 10px;
                line-height: 2em;
                background-color: #f5f5f5;
                color: #666;
            }
            ul {
                margin: 10px 0;
                li {
                    display: inline-block;
                    width: 25%;
                    margin-bottom: 10px;
                    -webkit-animation: zoomIn .3s ease;
                    animation: zoomIn .3s ease;
                    a {
                        display: block;
                        font-size: 16px;
                        margin: 0 8px;
                        border: 1px solid #ccc;
                        line-height: 2em;
                        color: #131313;
                        text-align: center;
                        text-decoration: none;
                        &.news_recommend{
                            background-color: #f0f0f0;
                        }
                    }
                }
            }
        }
    }
}

</style>
