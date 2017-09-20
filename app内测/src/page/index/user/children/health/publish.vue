<template>
    <transition name='fadeIn'>
        <div id='publish'>
            <my-header fixed :title='$store.state.login.wx.nickname' v-goTop:click='true'>
                <a slot="left" class="back-black" @click='$router.go(-1)'></a>
            </my-header>
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <!-- 标题 -->
                    <div class="title edit-cell">
                        <div class="edit-main">
                            <label class="edit-label" for="title">标题5-30字</label>
                            <div class="edit-input">
                                <input id="title" type='text' v-model="title">
                            </div>
                        </div>
                    </div>
                    <!-- 正文 -->
                    <div class="text edit-cell">
                        <div class="edit-main">
                            <label class="edit-label" for="title">正文</label>
                            <div class="edit-input">
                                <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" />
                            </div>
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="label edit-cell">
                        <div class="edit-label">标签</div>
                        <div class="edit-input">
                            <mt-radio v-model="classid" :options="labelOptions"></mt-radio>
                        </div>
                    </div>
                    <!-- 按钮 -->
                    <div class="control">
                        <template v-if="id">
                            <mt-button class='publish_btn' type='danger' @click="verify('edit')">发表</mt-button>
                        </template>
                        <template v-else>
                            <mt-button class='publish_btn' type='danger' @click="verify('new')">发表</mt-button>
                            <mt-button class='draft_btn' type='danger' @click="verify('draft')">存草稿</mt-button>
                        </template>
                        <mt-button class='cancle_btn' type='danger' @click="$router.push('publish/preview')">预览</mt-button>
                        <mt-button class='cancle_btn' type='danger' @click="$router.go(-1)">取消</mt-button>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { mapActions } from 'vuex'
export default {
    name: 'publish',
    data() {
        return {
            id: null,
            title: '', // 标题
            content: '', // 正文
            classid: '', // 标签
            labelOptions: [
                {
                    label: '女性',
                    value: '1'
                },
                {
                    label: '育儿',
                    value: '2'
                },
                {
                    label: '中医',
                    value: '3'
                },
                {
                    label: '本地',
                    value: '4'
                },
                {
                    label: '政策',
                    value: '5'
                },
                {
                    label: '产业',
                    value: '6'
                },
                {
                    label: '旅游',
                    value: '7'
                },
                {
                    label: '其他',
                    value: '0'
                }
            ],
            contentImages: [], // 正文图片
            coverImages: [], // 封面图片
            editorOption: { // 富文本编辑器配置
                modules: {
                    toolbar: [ { 'list': 'ordered' }, { 'list': 'bullet' }, 'image' ],
                    history: {
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                }
            }
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        ...mapActions('health', [
            'get_article_data',
            'post_article_data'
        ]),
        init() {
            this.id = this.$route.query.id
            if (this.id) {
                this.get_article_data(this.id)
                .then(res => {
                    if (res.data) {
                        let item = res.data
                        this.title = item.title
                        this.content = item.newstext
                        this.classid = item.classid
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        publish(state, type = 'new') {
            let params = {
                'type': type,
                'title': this.title,
                'newstext': this.content,
                'classid': this.classid,
                'state': state
            }
            if (this.id) {
                params.id = this.id
            }
            if (this.coverImages[0]) {
                params.titlepic = this.coverImages[0].src
            }
            if (this.coverImages.length >= 3) {
                params.titlepic2 = this.coverImages[1].src
                params.titlepic3 = this.coverImages[2].src
            }
            Indicator.open()
            this.post_article_data(params)
                .then(res => {
                    Indicator.close()
                    if (res && res.data) {
                        Toast({
                            message: '操作成功',
                            iconClass: 'icon icon-success'
                        })
                        this.$router.push('health')
                    } else {
                        Toast({
                            message: '操作失败',
                            iconClass: 'icon icon-error'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    Indicator.close()
                    Toast({
                            message: '操作失败',
                            iconClass: 'icon icon-error'
                        })
                })
        },
        verify(type) {
            this.coverImages = this.editor.container.querySelectorAll('img')
            console.log(this.coverImages)
            // 草稿
            if (type === 'draft') {
                if (!this.title) {
                    Toast('标题不能为空')
                } else {
                    this.publish(2)
                }
            } else {
                if (!this.title) {
                    Toast('标题不能为空')
                } else if (this.title.length < 5) {
                    Toast('标题长度不能低于5个字')
                } else if (this.title.length > 30) {
                    Toast('标题长度不能超过30个字')
                } else if (!this.content) {
                    Toast('正文不能为空')
                } else if (!this.coverImages.length > 0) {
                    Toast('正文不能没有图片')
                } else if (!this.classid) {
                    Toast('标签不能为空')
                } else {
                    MessageBox.confirm('确定执行此操作?')
                    .then(() => {
                        if (type === 'new') {
                            this.publish(3)
                        } else if (type === 'edit') {
                            this.publish(3, 'edit')
                        }
                    })
                }
            }
        }
    },
    created() {
        this.init()
    }
}
</script>
<style lang='stylus'>
#publish {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1000;
    background-color: #fff;
    header {
        background-color: #fff;
        color: #222;
        border-bottom: 1px solid #e0e0e0;
        box-shadow: 0 1px 2px #e8e8e8;
    }
    .container {
        padding: 20px 16px 40px;
        .edit-cell {
            margin-bottom: 15px;
            .edit-label {
                display: block;
                font-size: 14px;
                color: #999;
                margin-bottom: 5px;
            }
        }
        .title {
            position: relative;
            input {
                display: block;
                width: 100%;
                height: 40px;
                padding: 12px;
                font-size: 14px;
                line-height: 1em;
                color: #666;
                vertical-align: middle;
                background-color: #fff;
                background-image: none;
                border: 1px solid #e9e9e9;
                border-radius: 4px;
                box-sizing: border-box;
            }
        }
        .text {
            .quill-editor {
                border: 1px solid #EEE;
                border-radius: 4px;
                overflow: hidden;
                .ql-toolbar {
                    border-bottom: 1px solid #e9e9e9 !important;
                    &.ql-snow {
                        border: none;
                        background: #eee;
                    }
                }
                .ql-container {
                    height: 320px;
                    font-size: 16px;
                    color: #5D5D5D;
                    border: none;
                    .ql-editor {
                        padding: 12px 10px;
                        h1 {
                            position: relative;
                            font-size: 18px;
                            line-height: 24px;
                            font-weight: 700;
                            padding-left: 12px;
                            &:after {
                                content: "";
                                width: 4px;
                                height: 18px;
                                background: #f85959;
                                top: 3px;
                                position: absolute;
                                left: 0;
                            }
                        }
                        img {
                            display: block;
                            margin: 0 auto;
                            margin-bottom: 1em;
                        }
                    }
                }
            }
        }
        .label {
            .mint-cell {
                display: inline-block;
                border: none;
                .mint-cell-wrapper {
                    font-size: 13px;
                    background: none;
                    padding: 0 0.55rem 0 0;
                }
                .mint-radiolist-label {
                    padding: 0;
                }
            }
            .mint-cell:hover {
                text-decoration: none;
            }
        }
        .control {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            button {
                width: 20%;
                padding: 0;
                height: 26px;
                font-size: 14px;
            }
            .draft_btn,
            .cancle_btn {
                background-color: #f1f1f1;
                color: #a4a4a4;
                border-color: #f1f1f1;
            }
            .draft_btn:hover,
            .cancle_btn:hover {
                background-color: #e4e4e4;
                color: #989898;
                border-color: #e4e4e4;
            }
        }
    }
}
</style>
