<template>
    <transition name='fadeIn'>
        <div id='publish'>
            <!-- 头部 -->
            <my-header fixed :title='userInfo.nickname' v-goTop:click='true'>
                <a slot="left" class="back-black" @click.stop.prevent='$router.go(-1)'></a>
            </my-header>
            <!-- content -->
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <!-- 标题 -->
                    <div class="title edit-cell">
                        <div class="edit-main">
                            <label class="edit-label" for="title">标题5-30字</label>
                            <div class="edit-input">
                                <input id="title" type='text' v-model.trim="title">
                            </div>
                        </div>
                    </div>
                    <!-- 正文 -->
                    <div class="text edit-cell">
                        <div class="edit-main">
                            <label class="edit-label" for="title">正文</label>
                            <div class="edit-input">
                                <quill-editor v-model.trim="content" ref="myQuillEditor" :options="editorOption"/>
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
                        <!-- 修改 -->
                        <template v-if="$route.query.id">
                            <mt-button class='publish_btn' type='danger' @click.stop="verify('edit','3',true)">发表</mt-button>
                            <mt-button class='draft_btn' type='danger' @click.stop="verify('edit',json.state)">保存</mt-button>
                        </template>
                        <!-- 默认 -->
                        <template v-else>
                            <mt-button class='publish_btn' type='danger' @click.stop="verify('new','3',true)">发表</mt-button>
                            <mt-button class='draft_btn' @click.stop="verify('new','2',true)">存草稿</mt-button>
                        </template>
                        <mt-button class='cancle_btn' @click.stop="openPreview">预览</mt-button>
                        <mt-button class='cancle_btn' @click.stop="$router.go(-1)">取消</mt-button>
                    </div>
                </div>
            </div>

            <!-- 子页面视图 -->
            <router-view></router-view>
        </div>
    </transition>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import myPreview from './preview'
