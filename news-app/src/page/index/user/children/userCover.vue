<template>
    <transition name='fadeIn'>
        <div id='userCover'>
            <my-header fixed v-goTop:click='true' :class="{header_visible: header_visible}" :title='title'>
                <a slot="left" class="back-white" @click.stop='$router.go(-1)'></a>
            </my-header>
            
            <div class="content">
                <div class="container" v-swiper:swiperRight='true' v-infinite-scroll="myCommentRecordAjax" infinite-scroll-disabled="bottomLock" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
                    <div class="cover_bg"></div>
                    <div class="user">
                        <div class="user_avatar">
                            <img :src="wx.headimgurl">
                        </div>
                        <div class="user_name">{{wx.nickname}}</div>
                    </div>
                    <div class="activity">
                        <div class='spinnerLoad' v-if='loading'>
                            <mt-spinner color='#00939c'></mt-spinner>
                        </div>

                        <div class='error'  v-if='error'>
                            <p>网络出现错误</p>
                            <mt-button type='primary' @click.stop='myCommentRecordAjax'>重试</mt-button>
                        </div>

                        <ul class="list">
                            <li v-for="(item,index) in json" :key='index'>
                                <div class="top clearfix">
                                    <div class="portrait">
                                        <img :src="item.headimgurl">
                                    </div>
                                    <div class="info">
                                        <p class="name">{{item.nickname}}</p>
                                        <p class="time">{{item.time}}</p>
                                    </div>
                                    <div class="delete" @click.stop='deleteComment(item)'>删除</div>
                                </div>
                                <div class="mid">
                                    <div class="comment_text">{{item.content}}</div>
                                    <router-link :to='url(item.article)'>
                                        <div class="article">
                                            <div class='news_img'>
                                                <div class="playRound" v-if='item.article.playonlineurl'>
                                                    <div class="playSan"></div>
                                                </div>
                                                <img :src="item.article.titlepic">
                                            </div>
                                            <div class="news_title">
                                                <h3>{{item.article.title}}</h3>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                        </ul>

                        <div class="bottomLoad" v-if="json.length > 0">
                            <div class="loading" v-show='bottomLoading'>加载中...</div>
                            <div class="noData" v-if='bottomNoData'>没有更多的内容了</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { fetch } from '@/config/fetch'
