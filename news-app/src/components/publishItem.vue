<template>
    <ul class="list">
        <li class="list-item" v-for="(item,index) in itemJson" :key='index'>
            <!-- 草稿 -->
                <a class="draft" v-if="item.state === '2'">
                    <div class="item-title" :class="item.titlepic?'':'text'">
                        <router-link :to="url(item)" tag="h3">{{item.title}}</router-link>
                        <div class="item-state">
                            <span>草稿</span>
                            <span v-if="item.newstime">{{item.newstime}}</span>
                            <span class="icon-more" @click.stop="openSheet(item,index)"></span>
                        </div>
                    </div>
                </a>
            <!-- 其他 -->
                <a v-else>
                    <div class="item-title" :class="item.titlepic?'':'text'">
                        <router-link :to="url(item)" tag="h3">{{item.title}}</router-link>
                        <div class="item-state">
                            <span v-if="item.state === '0'">已推荐</span>
                            <span v-if="item.state === '1'">已发表</span>
                            <span v-if="item.state === '3'">审核中</span>
                            <span v-if="item.state === '4'">未通过</span>
                            <span v-if="item.state === '5'">已撤回</span>
                            <span v-if="item.newstime">{{item.newstime}}</span>
                            <span class="icon-more" @click.stop="openSheet(item,index)"></span>
                        </div>
                    </div>
                    <router-link class="item-img" v-if="item.titlepic" :to="url(item)" tag="div"><img :src="item.titlepic"></router-link>
                    <ul class='item-analysis' v-if="item.state !== '4'">
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
                    <div class="unpass-reason" v-else>理由:内容不适合收录</div>
                </a>
        </li>
        <mt-actionsheet :actions="actions" v-model="actionsheet"></mt-actionsheet>
    </ul>
</template>
<script>
// @state => 0： 已推荐 1： 已发表 2：草稿 3：审核中 4：未通过 5：已撤回
import { mapActions } from 'vuex'
export default {
    props: ['itemJson'],
    data() {
        return {
            item: null,
            index: null,
            actionsheet: false
        }
    },
    computed: {
        // 根据state状态码，生成对应功能，如：草稿状态只有删除和修改，没有撤回功能
        actions() {
            if (this.item) {
                let data = [{
                    name: '删除',
                    method: this.delete
                }]
                if (this.item.state !== '4') {
                    data[data.length] = { name: '修改', method: this.edit }
                    if (this.item.state !== '2') {
                        data[data.length] = { name: '撤回', method: this.recall }
                    }
                }
                return data
            }
        }
    },
    methods: {
        ...mapActions('health', [
            'post_article_data'     // 提交文章数据
        ]),
        url(item) {
            // 根据状态码，返回对应的路由地址。已推荐和已发表打开详情页，其他打开预览页
            if (item.state === '0' || item.state === '1') {
                return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
            } else {
                return `/index/user/publish/preview?id=${item.id}`
            }
        },
        // 打开sheet
        openSheet(item, index) {
            this.item = item
            this.index = index
            this.actionsheet = true
        },
        // 编辑功能
        edit() {
            this.$router.push(`publish?id=${this.item.id}`)
        },
        // 删除功能
        delete() {
            let params = {
                type: 'del',
                id: this.item.id,
                datafrom: this.item.datafrom
            }
            this.actionConfirm('确定永久删除？', params, () => {
                this.itemJson.splice(this.index, 1)
            })
        },
        // 撤回功能
        recall() {
            let params = {
                type: 'recall',
                id: this.item.id,
                state: '5'
            }
            this.actionConfirm('确定从主页上撤回？', params, () => {
                this.item.state = '5'
            })
        },
        // 封装的confirm方法，为了优化下代码
        actionConfirm(text, params, methods) {
            this.$msgBox.confirm(text)  // 提示text
            .then(() => {
                this.$indicator.open()
                this.post_article_data(params) // 参数
                .then(res => {
                    this.$indicator.close()
                    if (methods) {
                        methods()   // 执行方法
                    }
                    this.$toast({
                        message: '操作成功',
                        iconClass: 'icon-dui'
                    })
                })
                .catch(err => {
                    console.log('操作失败', err)
                    this.$indicator.close()
                    this.$toast({
                        message: '操作失败',
                        iconClass: 'icon-close'
                    })
                })
            })
        }
    }
}
</script>
<style lang='stylus'>
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
                &.text {
                    width: 100%;
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
                margin-top: 0.25rem;
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
        a.draft{
            .item-title{
                width: 100%;
            }
            .icon-more{
                margin-right: 0;
            }
            .unpass-reason{
                margin-top: 8px;
                color: #505050;
                font-size: 14px;
                line-height: 1.4em;
            }
        }
    }
}
</style>
