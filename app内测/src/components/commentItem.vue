<template>
    <section class='comment_item'>
        <!-- 头像 -->
        <div class="item_portrait">
            <img :src="itemJson.headimgurl">
        </div>

        <div class="item_content">
            <div class="content_top">
                <!-- 名字 -->
                <span class="name">{{itemJson.nickname}}</span>
                <!-- 点赞 -->
                <span class="zan icon-zan" @click.stop='addZan' :class="{'active': itemJson.isdz}">
                   <span v-if='itemJson.dznum'> {{itemJson.dznum}}</span>
                </span>
            </div>
            <!-- 内容 -->
            <div class="content_text">{{itemJson.content}}</div>
            <div class="content_footer">
                <!-- 时间 -->
                <span class="time">{{itemJson.time}}</span>
                <!-- 回复数量 -->
                <span class="reply">· <span v-if='itemJson.plnum'> {{itemJson.plnum}}条</span>回复</span>
                <!-- 删除 -->
                <span class="delete" @click.stop="deleteComment" v-if="type === 'userself'">· 删除</span >
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
        type: String
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters('detail', [
            'myComment',
            'reply'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_myComment',
            'set_reply'
        ]),
        ...mapActions('detail', [
            'send_zan_data',
            'send_delete_data'
        ]),
        addZan() {
            if (!this.isdz) {
                let type
                let id
                this.itemJson.dznum++
                this.itemJson.isdz = 1
                if (this.itemJson.replyid) {
                    type = 'reply'
                    id = this.itemJson.replyid
                } else if (this.itemJson.remarkid) {
                    type = 'remark'
                    id = this.itemJson.remarkid
                }
                this.send_zan_data({'type': type, 'id': id})
            }
        },
        deleteComment() {
            MessageBox.confirm('确定执行删除?')
            .then(action => {
                let type
                let id
                if (this.itemJson.replyid) {
                    type = 'reply'
                    id = this.itemJson.replyid
                    let index = this.reply.findIndex(n => n.replyid === this.itemJson.replyid)
                    this.reply.splice(index, 1)
                    this.set_reply(this.reply)
                } else if (this.itemJson.remarkid) {
                    type = 'remark'
                    id = this.itemJson.remarkid
                    let index = this.myComment.findIndex(n => n.remarkid === this.itemJson.remarkid)
                    this.myComment.splice(index, 1)
                    this.set_myComment(this.myComment)
                }
                this.send_delete_data({'type': type, 'id': id})
                .then(res => {
                    Toast({message: '删除成功', duration: 1500})
                })
            })
            .catch(err => {
                console.log(err)
            })
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
                &.active {
                    color: #d81e06;
                }
            }
        }
        .content_text {
            margin-bottom: 6px;
        }
        .content_footer {
            margin-bottom: 6px;
            font-size: 12px;
        }
    }
}
</style>
