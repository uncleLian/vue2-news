<template>
    <div class="tags">
        <router-link v-for='(item,index) in tagsArr' :to='`/search?key=${item}`' :key='index'>{{item}}</router-link>
    </div>
</template>
<script>
export default {
    props: ['json'],
    computed: {
        tagsArr() {
            return this.json.match(/[\u4e00-\u9fa5]+/g).slice(0, 4)
        }
    }
}
</script>
<style scoped lang='stylus'>
.tags {
    width: 100%;
    position: relative;
    padding-bottom: 0.4rem;
    a {
        display: inline-block;
        text-align: center;
        color: rgb(102, 102, 102);
        border: 1px solid rgb(238, 238, 238);
        border-radius: 5px;
        font-size: 12px;
        padding: 0.107rem 0.214rem;
        background: #fff;
        margin: 0 0 10px 10px;
    }
}
</style>