export default {
    name: 'publish',
    components: { myPreview },
    data() {
        return {
            title: '',              // 标题
            content: '',            // 正文
            classid: '',            // 标签
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
            contentImages: [],      // 正文图片
            coverImages: [],        // 封面图片
            editorOption: {         // 富文本编辑器配置
                modules: {
                    toolbar: [ { 'list': 'ordered' }, { 'list': 'bullet' }, 'image' ],
                    history: {
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                },
                placeholder: ' ',
                imageHandler: this.imageHandler     // 自定义图片处理
            },
            json: null,     // 修改获取的数据
            ajax: false,
            edit: false
        }
    },
    computed: {
        ...mapGetters('user', [
            'userInfo'
        ]),
        // 富文本对象
        editor() {
            return this.$refs.myQuillEditor.quill
        },
        // 全部内容
        isChange() {
            return this.title + this.content + this.classid
        }
    },
    watch: {
        // 是否改变了内容
        isChange(val, old) {
            this.edit = true
            // 如果是请求数据导致发生改变，则忽略
            if (this.ajax) {
                this.edit = false
                this.ajax = false
            }
        }
    },
    methods: {
        ...mapActions('health', [
            'get_article_data',
            'post_article_data'
        ]),
        // 初始化
        init() {
            let id = this.$route.query.id
            if (id) {
                this.get_article_data(id)
                .then(res => {
                    if (res.data) {
                        this.json = res.data
                        this.title = this.json.title
                        this.content = this.json.newstext
                        this.classid = this.json.classid
                    }
                    this.ajax = true
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        // 上传图片处理
        imageHandler(image, callback) {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.click()
            input.onchange = () => {
                const file = input.files[0]
                if (/^image\//.test(file.type)) {
                    let fd = new FormData()
                    fd.append('file', file)
                    this.upLoadToServer(fd) // 上传图片
                } else {
                    this.$toast('只能上传图片')
                    console.warn('上传格图片式错误')
                }
            }
        },
        // 上传图片到服务器
        upLoadToServer(params) {
            axios.post('http://api.toutiaojk.com/e/extend/jkh/upload_file.php', params, {
                headers: {'Content-Type': 'multipart/form-data'},
                responseType: 'json'
            })
            .then(res => {
                let data = res.data.data
                if (data) {
                    // 图片地址插入富文本编辑器
                    const range = this.editor.getSelection()
                    this.editor.insertEmbed(range.index, 'image', data)
                }
            })
            .catch(err => {
                console.log(err)
                this.$toast({
                    message: '操作失败',
                    iconClass: 'icon-close'
                })
            })
        },
        // 发表
        publish(type, state, goback) {
            this.title = this.title.replace(/\s/gi, '')
            let params = {
                'type': type,
                'state': state,
                'title': this.title,
                'newstext': this.content,
                'classid': this.classid
            }
            // 获取正文图片作为列表封面图
            if (this.coverImages[0]) {
                params.titlepic = this.coverImages[0].src
            }
            if (this.coverImages.length >= 3) {
                params.titlepic2 = this.coverImages[1].src
                params.titlepic3 = this.coverImages[2].src
            }
            if (this.json) {
                params.id = this.json.id
            }
            this.$indicator.open()
            this.post_article_data(params)
                .then(res => {
                    this.$indicator.close()
                    if (res && res.data) {
                        this.edit = false
                        this.$toast({
                            message: '操作成功',
                            iconClass: 'icon-dui'
                        })
                        if (goback) {
                            this.$router.push('/index/user/health')
                        }
                    } else {
                        this.$toast({
                            message: '操作失败',
                            iconClass: 'icon-close'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$indicator.close()
                    this.$toast({
                            message: '操作失败',
                            iconClass: 'icon-close'
                        })
                })
        },
        // 验证
        verify(type, state, goback) {
            // 回去正文所有图片
            this.coverImages = this.editor.container.querySelectorAll('img')
            if (state === '3') {
                if (this.allRule()) {
                    this.$msgBox.confirm('确定执行此操作?')
                    .then(() => {
                        this.publish(type, state, goback)
                    })
                }
            } else if (state === '2') {
                if (this.onlyTitleRule()) {
                    this.publish(type, state, goback)
                }
            }
        },
        // 所有规则
        allRule() {
            if (!this.title) {
                this.$toast('标题不能为空')
            } else if (this.title.length < 5) {
                this.$toast('标题长度不能低于5个字')
            } else if (this.title.length > 30) {
                this.$toast('标题长度不能超过30个字')
            } else if (!this.content) {
                this.$toast('正文不能为空')
            } else if (!this.coverImages.length > 0) {
                this.$toast('正文不能没有图片')
            } else if (!this.classid) {
                this.$toast('标签不能为空')
            } else {
                return true
            }
        },
        // 只有title规则
        onlyTitleRule() {
            if (!this.title) {
                this.$toast('标题不能为空')
            } else {
                return true
            }
        },
        // 预览文章
        openPreview() {
            if (this.onlyTitleRule()) {
                // 时间处理
                let d = new Date()
                const Year = d.getFullYear()
                const Month = d.getMonth() + 1
                const Day = d.getDate()
                const nowTime = `${Year}-${Month}-${Day}`
                let previewJson = {
                    title: this.title,
                    newstext: this.content,
                    classid: this.classid,
                    newstime: nowTime,
                    befrom: this.userInfo.nickname
                }
                this.$router.push({ name: 'preview', params: {json: previewJson} })
            }
        }
    },
    created() {
        this.init()
    },
    mounted() {
        // 加载自定义图片处理方法
        this.editor.getModule('toolbar').addHandler('image', this.imageHandler)
    },
    beforeRouteLeave (to, from, next) {
        if (this.edit) {
            this.$msgBox.confirm('离开将不会保留修改内容，是否确定？')
            .then(() => {
                next()
            })
            .catch(err => {
                console.log(err)
                next(false)
            })
        } else {
            next()
        }
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
                background: none;
                .mint-cell-wrapper {
                    font-size: 13px;
                    background: none;
                    padding: 0 0.55rem 0 0;
                    border: none;
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