import { mapGetters, mapActions } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
    name: 'userCover',
    data() {
        return {
            json: [],
            page: 1,
            location: 0,
            bottomLock: false,
            loading: false,
            error: false,
            bottomLoading: false,
            bottomNoData: false,
            header_visible: false,
            title: ''
        }
    },
    computed: {
        ...mapGetters([
            'userid'
        ]),
        ...mapGetters('login', [
            'wx'
        ])
    },
    methods: {
        ...mapActions('detail', [
            'post_delete_data'
        ]),
        myCommentRecordAjax() {
            this.error = false
            if (this.json.length === 0) {
                this.loading = true
            } else {
                this.bottomLoading = true
                this.bottomLock = true
            }
            fetch('post', 'historyComment', {'userid': this.userid, 'page': this.page})
            .then(res => {
                if (res) {
                    this.json.push(...res)
                    this.page++
                } else {
                    this.bottomLoading = false
                    this.bottomNoData = true
                }
                this.loading = false
                this.error = false
                this.bottomLock = false
            })
            .catch(err => {
                console.log(err)
                this.loading = false
                this.error = true
            })
        },
        scrollHeader() {
            let timeoutRef
            let scrollDom = $('#userCover .container')
            scrollDom.on('scroll', () => {
                if (timeoutRef) {
                    clearTimeout(timeoutRef)
                }
                timeoutRef = setTimeout(() => {
                    if (scrollDom.scrollTop() > 80) {
                        this.header_visible = true
                        this.title = this.wx.nickname
                    } else {
                        this.header_visible = false
                        this.title = ''
                    }
                }, 10)
            })
        },
        deleteComment(item) {
            MessageBox.confirm('确定删除此评论?')
            .then(action => {
                let params = {
                    'userid': item.userid,
                    'id': item.id,
                    'datafrom': item.datafrom,
                    'remarkid': item.remarkid,
                    'comment': 'del',
                    'type': 'remark'
                }
                fetch('post', 'postComment', params)
                .then(res => {
                    if (res.err) {
                        Toast({message: '删除成功', duration: 1500})
                        let index = this.json.findIndex(n => n.remarkid === item.remarkid)
                        this.json.splice(index, 1)
                    } else {
                        Toast({message: '删除失败', duration: 1500})
                    }
                })
            })
            .catch(err => {
                console.log(err)
                if (err !== 'cancel') {
                    Toast({message: '删除失败', duration: 1500})
                }
            })
        },
        handleLocaltion(type) {
            if (type === 'get') {
                if (this.localtion > 0) {
                    $('#userCover .container').scrollTop(this.localtion)
                }
            } else if (type === 'set') {
                let scrollTop = $('#userCover .container').scrollTop()
                this.localtion = scrollTop
            }
        },
        url(article) {
            return `/detail?classid=${article.classid}&id=${article.id}&datafrom=${article.datafrom}`
        }
    },
    mounted() {
        this.scrollHeader()
        this.myCommentRecordAjax()
    },
    activated () {
        this.handleLocaltion('get')
    },
    deactivated () {
        this.handleLocaltion('set')
    }
}
</script>
<style scoped lang='stylus'>
#userCover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;
    header {
        background-color: transparent;
        transition: all 0.2s;
        &.header_visible {
            background-color: #00939c;
        }
    }
    .cover_bg {
        height: 4rem;
    }
    .content {
        padding-top: 0;
        background-color: #eeeeee;
        .container {
            a {
                text-decoration: none;
            }
        }
        .user {
            position: relative;
            padding: 0 15px;
            background: #fff;
            border-bottom: 1px solid #eee;
            .user_avatar {
                width: 2.5rem
                height: 2.5rem;
                position: absolute;
                left: 50%;
                margin-left: -1.25rem;
                top: -1.25rem;
                overflow: hidden;
                z-index: 555;
                border-radius: 100%;
                img {
                    width: 100%;
                }
            }
            .user_name {
                padding: 1.6rem 0 6px;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
            .user_city {
                font-size: 14px;
                color: #666;
                margin-bottom: 10px;
                text-align: center;
                i {
                    display: inline-block;
                    font-size: 16px;
                    vertical-align: middle;
                    margin-top: -2px;
                }
            }
        }
        /*nav {
            padding: 0 16px;
            background: #fff;
            border-bottom: 1px solid #ddd;
            a {
                display: table-cell;
                vertical-align: middle;
                font-size: 14px;
                height: 36px;
                &.active {
                    color: #00939c;
                    border-bottom: 2px solid #00939c;
                }
            }
        }*/
        .activity {
            position: relative;
            .spinnerLoad {
                margin-top: 0.5rem;
                text-align: center;
                span {
                    display: inline-block;
                }
            }
            .error{
                margin-top: 1.3rem;
                text-align: center;
                p {
                    color: #aaa;
                    margin-bottom: 10px;
                    font-size: 16px;
                }
                button {
                    border-radius: 5px;
                }
            }
            .bottomLoad{
                margin-top: 5px;
            }
            li {
                margin-top: 5px;
                padding: 16px 15px;
                background: #fff;
                .top {
                    position: relative;
                    margin-bottom: 6px;
                    display: flex;
                    align-items: center;
                    .portrait {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 36px;
                        height: 36px;
                        overflow: hidden;
                        border-radius: 100%;
                        img {
                            width: 100%;
                        }
                    }
                    .info {
                        flex: 1;
                        padding-left: 46px;
                        padding-right: 5px;
                        font-size: 14px;
                        color: #000;
                        line-height: 16px;
                        .name {
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            margin-bottom: 6px;
                        }
                        .time {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .delete{
                        padding: 2px 5px;
                    }
                }
                .mid {
                    .comment_text {
                        font-size: 16px;
                    }
                    .article {
                        margin-top: 6px;
                        font-size: 0;
                        background: #f4f5f6;
                        .news_img,
                        .news_title {
                            display: inline-block;
                            vertical-align: middle;
                            overflow: hidden;
                        }
                        .news_img {
                            width: 25%;
                            height: 1.96875rem;
                            position: relative;
                            img {
                                width: 100%;
                                min-height: 1.96875rem;
                            }
                        }
                        .news_title {
                            width: 75%;
                            h3 {
                                font-size: 16px;
                                margin: 0 12px;
                                white-space: normal;
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
                        .playRound {
                            position: absolute;
                            width: 30px;
                            height: 30px;
                            left: 50%;
                            top: 50%;
                            margin-left: -15px;
                            margin-top: -15px;
                            border-radius: 50%;
                            background: rgba(0, 0, 0, .6);
                            z-index: 222;
                        }
                        .playSan {
                            position: absolute;
                            width: 0;
                            height: 0;
                            font-size: 0;
                            border: 8px solid white;
                            border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
                            left: 50%;
                            top: 50%;
                            margin-left: -2px;
                            margin-top: -8px;
                        }
                    }
                }
            }
        }
    }
}

</style>
<style scoped>
.cover_bg {
    background: url(~@/assets/img/cover_bg.png)no-repeat center center;
    background-size: cover;
}
</style>
