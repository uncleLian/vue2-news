<template>
    <div class="tags" v-if='tagsData'>
        <router-link v-for='(item,index) in tagsData' :to='`/search?key=${item}`' :key='index'>{{item}}</router-link>
    </div>
</template>
<script>
export default {
    props: ['json'],
    data () {
        return {
            tagsData: ''
        }
    },
    watch: {
        json (val) {
            if (val) {
                this.tagsData = val.match(/[\u4e00-\u9fa5]+/g).slice(0, 4)
            } else {
                this.tagsData = ''
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
.tags {
    width: 100%;
    position: relative;
    a {
        display: inline-block;
        text-align: center;
        color: rgb(102, 102, 102);
        border: 1px solid rgb(238, 238, 238);
        border-radius: 5px;
        font-size: 12px;
        padding: 4px 8px;
        background: #fff;
        margin: 0 0 10px 10px;
    }
}
</style>
