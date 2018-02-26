<template>
    <div id="recommend" v-if='json'>
        <div class="comment_title">
            <div class="Line">
                <div class="title">相关推荐</div>
            </div>
        </div>
        <list-item :itemJson="json"></list-item>
    </div>
</template>
<script>
export default {
    props: {
        json: Array
    }
}
</script>
<style lang='stylus'>
#recommend {
    width: 100%;
    position: relative;
    padding-top: 0.533rem;
    .comment_title {
        margin-bottom: 15px;
        position: relative;
        .Line {
            position: relative;
            width: 2.8rem;
            margin: 0 auto;
            text-align: center 
            &:before {
                content: "";
                border-top: 2px solid #aaa;
                display: block;
                position: absolute;
                width: 0.4rem;
                top: 50%;
                left: 0
            }
            &:after {
                content: "";
                border-top: 2px solid #aaa;
                display: block;
                position: absolute;
                width: 0.4rem;
                top: 50%;
                right: 0
            }
        }
        .title {
            font-size: 14px;
            font-weight: bold;
        }
    }
}
</style>
