<template>
    <transition name='fadeIn'>
        <div id="channel">
            <my-header fixed title='频道管理'>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            
            <div class="content">
                <div class="container" v-swiper:swiperRight='true'>
                    <!-- 原有的栏目 -->
                    <section class="column">
                        <p class="title">点击删除以下频道</p>
                        <ul>
                            <li v-for='(item,index) in indexColumn' @click='remove(item,index)' :key='index' >
                                <a href='javascript:;' :class='item.classpath'>{{item.classname}}</a>
                            </li>
                        </ul>
                    </section>
                    <!-- 可以添加的栏目 -->
                    <section class="column">
                        <p class="title">点击添加以下频道</p>
                        <ul>
                            <li v-for='(item,index) in removeChannel' @click="add('removeChannel', index)" :key='index'>
                                <a href='javascript:;'>{{item.classname}}</a>
                            </li>
                        </ul>
                        <ul>
                            <li v-for='(item,index) in channel' @click='add(index)' :key='index'>
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
import { getCache, setCache } from '@/config/cache'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            channel: [
                {classname: 'Test20', classid: 20, classpath: 't1'},
                {classname: 'Test21', classid: 21, classpath: 't2'},
                {classname: 'Test22', classid: 22, classpath: 't3'},
                {classname: 'Test23', classid: 23, classpath: 't4'},
                {classname: 'Test24', classid: 24, classpath: 't5'},
                {classname: 'Test25', classid: 25, classpath: 't6'}
            ],
            removeChannel: []
        }
    },
    computed: {
        ...mapGetters('index', [
          'indexPage',
          'indexLocation',
          'indexColumn'
        ])
    },
    watch: {
        indexColumn() {
            this.set_indexColumn(this.indexColumn)
            this.set_indexActive('news_recommend')
        },
        removeChannel() {
            setCache('removeChannel', this.removeChannel)
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexPage',
            'set_indexLocation',
            'set_indexColumn'
        ]),
        ...mapActions('index', [
            'get_channel_data'
        ]),
        // 获取可以添加的栏目数据
        get_channel() {
            this.get_channel_data()
            .then(res => {
                if (res) {
                    this.channel = res
                }
            })
        },
        // 获取移除的频道
        get_removeChannel() {
            let removeChannel = JSON.parse(getCache('removeChannel'))
            if (removeChannel) {
                this.removeChannel = removeChannel
            }
        },
        // 添加栏目
        add(type, index) {
            if (type === 'channel') {
                let addEle = this.channel.splice(index, 1)
                this.indexColumn.push(...addEle)
            } else if (type === 'removeChannel') {
                let addEle = this.removeChannel.splice(index, 1)
                this.indexColumn.push(...addEle)
            }
        },
        // 移除栏目
        remove(item, index) {
            if (item.classpath !== 'news_recommend') {
                let removeEle = this.indexColumn.splice(index, 1)
                this.removeChannel.push(...removeEle)
            }
        },
        // 增减栏目之后，同步page、location对象
        sync() {
            let pageObj = {}
            let locationObj = {}
            for (let i = 0; i < this.indexColumn.length; i++) {
                var className = this.indexColumn[i].classpath
                if (this.indexPage[className] > 1) {
                    pageObj[className] = this.indexPage[className]
                } else {
                    pageObj[className] = 1
                }
                if (this.indexLocation[className] > 0) {
                    locationObj[className] = this.indexLocation[className]
                } else {
                    locationObj[className] = 0
                }
            }
            this.set_indexPage(pageObj)
            this.set_indexLocation(locationObj)
        }
    },
    mounted() {
        // this.get_channel()
        this.get_removeChannel()
    },
    deactivated() {
        this.sync()
    }
}
</script>
<style lang='stylus'>
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
        height: 100%;
        padding-top: 44px;
        background-color: #f8f8f8;
        .container{
            height: 100%;
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
