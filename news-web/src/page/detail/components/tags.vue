<template>
    <div class="tags" v-if='tagsData'>
        <router-link v-for='(item,index) in tagsData' :to='`/search?key=${item}`' :key='index'>{{item}}</router-link>
    </div>
</template>
<script>
export default {
    name: 'tags',
    props: ['tagsJson'],
    data() {
        return {
            tagsData: '',
        }
    },
    watch: {
        tagsJson(val) {
            if(val){
                this.tagsData = val.match(/[\u4e00-\u9fa5]+/g).slice(0, 4);
            }
        }
    },
}
</script>
<style lang='stylus' scoped>
.tags {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}

.tags a {
    display: inline-block;
    text-align: center;
    color: rgb(102, 102, 102);
    border: 1px solid rgb(238, 238, 238);
    border-radius: 5px;
    font-size: 12px;
    padding: 4px 8px;
    background: #f8f8f8;
    margin: 0 0 10px 10px;
}

[data-dpr="2"] .tags {
    margin-top: 20px;
    margin-bottom: 20px;
}

[data-dpr="3"] .tags {
    margin-top: 30px;
    margin-bottom: 30px;
}

[data-dpr="2"] .tags a {
    border: 2px solid rgb(238, 238, 238);
    border-radius: 10px;
    font-size: 24px;
    padding: 8px 16px;
    margin: 0 0 20px 20px;
}

[data-dpr="3"] .tags a {
    border: 3px solid rgb(238, 238, 238);
    border-radius: 15px;
    font-size: 36px;
    padding: 12px 24px;
    margin: 0 0 30px 30px;
}
</style>
