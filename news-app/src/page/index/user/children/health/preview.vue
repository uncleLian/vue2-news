<template>
    <transition name='fadeIn'>
        <div id="preview">
            <!-- 头部 -->
            <my-header fixed :title='userInfo.nickname' v-goTop:click='true'>
                <a slot="left" class="close-black" @click.stop='$router.go(-1)'></a>
            </my-header>
            <!-- 正文 -->
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <!-- article组件 -->
                    <my-article :json='json'></my-article>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import myArticle from '@/page/detail/components/article'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'preview',
    components: { myArticle },
    data() {
        return {
            id: this.$route.query.id,
            json: this.$route.params.json
        }
    },
    computed: {
        ...mapGetters('user', [
            'userInfo'
        ])
    },
    methods: {
        ...mapActions('health', [
            'get_article_data'
        ]),
        get_article() {
            this.get_article_data(this.id)
            .then(res => {
                if (res.data) {
                    this.json = res.data
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.get_article()
    }
}
</script>
<style lang='stylus'>
#preview {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1001;
    background: #fff;
    .container{
        padding: 0;
    }
}
</style>
