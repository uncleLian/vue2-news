<template>
    <transition name='fadeIn'>
        <div id='reply' v-if='visible'>
            <my-header fixed title='回复'>
                <a slot='left' @click.stop="visible = false"><i class="icon-close"></i></a>
            </my-header>

            <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
                <div class="container">
                    <div class="reply-full">
                        <comment-item :itemJson='json'></comment-item>
                    </div>
                    <div class="reply-all" v-if='reply'>
                        <h2>全部回复</h2>
                        <comment-item v-for='item in reply' :itemJson='item' @click.native.stop="" :key='item'></comment-item>
                    </div>
                    
                    <tool></tool>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import tool from './tool'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    props: {
        json: Object
    },
    components: { tool },
    data() {
        return {
            visible: false,
            remarkid: ''
        }
    },
    computed: {
        ...mapGetters('detail', [
            'reply'
        ])
    },
    methods: {
        ...mapMutations('detail', [
            'set_reply'
        ]),
        ...mapActions('detail', [
            'get_Reply_data'
        ]),
        open() {
            this.visible = true
        },
        get_Reply() {
            this.get_Reply_data({'remarkid': this.remarkid, 'page': 1})
        }
    },
    watch: {
        json(val) {
            if (val) {
                console.log(val)
                this.remarkid = val.remarkid
                this.get_Reply()
            }
        }
    }
}
</script>
<style scoped lang='stylus'>
#reply {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1112;
    header {
        background: #fdfdfd;
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        i {
            font-size: 20px;
            vertical-align: middle;
        }
    }
    .content {
        height: 100%;
        padding-top: 44px;
        background-color: #f8f8f8;
        &.isIOS {
            padding-top: 64px;
        }
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
            h2 {
                display: inline-block;
                font-size: 14px;
                margin: 10px 0 0 16px;
                padding-bottom: 10px;
                font-weight: 400;
            }
            .reply-full {
                border-bottom: 1px solid #ddd;
            }
            .review {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 666;
                height: 48px;
                line-height: 48px;
                display: flex;
                background: #fdfdfd;
                border-top: 1px solid #ddd;
                padding: 0 16px;
                .left {
                    flex: 1;
                    position: relative;
                    span {
                        position: absolute;
                        left: 16px;
                        top: 2px;
                        z-index: 111;
                    }
                    #input {
                        width: 100%;
                        height: 32px;
                        line-height: 32px;
                        margin: 6px 0 8px;
                        border-radius: 30px;
                        border: 1px solid #ddd;
                        background: #eee;
                        position: relative;
                        font-size: 14px;
                        padding: 0 16px;
                    }
                }
                .right {
                    flex: 1;
                    text-align: right;
                    a {
                        display: inline-block;
                        text-align: center;
                        width: 33%;
                        font-size: 20px;
                        padding: 0 16px;
                        text-decoration: none;
                    }
                }
                .publish_btn {
                    display: inline-block;
                    padding: 0 15px;
                    font-size: 16px;
                    color: #aaa;
                }
            }
        }
    }
}
</style>
