<template>
    <div class='banner'>
        <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
            <swiper-slide v-for='item in json' :key='item'>
                <router-link :to="url(item)">
                    <img :src="item.ptitlepic">
                    <div class="banner_title">
                        <p>{{item.title}}</p>
                    </div>
                </router-link>
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
    </div>
</template>
<script>
export default {
    props: ['json'],
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                loop: true,
                direction: 'horizontal',
                autoplay: 3000,
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction: false
            }
        }
    },
    methods: {
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}`
        }
    }
}
</script>
<style lang='stylus'>
banner_height=4.6875rem 
.banner {
    position: relative;
    .swiper-box {
        width: 100%;
        height: banner_height;
        overflow: hidden;
    }
    .swiper-pagination {
        right: 12px;
        bottom: 10px;
        .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            background: #fff;
        }
    }
    .banner_title {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        color: #fff;
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.24) 40%, rgba(0, 0, 0, 0.29) 47%, rgba(0, 0, 0, 0.65) 95%);
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.24) 40%, rgba(0, 0, 0, 0.29) 47%, rgba(0, 0, 0, 0.65) 95%);
        z-index: 222;
        padding: 10px 8px;
        p {
            width: 85%;
            font-size: 14px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
