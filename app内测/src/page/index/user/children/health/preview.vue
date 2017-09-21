<template>
    <transition name='fadeIn'>
        <div id="preview">
            <my-header fixed :title='$store.state.login.wx.nickname' v-goTop:click='true'>
                <a slot="left" class="close-black" @click.stop='$router.go(-1)'></a>
            </my-header>
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <my-article :json='json'></my-article>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import myArticle from '@/page/detail/components/article'
import { mapActions } from 'vuex'
export default {
    name: 'preview',
    components: { myArticle },
    data() {
        return {
            id: this.$route.query.id,
            json: this.$route.query.json
        }
    },
    methods: {
        ...mapActions('health', [
            'get_article_data'
        ])
    },
    created() {
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
}
</script>
<style scoped lang='stylus'>
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
