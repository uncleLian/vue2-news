<template>
    <transition name='fadeIn'>
        <div id="userguide">
            <div class="myheader">
                <!--<div class="iosHeader"></div>-->
                <my-header fixed title='版本介绍'>
                    <a class="back" slot='left' @click='$router.go(-1)'></a>
                </my-header>
            </div>
            <div id="content">
                1111111
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
        }
    }
}
</script>
<style scope lang='stylus'>
#userguide {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    #content {
        height: 100%;
        background: #ddd;
    }
}
</style>
