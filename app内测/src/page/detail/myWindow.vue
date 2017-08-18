<template>
    <transition name='fadeIn'>
        <div class='window'>
            <div @click.stop='close'>关闭这个窗口</div>
            <div class="detailWindow">
                <my-detail v-for="item in detailWindow" :class='id'></my-detail>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import myDetail from './detail.vue'
export default {
    components: {myDetail},
    data() {
        return {
            id: this.$route.query.id
        }
    },
    computed: {
        ...mapGetters([
            'detailWindow'
        ])
    },
    methods: {
        ...mapMutations([
            'set_detailWindow'
        ]),
        close() {
            for (var i = 0; i < this.detailWindow.length; i++) {
                if (this.detailWindow[i].id === this.json.id) {
                    this.detailWindow.splice(i, 1)
                }
            }
            this.set_detailWindow(this.detailWindow)
        }
    }
}
</script>
<style scoped lang='stylus'>
.window {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2000;
    overflow: auto;
    .detailWindow{
        overflow-y: auto;
    }
}
</style>
