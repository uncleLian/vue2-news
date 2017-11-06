<template>
    <section class='comment_item'>
        <!-- topFooter布局的评论样式 -->
        <div class='topFooter' v-if="layout === 'topFooter'">
            <div class="top">
                <div class="portrait">
                    <img :src="itemJson.headimgurl">
                </div>
                <div class="name">{{itemJson.nickname}}</div>
            </div>
            <div class="mid">
                <div class="content_text">
                    {{itemJson.content}}
                    <span class="altUser" v-if="itemJson.altuser">//
                        <span class="altUser_name">@{{itemJson.altuser.nickname}}</span>
                        <span class="altUser_content">：{{itemJson.altuser.content}}</span>
                    </span>
                </div>
            </div>
            <div class="footer">
                <span class="reply" v-if="itemJson.plnum > 0">{{itemJson.plnum}}回复 · </span>
                <span class="zan" v-if='itemJson.dznum'>{{itemJson.dznum}}赞 · </span>
                <span class="time" v-if='itemJson.time'>{{itemJson.time}}</span>
            </div>
        </div>
        <!-- leftRight布局的评论样式 -->
        <div class='leftRight' v-else>
            <div class="left">
                <img :src="itemJson.headimgurl">
            </div>
            <div class="right">
                <div class="top">
                    <span class="name">{{itemJson.nickname}}</span>
                    <span class="zan icon-zan" :class="{'active': itemJson.isdz}" @click.stop='addZan'>
                       <span v-if='itemJson.dznum'> {{itemJson.dznum}}</span>
                    </span>
                </div>
                <div class="mid">
                    <div class="content_text">
                        {{itemJson.content}}
                        <span class="altUser" v-if="itemJson.altuser">//
                            <span class="altUser_name">@{{itemJson.altuser.nickname}}</span>
                            <span class="altUser_content">：{{itemJson.altuser.content}}</span>
                        </span>
                    </div>
                </div>
                <div class="footer">
                    <span class="time" v-if='itemJson.time'>{{itemJson.time}} · </span>
                    <span class="reply" @click.stop="replay">回复TA</span>
                    <span class="delete" v-if="type === 'userself'" @click.stop="deleteItem">删除</span>
                </div>
                <div class="reply_all" v-if="comment === 'remark' && itemJson.plnum > 0" @click.stop="replay">
                    查看全部{{itemJson.plnum}}条回复 >
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: {
        itemJson: null,
        comment: String,
        type: String,
        layout: String
    },
    methods: {
        ...mapActions('detail', [
            'post_zan_data',
            'post_delete_data'
        ]),
        // 点赞
        addZan() {
            if (!this.itemJson.isdz) {
                this.itemJson.dznum++
                this.itemJson.isdz = 1
                let params = {
                    'comment': this.comment,
                    'remarkid': this.itemJson.remarkid,
                    'replyid': this.itemJson.replyid
                }
                this.post_zan_data(params)
            }
        },
        // 回复TA
        replay() {
            this.$emit('reply', this.itemJson)
        },
        // 删除
        deleteItem() {
            this.$msgBox.confirm('确定删除此评论?')
            .then(action => {
                this.$emit('delete', this.itemJson)
                let params = {
                    'type': this.comment,
                    'remarkid': this.itemJson.remarkid,
                    'replyid': this.itemJson.replyid
                }
                this.post_delete_data(params).then(res => {
                    this.$toast({message: '删除成功', duration: 1500})
                })
                .catch(err => {
                    console.log(err)
                    this.$toast({message: '删除失败', duration: 1500})
                })
            })
        }
    }
}
</script>
<style lang='stylus'>
.comment_item {
    position: relative;
    margin: 0 16px;
    .topFooter{
        padding: 15px 0;
        border-bottom: 1px solid #eee;
        .top{
            .portrait{
                display: inline-block;
                vertical-align: middle;
                width: 30px;
                height: 30px;
                overflow: hidden;
                border-radius: 100%;
                img {
                    width: 100%;
                }
            }
            .name {
                display: inline-block;
                vertical-align: middle;
                color: #007aff;
                overflow: hidden;
                text-align: left;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                padding-left: 5px;
            }
        }
        .mid{
            margin-top: 6px;
            font-size: 16px;
            .content_text {
                position: relative;
                word-wrap: break-word;
            }
            .altUser_name{
                color: #007aff;
                text-decoration: none;
            }
        }
        .footer{
            margin-top: 6px;
            font-size: 12px;
            color: #888;
            span{
                padding: 4px 0;
            }
            .delete{
                float: right;
                padding: 0 5px;
            }
        }
    }
    .leftRight{
        padding: 15px 0;
        .left {
            float: left;
            width: 36px;
            height: 36px;
            overflow: hidden;
            border-radius: 100%;
            img {
                width: 100%;
            }
        }
        .right {
            padding-left: 46px;
            font-size: 14px;
            color: #000;
            .top {
                display: flex;
                width: 100%;
                line-height: 16px;
                .name {
                    flex: 1;
                    color: #007aff;
                    overflow: hidden;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    padding: 5px 10px 5px 0;
                }
                .zan {
                    color: #888;
                    text-align: right;
                    vertical-align: middle;
                    padding:5px 8px;
                    &.active {
                        color: #d81e06;
                    }
                }
            }
            .mid{
                margin-top: 6px;
                font-size: 16px;
                .content_text {
                    position: relative;
                    word-wrap: break-word;
                    padding-right: 10px;
                }
                .altUser_name{
                    color: #007aff;
                    text-decoration: none;
                }
            }
            .footer {
                margin-top: 6px;
                font-size: 12px;
                color: #888;
                padding-bottom: 10px;
                border-bottom: 1px solid #eee;
                span{
                    padding-top: 4px;
                    padding-bottom: 4px;
                }
                .reply-hava{
                    padding: 2px 6px;
                    border-radius: 30px;
                    background: #ddd;
                }
                .delete{
                    float: right;
                    padding: 0 5px;
                }
            }
            .reply_all{
                margin-top: 10px;
                padding: 5px;
                font-size: 14px;
                color: #888;
                background: #eee;
            }
        }
    }
}
</style>
