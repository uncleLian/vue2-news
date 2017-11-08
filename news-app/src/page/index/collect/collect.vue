<template>
    <div id="collect" :class="{edit: editBtn}">
        <!-- 头部 -->
        <my-header fixed title='收藏' v-goTop:click='true'>
            <a slot='right' class="edit_btn edit-white"  v-if="collectArticle.length > 0" @click.stop='editBtn = !editBtn'></a>
        </my-header>
        <!-- 正文 -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}" @click.stop="editBtn = false">
            <div class="container" v-swiper:swiperRight='true'>
                <!-- 列表 -->
                <list-item :itemJson='collectArticle' :visible='editBtn' :checkBoxMethod='checkItem'></list-item>
                <!-- 无收藏 -->
                <div class="noData" v-if='!(collectArticle.length > 0)'>
                    <p>沒有文章哦，</p>
                    <p>赶快去收藏吧！</p>
                </div>
                <div class="loadAll" v-if='collectArticle.length > 0'>没有更多了</div>
            </div>
        </div>
        <!-- 删除 -->
        <div class="delete" v-if='editBtn' :class="{ active: checkedArr.length > 0 }">
            <span class="delete_btn" @click.stop='deleteItem'>删除<span>({{checkedArr.length}})</span></span>
        </div>
        <!-- 提示 -->
        <my-loading :visible='loading'></my-loading>
        <my-error fixed :visible='error' :method='getCollectAjax'></my-error>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    name: 'collect',
    data() {
        return {
            checkedArr: [],     // 选中的数组
            first: true,        // 是否第一次进来
            request: false,     // 是否同步了云端
            editBtn: false,     // 编辑按钮
            loading: false,
            error: false,
            localtion: 0
        }
    },
    computed: {
        ...mapGetters('login', [
            'isLogin'
        ]),
        ...mapGetters('detail', [
            'historyArticle'
        ]),
        ...mapGetters('collect', [
            'collectArticle'
        ])
    },
    watch: {
        $route(to, from) {
            // 详情页返回取滚动条位置，其他路由在顶部
            if (from.path.includes('detail')) {
                this.handleLocaltion('get')
            }
        },
        editBtn(val) {
            if (!val) {
                this.checkedArr = []
            }
        }
    },
    methods: {
        ...mapMutations('detail', [
            'set_historyArticle'
        ]),
        ...mapMutations('collect', [
            'set_collectArticle'
        ]),
        ...mapActions('collect', [
            'get_collectArticle_cache',
            'get_collect_data',
            'post_collect_data'
        ]),
        // 获取云端收藏数据
        getCollectAjax() {
            if (!this.request) {
                this.loading = true
                this.get_collect_data()
                .then(res => {
                    if (res) {
                        this.request = true
                        this.set_collectArticle(res)
                    }
                    this.loading = false
                    this.error = false
                })
                .catch(err => {
                    console.log(err)
                    this.loading = false
                    this.error = true
                })
            }
        },
        // 选中列表项
        checkItem(item) {
            let checkBox = $(`#${item.id}`)[0]
            checkBox.checked = !checkBox.checked
            if (checkBox.checked) {
                let obj = {
                    'id': item.id,
                    'datafrom': item.datafrom
                }
                this.checkedArr.push(obj)
            } else {
                let index = this.checkedArr.findIndex(val => val.id === item.id)
                if (index > -1) {
                    this.checkedArr.splice(index, 1)
                }
            }
        },
        // 删除列表项
        deleteItem() {
            this.$msgBox.confirm('确定执行此操作?')
            .then(action => {
                this.post_collect_data(this.checkedArr)
                for (let i = 0; i < this.checkedArr.length; i++) {
                    // 删除收藏数据缓存
                    for (let j = this.collectArticle.length - 1; j >= 0; j--) {
                        if (this.collectArticle[j].id === this.checkedArr[i].id) {
                            this.collectArticle.splice(j, 1)
                        }
                    }
                    // 删除文章收藏标识
                    for (let e = 0; e < this.historyArticle.length; e++) {
                        if (this.historyArticle[e].id === this.checkedArr[i].id) {
                            this.historyArticle[e].collect = ''
                        }
                    }
                }
                this.set_collectArticle(this.collectArticle)
                this.set_historyArticle(this.historyArticle)
                this.editBtn = false
                this.$toast({message: '删除成功', duration: 1500})
            })
            .catch(err => {
                console.log(err)
            })
        },
        handleLocaltion(type) {
            if (type === 'get') {
                if (this.localtion > 0) {
                    $('#collect .container').scrollTop(this.localtion)
                }
            } else if (type === 'set') {
                this.localtion = $('#collect .container').scrollTop()
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 是否登录
            if (vm.isLogin) {
                // 是否同步过数据
                if (vm.request) {
                    vm.get_collectArticle_cache()
                } else {
                    vm.getCollectAjax()
                }
            } else {
                // 是否第一次进入页面
                if (vm.first) {
                    vm.$msgBox.confirm('登录后可以同步用户数据')
                    .then(action => {
                        vm.$router.push('/login')
                    })
                    .catch(err => {
                        console.log(err)
                        vm.get_collectArticle_cache()
                    })
                    vm.first = false
                } else {
                    vm.get_collectArticle_cache()
                }
            }
        })
    },
    deactivated () {
        this.editBtn = false
        this.handleLocaltion('set')
    }
}
</script>
<style lang='stylus'>
#collect {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
    background: #fff;
    &.edit{
        padding-bottom: 88px;
    }
    header {
        .edit_btn {
            font-size: 20px;
            font-weight: bold;
            line-height: 44px;
            &.disable {
                color: #999;
            }
        }
    }
    .content {
        position: relative;
        .container {
            .noData {
                position: absolute;
                left: 0;
                right: 0;
                top: 40%;
                & p {
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    color: #999;
                }
            }
            .loadAll{
                width: 100%;
                text-align: center;
                font-size: 14px;
                height: 50px;
                line-height: 50px;
                color: #999;
            }
        }
    }
    .delete {
        position: fixed;
        bottom: 48px;
        left: 0;
        right: 0;
        z-index: 999;
        height: 40px;
        line-height: 40px;
        background: #f4f5f6;
        text-align: right;
        padding: 0 6px;
        &.active span {
            color: red;
        }
        .delete_btn {
            display: inline-block;
            height: 100%;
            color: #999;
            font-size: 16px;
            text-align: center;
        }
    }
}
</style>
