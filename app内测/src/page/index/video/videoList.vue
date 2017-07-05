<template>
    <ul id='listItem'>
        <template v-for='section in videoJson'>
            <li v-if="section.playonlineurl">
                <router-link :to="url(section)" class='video'>
                    <div class="video_wrapper">
                        <div class="video_info">
                            <div class="video_title">
                                <p>{{section.title}}</p>
                            </div>
                            <div class="totalTime">{{section.playtime}}</div>
                            <img v-lazy.container="section.titlepic">
                        </div>
                        <div class="playRound">
                            <div class="playSan"></div>
                        </div>
                    </div>
                    <list-info :infoJson='section'></list-info>
                </router-link>
            </li>
        </template>
    </ul>
</template>
<script>
export default {
    props: ['videoJson'],
    data() {
        return {

        }
    },
    methods: {
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}`
        }
    }
}
</script>
<style scoped lang='stylus'>
</style>
