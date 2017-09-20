<template>
    <transition name='fadeIn'>
        <div id="preview">
            <my-article :json='currentArticle'></my-article>
        </div>
    </transition>
</template>
<script>
import myArticle from '@/page/detail/components/article'
export default {
    name: 'preview',
    components: { myArticle },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

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
}
</style>
