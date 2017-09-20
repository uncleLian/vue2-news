<template>
    <div id='publish' v-loading="loading" element-loading-text="发表中...">

        <div class="write">
            <!-- title -->
            <div class="title">
                <input type='text' placeholder="标题 (5-30个字符)" v-model="title">
                <div class="title_count"><span :class="{'error': title.length > 30}">{{title.length}}</span> / 30</div>
            </div>
            <!-- content -->
            <div class="body">
                <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
                    <div id="toolbar" slot="toolbar">
                        <div class="ql-formats">
                            <button class="ql-header" value="1" title="H1标题"></button>
                            <button class="ql-bold" title="加粗"></button>
                            <button class="ql-blockquote" title="引用"></button>
                            <button class="ql-list" value='ordered' title="有序列表"></button>
                            <button class="ql-list" value="bullet" title="无序列表"></button>
                        </div>
                        <div class='ql-formats'>
                            <el-button icon="picture" class="picLib_btn" title="插入图片" @click.stop="upload_picture_dialog = true"></el-button>
                            <button class="ql-link" title="文章链接"></button>
                            <button class="ql-video" title="插入视频"></button>
                        </div>
                        <div class="ql-formats">
                            <button class="ql-clean" title="清除格式"></button>
                            <button class="undo" title="撤销" @click.stop="editor.history.undo()"></button>
                            <button class="redo" title="重做" @click.stop="editor.history.redo()"></button>
                        </div>
                    </div>
                </quill-editor>
            </div>
        </div>

        <!-- edit -->
        <div class="edit">
            <div class="cover edit-cell">
                <div class="edit-label">封面</div>
                <div class="edit-input">
                    <div class="select_radio">
                        <el-radio-group v-model="cover_mode">
                            <el-radio :label="1">单图</el-radio>
                            <el-radio :label="3">三图</el-radio>
                        </el-radio-group>
                    </div>
                    <!-- 单图 -->
                    <div class="cover_images"> 
                        <template v-for="(item,index) in cover_mode">
                            <div class="cover_img" v-if="coverImages[index]" @click="selectPictureOpen(index)">
                                <img :src="coverImages[index]">
                            </div>
                            <div class="cover_add" v-else @click="selectPictureOpen(index)">
                                <i class="el-icon-plus"></i>
                            </div>
                        </template>
                    </div>

                    <!-- 提示 -->
                    <div class="cover_tip">优质的封面有利于推荐，请使用清晰度较高的图片，避免使用GIF、带大量文字的图片。</div>
                </div>
            </div>
            <div class="label edit-cell">
                <div class="edit-label">标签</div>
                <div class="edit-input">
                    <el-radio-group v-model="classid">
                        <el-radio-button label="2">女性</el-radio-button>
                        <el-radio-button label="3">育儿</el-radio-button>
                        <el-radio-button label="4">中医</el-radio-button>
                        <el-radio-button label="5">本地</el-radio-button>
                        <el-radio-button label="6">政策</el-radio-button>
                        <el-radio-button label="7">产业</el-radio-button>
                        <el-radio-button label="8">旅游</el-radio-button>
                        <el-radio-button label="20">其他</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>

        <!-- control -->
        <div class="control">
            <template v-if="id">
                <el-button class='publish_btn' type='danger' size='large' @click.stop="verify('edit')">发表</el-button>
            </template>
            <template v-else>
                <el-button class='publish_btn' type='danger' size='large' @click.stop="verify('new')">发表</el-button>
                <el-button class='draft_btn' type='danger' size='large' @click.stop="verify('draft')">存草稿</el-button>
            </template>    
            <el-button class='cancle_btn' type='danger' size='large' @click="$router.go(-1)">取消</el-button>
        </div>

        <!-- 上传图片 -->
        <el-dialog class="pictrue_upload" title="上传图片" :visible.sync="upload_picture_dialog"> 
            <el-upload class="upload" ref="upload" action="http://api.toutiaojk.com/e/extend/jkh/upload_file.php" list-type="picture-card" :multiple="true" :before-upload="handleFormat" :on-preview="onPreview" :on-success="onSuccess" :on-error="onError" :on-remove="onRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog class="picture_preview" v-model="preView_dialog" size="tiny" :modal="false">
                <img width="100%" :src="dialogImageUrl">
            </el-dialog>
            <div slot="footer">
                <el-button class="cancle_btn" @click.stop="clearUploadFiles">取 消</el-button>
                <el-button type="danger" @click="uploadComplete">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 选择图片 -->
        <el-dialog class="picture_select" title="正文图片" :visible.sync="select_picture_dialog">
            <!-- 单选 -->
            <el-radio-group v-model="selectImages">
                <div class="img-item" v-for="(item,index) in contentImages">
                    <el-radio-button :label="item.src"><img :src="item.src"></el-radio-button>
                </div>
            </el-radio-group>
            <div slot="footer">
                <el-button class="cancle_btn" @click.stop="clearSelectFiles">取 消</el-button>
                <el-button type="danger" @click="selectComplete">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            id: null,
            title: '',  // 标题
            content: '', // 正文
            fileList: [], // 上传的图片数组
            classid: '',    // 标签
            cover_mode: 1,  // 封面模式：单图 / 三图
            contentImages: [], // 正文图片
            clickIndex: '',
            selectImages: [], // 选择图片
            coverImages: [], // 封面图片
            upload_picture_dialog: false,  // 上传图片dialog
            select_picture_dialog: false,   // 选中图片dialog
            preView_dialog: false, // 图片预览
            dialogImageUrl: '', // 预览图片地址
            editorOption: { // 富文本编辑器配置
                modules: {
                    toolbar: '#toolbar',
                    history: {
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                }
            },
            loading: false
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        ...mapActions('health, '[
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
                        if (item.titlepic3) {
                            this.cover_mode = 3
                            this.coverImages[1] = item.titlepic2
                            this.coverImages[2] = item.titlepic3
                        }
                        if (item.titlepic) {
                            this.coverImages[0] = item.titlepic
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        // 上传图片前检查格式、大小
        handleFormat(file) {
            const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isImg) {
                this.$message.error('目前只支持 jpg / png / gif 的图片格式')
            } else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB')
            }
            return isImg && isLt2M
        },
        // 点击上传的图片时的钩子
        onPreview(file) {
            this.dialogImageUrl = file.url
            this.preView_dialog = true
        },
        // 上传成功钩子
        onSuccess(response, file, fileList) {
            this.fileList = fileList
        },
        // 上传失败钩子
        onError(err, file, fileList) {
            console.log('上传图片失败', err)
            this.$message.error('上传失败，请重新尝试!')
        },
        // 移除钩子
        onRemove(file, fileList) {
            this.fileList = fileList
        },
        // 清除上传的图片
        clearUploadFiles() {
            this.fileList = []
            this.$refs.upload.clearFiles()
            this.upload_picture_dialog = false
        },
        // 上传完成，把图片添加进正文
        uploadComplete() {
            this.editor.focus()
            for (let i = 0; i < this.fileList.length; i++) {
                if (!this.fileList[i].response) {
                    this.$message.warning('还有图片没有上传成功，请重新尝试')
                } else {
                    this.editor.insertEmbed(this.editor.getSelection().index + i, 'image', this.fileList[i].response.data)
                }
            }
            this.clearUploadFiles()
        },
        selectPictureOpen(index) {
            this.clickIndex = index
            this.contentImages = this.editor.container.querySelectorAll('img')
            this.select_picture_dialog = true
        },
        clearSelectFiles() {
            this.select_picture_dialog = false
            this.selectImages = []
        },
        selectComplete() {
            if (this.selectImages.length > 0) {
                this.coverImages[this.clickIndex] = this.selectImages
            }
            this.clearSelectFiles()
        },
        publish(state, type = 'new') {
            this.loading = true
            let params = {
                'type': type,
                'title': this.title,
                'newstext': this.content,
                'titlepic': this.coverImages[0],
                'classid': this.classid,
                'state': state
            }
            if (this.id) {
                params.id = this.id
            }
            if (this.cover_mode === 3) {
                params.titlepic2 = this.coverImages[1]
                params.titlepic3 = this.coverImages[2]
            }
            this.post_article_data(params)
                .then(res => {
                    this.loading = false
                    if (res.code === 1 && res.data) {
                        this.$notify.success('操作成功')
                        this.$router.push('/index/article/own')
                    } else {
                        this.$notify.error('出现错误，请重新尝试')
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                    this.$notify.error('出现错误，请重新尝试')
                })
        },
        verify(type) {
            // 草稿
            if (type === 'draft') {
                if (!this.title) {
                    this.$message.error('标题不能为空')
                } else {
                    this.publish(2)
                }
            } else {
                if (!this.title) {
                    this.$message.error('标题不能为空')
                } else if (this.title.length < 5) {
                    this.$message.error('标题长度不能低于5个字')
                } else if (this.title.length > 30) {
                    this.$message.error('标题长度不能超过30个字')
                } else if (!this.content) {
                    this.$message.error('正文不能为空')
                } else if (!this.coverImages.length > 0) {
                    this.$message.error('封面图片不能为空')
                } else if (this.cover_mode === 3 && this.coverImages.length < 3) {
                    this.$message.error('封面图片不能少于3张')
                } else if (!this.classid) {
                    this.$message.error('标签不能为空')
                } else {
                    this.$confirm('确定发表文章？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        // 发表
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
    padding: 20px 24px;
    .write {
        position: relative;
        border: 1px solid #e9e9e9;
        margin-bottom: 50px;
        .title {
            position: relative;
            width: 100%;
            height: 58px;
            line-height: 58px;
            input {
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                color: #595959;
                font-size: 20px;
                padding-left: 20px;
                padding-right: 80px;
            }
            .title_count {
                position: absolute;
                width: 80px;
                height: 100%;
                top: 0;
                right: 0;
                color: #999;
                font-size: 14px;
                padding: 0 10px;
                text-align: right;
                .error {
                    color: #ff4949;
                }
            }
        }
        .body {
            width: 100%;
            .quill-editor {
                .ql-toolbar.ql-snow {
                    border: none;
                    background: #eee;
                }
                .ql-toolbar {
                    border-bottom: 1px solid #e9e9e9 !important;
                }
                .ql-container {
                    height: 600px;
                    font-size: 16px;
                    color: #5D5D5D;
                    border: none;
                }
                .ql-formats {
                    padding-right: 20px;
                    border-right: 1px solid #D8D8D8;
                    button {
                        width: 30px;
                        height: 26px;
                    }
                    .picLib_btn i {
                        font-size: 16px;
                    }
                }
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
    .edit {
        margin-bottom: 40px;
        .edit-cell {
            width: 100%;
            margin-bottom: 30px;
        }
        .edit-label {
            float: left;
            width: 122px;
            font-size: 16px;
        }
        .edit-input {
            margin-left: 122px;
            font-size: 14px;
            color: #999;
        }
        .el-radio {
            color: #999;
        }
        .el-radio__label {
            padding-left: 10px;
        }
        .cover {
            .select_radio {
                margin-bottom: 16px;
            }
            .cover_images{
                .cover_add,.cover_img{
                    position: relative;
                    width: 150px;
                    height: 105px;
                    margin-right: 20px;
                    display: inline-block;
                    cursor: pointer;
                    border-radius: 4px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        min-height: 105px;
                    }
                }
                .cover_add{
                    position: relative;
                    width: 150px;
                    height: 105px;
                    margin-right: 20px;
                    display: inline-block;
                    cursor: pointer;
                    border-radius: 4px;
                    overflow: hidden;
                    background-color: #f0f1f3;
                    i{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        font-size: 20px;
                        margin-left: -.5em;
                        margin-top: -.5em;
                    }
                }
            }
            .cover_tip {
                padding-top: 10px;
            }
        }
    }
    .control {
        padding-left: 122px;
        margin-bottom: 50px;
        button{
            font-size: 16px;
            width: 140px;
            line-height: 1;
        }
        .draft_btn,.cancle_btn{
            background-color: #f1f1f1;
            color: #a4a4a4;
            border-color: #f1f1f1;
        }
        .draft_btn:hover,.cancle_btn:hover{
            background-color: #e4e4e4;
            color: #989898;
            border-color: #e4e4e4;
        }
    }
    .pictrue_upload {
        .upload {
            width: 100%;
            .el-upload-list__item-thumbnail{
                width: auto;
                height: auto;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                max-width: 100%;
                max-height: 100%;
                margin: auto;
                user-select: none;
            }
        }
    }
    .picture_preview{
        .el-dialog__body{
            min-height: 0;
        }
    }
    .picture_select{
        .el-dialog__body{
            padding: 20px 10px;
        }
        .img-item{
            width: 150px;
            height: 120px;
            position: relative;
            display: inline-block;
            border: 1px solid #e8e8e8;
            margin: 10px;
            cursor: pointer;
            label{
                width: 100%;
                height: 100%
                &.is-active:before,&.is-checked:before{
                    content: "";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    background-color: rgba(0,0,0,.5);
                    background-image: url(../../../../assets/img/checked.png);
                    background-position: 100% 0;
                    background-repeat: no-repeat;
                    text-align: center;
                    color: #fffacd;
                }
                &.is-active:after,&.is-checked:after{
                    content: '';
                    /*content: attr(data-sort);*/
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -moz-transform: translate(-50%,-50%);
                    -ms-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
                    -webkit-transform: translate(-50%,-50%);
                    z-index: 2;
                    font-size: 30px;
                    color: #fffacd;
                }
            }
            span{
                width: 100%;
                height: 100%;
                padding: 0;
                border: none;
                background-color: #fff;
            }
            img {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                max-width: 100%;
                max-height: 100%;
                margin: auto;
                user-select: none;
            }
        }
    }
}
#publish {
    .cancle_btn{
        background-color: #f1f1f1;
        color: #a4a4a4;
        border-color: #f1f1f1;
    }
    .cancle_btn:hover{
        background-color: #e4e4e4;
        color: #989898;
        border-color: #e4e4e4;
    }
    .el-dialog.el-dialog--small{
        min-height: 400px;
        .el-dialog__title{
            color: #f85959;
            font-weight: 400;
        }
        .el-dialog__body{
            max-height: 380px;
            margin-bottom: 80px;
            overflow-y: auto;
        }
        .el-dialog__footer{
            position: absolute;
            width: 100%;
            bottom: 10px;
            text-align: center;
        }
    }
    .el-dialog.el-dialog--tiny{
        .el-dialog__body{
            max-height: 250px;
            margin-bottom: 0;        
        }
    }
}
</style>
<style>
#publish .undo {
    background: url(~@/assets/icon/laststep.png)no-repeat center center;
}

#publish .undo.nothing {
    opacity: 0.3;
}

#publish .redo {
    background: url(~@/assets/icon/nextstep.png)no-repeat center center;
}

#publish .redo.nothing {
    opacity: 0.3;
}
</style>