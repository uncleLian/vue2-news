<template>
    <section class='comment_item'>

        <div class="item_portrait">
            <img :src="itemJson.headimgurl">
        </div>

        <div class="item_content">
            <div class="content_top">
                <span class="name">{{itemJson.nickname}}</span>
                <span class="zan icon-zan" :class="{'active': itemJson.isdz}" @click.stop='addZan'>
                   <span v-if='itemJson.dznum'> {{itemJson.dznum}}</span>
                </span>
            </div>
            <!-- 内容 -->
            <div class="content_text">
                {{itemJson.content}}
                <span class="altUser" v-if="itemJson.altuser">//
                    <a class="altUser_name">@{{itemJson.altuser.nickname}}</a>
                    <span class="altUser_content">：{{itemJson.altuser.content}}</span>
                </span>
            </div>
            <div class="content_footer">
                <span class="time" v-if='itemJson.time'>{{itemJson.time}} · </span>
                <span class="reply" v-if="comment === 'reply'" @click.stop="replyComment">
                    <span class="reply-hava" v-if="itemJson.plnum > 0" >{{itemJson.plnum}}条回复</span>
                    <span v-else>回复</span>
                </span>
                <span class="reply" v-else>
                    <span class="reply-hava" v-if="itemJson.plnum > 0" >{{itemJson.plnum}}条回复</span>
                    <span v-else>回复</span>
                </span>
                <span class="delete" v-if="type === 'userself'" @click.stop="deleteComment">删除</span >
            </div>
        </div>

    </section>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
    props: {
        itemJson: {
            default: ''
        },
        comment: String,
        type: String

    },
    computed: {
        ...mapGetters('detail', [
            'myComment',
            'myReply'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_myComment',
            'set_myReply',
            'set_talkReply'
        ]),
        ...mapActions('detail', [
            'post_zan_data',
            'post_delete_data'
        ]),
        addZan() {
            if (!this.itemJson.isdz) {
                this.itemJson.dznum++
                this.itemJson.isdz = 1
                this.post_zan_data({'comment': this.comment, 'remarkid': this.itemJson.remarkid, 'replyid': this.itemJson.replyid})
            }
        },
        deleteComment() {
            MessageBox.confirm('确定删除此评论?')
            .then(action => {
                let type
                if (this.comment === 'reply') {
                    type = 'reply'
                    let index = this.myReply.findIndex(n => n.replyid === this.itemJson.replyid)
                    this.myReply.splice(index, 1)
                    this.set_myReply(this.myReply)
                } else if (this.comment === 'remark') {
                    type = 'remark'
                    let index = this.myComment.findIndex(n => n.remarkid === this.itemJson.remarkid)
                    this.myComment.splice(index, 1)
                    this.set_myComment(this.myComment)
                }
                this.$emit('delSuccess', this.itemJson)
                this.post_delete_data({'type': type, 'remarkid': this.itemJson.remarkid, 'replyid': this.itemJson.replyid})
                .then(res => {
                    Toast({message: '删除成功', duration: 1500})
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        replyComment() {
            this.set_talkReply(this.itemJson)
            $('#reply #input').focus()
        }
    }
}
</script>
<style scoped lang='stylus'>
.comment_item {
    position: relative;
    padding: 10px 16px;
    .item_portrait {
        float: left;
        width: 36px;
        height: 36px;
        overflow: hidden;
        border-radius: 100%;
        img {
            width: 100%;
        }
    }
    .item_content {
        padding-left: 46px;
        font-size: 14px;
        color: #000;
        .content_top {
            display: flex;
            width: 100%;
            margin-bottom: 6px;
            line-height: 16px;
            .name {
                flex: 1;
                color: #007aff;
                overflow: hidden;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 10px;
            }
            .zan {
                color: #888;
                text-align: right;
                vertical-align: middle;
                padding:0 5px;
                &.active {
                    color: #d81e06;
                }
            }
        }
        .content_text {
            margin-bottom: 6px;
            word-wrap: break-word;
            padding-right: 10px;
            .altUser_name{
                color: #007aff;
                text-decoration: none;
            }
        }
        .content_footer {
            margin-bottom: 6px;
            font-size: 12px;
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
    }
}
</style>
