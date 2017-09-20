<template>
    <ul class="list">
        <li class="list-item" v-for="(item,index) in itemJson" :key='index'>
            <a>
                <div class="item-title">
                    <router-link :to="url(item)" tag="h3">{{item.title}}</router-link>
                    <div class="item-state">
                        <span class="passed" v-if="item.state === '1'">已发表</span>
                        <span class="draft" v-if="item.state === '2'">草稿</span>
                        <span class="auditing" v-if="item.state === '3'">审核中</span>
                        <span class="unpassed" v-if="item.state === '4'">未通过</span>
                        <span class="recall" v-if="item.state === '5'">已撤回</span>
                        <span class="time" v-if="item.newstime">{{item.newstime}}</span>
                        <span class="icon-more" @click.stop="openSheet(item,index)"></span>
                    </div>
                </div>
                <router-link :to="url(item)" tag="div" class="item-img"><img :src="item.titlepic"></router-link>
                <ul class='item-analysis'>
                    <li>
                        <span v-if="item.onclick">阅读 {{item.onclick}}</span>
                        <span v-else>阅读 0</span>
                    </li>
                    <li>
                        <span v-if="item.plnum">评论 {{item.plnum}}</span>
                        <span v-else>评论 0</span>
                    </li>
                    <li>
                        <span v-if="item.collectnum">收藏 {{item.collectnum}}</span>
                        <span v-else>收藏 0</span>
                    </li>
                </ul>
            </a>
        </li>
        <mt-actionsheet :actions="actions" v-model="actionsheet"> </mt-actionsheet>
    </ul>
</template>
<script>
import { mapActions } from 'vuex'
import { Toast, Indicator, MessageBox } from 'mint-ui'
export default {
    props: ['itemJson'],
    data() {
        return {
            item: null,
            index: null,
            actionsheet: false,
            actions: [
                {
                    name: '修改',
                    method: this.edit
                },
                {
                    name: '删除',
                    method: this.delete
                }
            ]
        }
    },
    methods: {
        ...mapActions('health', [
            'post_article_data'
        ]),
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
        },
        openSheet(item, index) {
            this.item = item
            this.index = index
            this.actionsheet = true
        },
        edit() {
            if (this.item) {
                this.$router.push(`publish?id=${this.item.id}`)
            }
        },
        delete() {
            MessageBox.confirm('确定删除?')
            .then(() => {
                Indicator.open()
                let params = {
                    type: 'del',
                    id: this.item.id,
                    datafrom: this.item.datafrom
                }
                this.post_article_data(params)
                .then(res => {
                    Indicator.close()
                    this.itemJson.splice(this.index, 1)
                    Toast('删除成功')
                })
                .catch(err => {
                    console.log('删除失败', err)
                    Toast('删除失败!')
                    Indicator.close()
                })
            })
            .catch(() => {
            })
        }
    }
}
</script>
<style scoped lang='stylus'>
.list {
    .list-item {
        padding: 15px 16px;
        border-bottom: 4px solid #f4f5f6;
        a {
            display: block;
            font-size: 0;
            color: #131313;
            -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
            text-decoration: none;
            .item-title {
                display: inline-block;
                width: 67%;
                vertical-align: top;
                h3 {
                    white-space: normal;
                    font-size: 17px;
                    line-height: 21px;
                    color: #333;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-right: 0.32rem;
                }
            }
            .item-img {
                display: inline-block;
                width: 33%;
                height: 1.96875rem;
                overflow: hidden;
                img {
                    border: 1px solid #e8e8e8;
                    width: 100%;
                    border-width: .5px;
                    height: 100%;
                }
            }

            .item-state {
                margin-top: 8px;
                span {
                    display: inline-block;
                    font-size: 12px;
                    color: #909090;
                    margin-right: 8px;
                }
                .icon-more {
                    float: right;
                    font-size: 14px;
                    margin-right: 20px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    padding: 0 5px;
                }
            }
            .item-analysis {
                margin-top: 8px;
                display: flex;
                color: #cacaca;
                background-color: #f4f5f6;
                li {
                    flex: 1;
                    padding: 10px 0;
                    height: 36px;
                    span {
                        border-right: 1px solid #ddd;
                        border-right-width: .5px;
                        color: #999;
                        display: block;
                        text-align: center;
                        line-height: 16px;
                        font-size: 12px;
                    }
                }
                li:last-of-type span {
                    border-right: 0;
                }
            }
        }
    }
}
</style>
