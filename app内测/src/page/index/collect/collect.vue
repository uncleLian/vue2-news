<template>
    <div id="collect" :class="{edit: editBtn}">
        <my-header fixed title='收藏'>
            <a slot='right' class="edit_btn icon-edit" :class="{disable:!(collectArticle.length > 0)}" @click.stop='editToggle'></a>
        </my-header>
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container" v-infinite-scroll="getCollectAjax" infinite-scroll-disabled="bottomStatus" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                <!-- 列表 -->
                <list-item :itemJson='collectArticle' :visible='editBtn' :checkBoxMethod='checkCollect'></list-item>
                <!-- 无收藏 -->
                <div class="noData" v-if='!(collectArticle.length > 0)'>
                    <p>沒有文章哦，</p>
                    <p>赶快去收藏吧！</p>
                </div>
                <!-- 错误 -->
                <error :visible='error' :method='getCollectAjax'></error>
            </div>
        </div>
        <div class="delete" v-if='editBtn' :class="{ active: checkedArr.length > 0 }">
            <span class="delete_btn" @click.stop='deleteCollect'>删除<span>({{checkedArr.length}})</span></span>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
    name: 'collect',
    data() {
        return {
            request: false,
            editBtn: false,
            error: false,
            bottomLock: false
        }
    },
    computed: {
        ...mapGetters('collect', [
            'collectArticle',
            'checkedArr'
        ]),
        ...mapGetters('login', [
            'login'
        ])
    },
    watch: {
        editBtn(val) {
            if (!val) {
                this.set_checkedArr([])
            }
        }
    },
    methods: {
        ...mapMutations('collect', [
            'set_collectArticle',
            'set_checkedArr'
        ]),
        ...mapActions('collect', [
            'get_collect_cache',
            'get_collect_data',
            'del_collect_data'
        ]),
        getCollectAjax() {
            if (!this.request) {
                this.get_collect_data()
                .then(res => {
                    if (res) {
                        this.request = true
                        this.set_collectArticle(res)
                    }
                    this.error = false
                })
                .catch(err => {
                    console.log(err)
                    this.error = true
                })
            }
        },
        editToggle() {
            if (this.collectArticle.length !== 0) {
                this.editBtn = !this.editBtn
            }
        },
        checkCollect(item) {
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
            this.set_checkedArr(this.checkedArr)
        },
        deleteCollect() {
            MessageBox.confirm('确定执行此操作?')
            .then(action => {
                this.del_collect_data()
                for (let i = 0; i < this.checkedArr.length; i++) {
                    for (let j = this.collectArticle.length - 1; j >= 0; j--) {
                        if (this.collectArticle[j].id === this.checkedArr[i].id) {
                            this.collectArticle.splice(j, 1)
                        }
                    }
                }
                console.log(this.checkedArr)
                this.set_collectArticle(this.collectArticle)
                this.editBtn = false
                this.set_checkedArr([])
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.login) {
                vm.getCollectAjax()
            } else {
                MessageBox.confirm('登录可以同步云端数据')
                .then(action => {
                    vm.$router.push('/login')
                })
                .catch(err => {
                    console.log(err)
                    vm.get_collect_cache()
                })
            }
        })
    },
    deactivated() {
        this.editBtn = false
    }
}
</script>
<style scoped lang='stylus'>
#collect.edit {
    padding-bottom: 88px;
}
#collect {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
    background: #fff;
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
        width: 100%;
        height: 100%;
        padding-top: 44px;
        position: relative;
        &.isIOS {
            padding-top: 64px;
        }
        .container {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            position: relative;
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
        background: #f8f8f8;
        text-align: right;
        padding: 0 6px;
        &.active span {
            color: red;
        }
        .delete_btn {
            display: inline-block;
            width: 60px;
            height: 100%;
            color: #999;
            font-size: 16px;
            text-align: center;
        }
    }
}

#listItem li a:visited h3 {
    color: #131313!important;
}
</style>
