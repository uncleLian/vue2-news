<template>
    <transition name='fadeIn'>
        <div id="channel">
            <my-header title='频道管理'>
                <a class="back" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            
            <div class="content">
                <section class="column">
                    <p class="title">点击删除以下频道</p>
                    <transition-group name="list" tag="ul">
                        <li v-for='(item,index) in indexColumn' @click='remove(item,index)' :key='item' >
                            <a href='javascript:;' :class='item.classpath'>{{item.classname}}</a>
                        </li>
                    </transition-group>
                </section>
                <section class="column">
                    <p class="title">点击添加以下频道</p>
                    <transition-group name="zoom" tag="ul">
                        <li v-for='(item,index) in json' @click='add(index)' :key='item'>
                            <a href='javascript:;'>{{item.classname}}</a>
                        </li>
                    </transition-group>
                </section>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            json: [
                {classname:'20',classid:20,classpath:'t1'},
                {classname:'21',classid:21,classpath:'t2'},
                {classname:'22',classid:22,classpath:'t3'},
                {classname:'23',classid:23,classpath:'t4'},
                {classname:'24',classid:24,classpath:'t5'},
                {classname:'25',classid:25,classpath:'t6'},
            ],
        }
    },
    computed:{
        ...mapGetters('index',[
          'indexActive',
          'indexPage',
          'indexLocation',
          'indexColumn',
        ]),
    },
    methods: {
        ...mapMutations('index',[
            'set_indexActive',
            'set_indexPage',
            'set_indexLocation',
            'set_indexColumn',
        ]),
        remove(item,index){
            if( item.classpath == 'news_recommend' ){
                return
            }else{
                let removeEle = this.indexColumn.splice(index,1);
                this.json.push(...removeEle);
            }
        },
        add(index){
            let addEle = this.json.splice(index,1);
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
    z-index: 999;
    header{
        font-size: 16px;
    }
    .content {
        width: 100%;
        height: 100%;
        padding-top: 44px;
        background-color: #f8f8f8;
        .column {
            width: 100%;
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


.zoom-enter-active, .zoom-leave-active {
  transition: all .3s;
}
.zoom-enter, .zoom-leave-active {
  opacity: 0;
  transform: scale3d(.3, .3, .3);
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
    }
    50% {
        opacity: 1;
    }
}


</style>
