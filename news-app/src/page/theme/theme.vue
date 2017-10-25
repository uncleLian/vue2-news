<template>
    <div id='theme'>
        <my-header fixed>
            <a slot="left" @click.stop='$router.go(-1)'><i class="icon-back"></i></a>
            <a slot="mid" @click.stop='goTop'>专题</a>
        </my-header>
        <div class="content">
            <div class="container" v-swiper:swiperRight='true'>
                <div class="theme_header">
                    <img class='theme_img' src="http://p.soyilu.com/data/nfs/guest/xjp.png">
                    <span class="theme_title">盘点近几年有爱瞬间！习近平与小朋友一起度过五年儿童节</span>
                </div>
                <div class="theme_content">
                    <div class="theme_abstract"><b>摘要：</b> 国际儿童节（又称儿童节）定于每年的6月1日。党的十八大以来，以习近平同志为总书记的党中央高度重视中国少年先锋队建设、亲切关怀少年儿童健康成长，为新形势下我国少年儿童事业发展指明了方向。十八大以来至今的五个儿童节，2014年、2015年、2016年“六一”国际儿童节，他都分别以不同的形式向全国的小朋友送出美好的祝愿。
                    </div>
                    <div class="theme_plate">
                        <section>
                            <div><a href="#">2014年5月30日，他来到北京市海淀区民族小学，强调要让社会主义核心价值观的种子在少年儿童心中生根发芽。</a></div>
                            <div><a href="#">2015年6月1日，他在人民大会堂亲切会见中国少年先锋队第七次全国代表大会全体代表，强调美好的生活属于孩子们，美丽的中国梦属于孩子们</a></div>
                        </section>
                        <section>
                            <div><a href="#">2016年5月30日，他给大陈岛老垦荒队员的后代、浙江省台州市椒江区12名小学生回信，勉励他们继承和弘扬大陈岛垦荒精神，准备着为实现中华民族伟大复兴的中国梦贡献力量。</a></div>
                            <div><a href="#">在习近平总书记眼中，少年儿童是祖国的希望、民族的未来。这些年，无论多忙，无论身处何地，他总心系少年儿童，情牵孩子们的成长。强调：美好的生活属于孩子们。</a></div>
                        </section>
                    </div>
                    <div class="theme_pic">
                        <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
                            <swiper-slide v-for='item in imgArr' :key='item'>
                                <img :src="item.img">
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </div>
                    <div class="theme_article">
                        <h4>国家领导人如何过节？</h4>
                        <div>
                            <p>1.2013年6月1日，习近平主席夫人彭丽媛在特立尼达和多巴哥总统卡莫纳总统夫人的陪同下，来到特立尼达和多巴哥国家表演艺术中心观看特多文艺表演。并参观了特多智障儿童协会。在活动大厅，彭丽媛还观看了孩子们表演的歌舞，并赠送了毛绒熊猫等玩具。</p>
                            <p>2.2014年5月30日下午，李克强总理来到八一儿童医院，看望民政部“明天计划”救助的孤残儿童。在病床前，他俯下身子和患儿交流，仔细听取医生对孩子病情和手术情况的介绍。</p>
                            <p>3.2014年5月30日上午，习近平来到北京海淀区民族小学，参加少先队入队仪式。他来到“民族一家亲”教室参观，亲自参与学校开展的“爱心义卖”活动，掏钱买文具。</p>
                        </div>
                    </div>
                    <div class="theme_video">
                        <li>
                            <a class='video' href='http://news.xinhuanet.com/politics/2015-06/01/c_1115476644.htm' target='blank'>
                                <div class="video_wrapper">
                                    <div class="video_info">
                                        <div class="video_title">
                                            <p>健康头条第38期</p>
                                        </div>
                                        <div class="totalTime">1:22</div>
                                        <img src="http://p.soyilu.com/data/nfs/video/健康头条/QQ截图20170602110232.jpg">
                                    </div>
                                    <div class="playRound">
                                        <div class="playSan"></div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class='video' href='http://www.chinanews.com/gn/2014/05-30/6233537.shtml' target='blank'>
                                <div class="video_wrapper">
                                    <div class="video_info">
                                        <div class="video_title">
                                            <p>健康头条第38期</p>
                                        </div>
                                        <div class="totalTime">1:22</div>
                                        <img src="http://p.soyilu.com/data/nfs/video/健康头条/QQ截图20170602110232.jpg">
                                    </div>
                                    <div class="playRound">
                                        <div class="playSan"></div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a class='video' href='http://news.qq.com/a/20170531/049076.htm?t=1496241728541' target='blank'>
                                <div class="video_wrapper">
                                    <div class="video_info">
                                        <div class="video_title">
                                            <p>健康头条第38期</p>
                                        </div>
                                        <div class="totalTime">1:22</div>
                                        <img src="http://p.soyilu.com/data/nfs/video/健康头条/QQ截图20170602110232.jpg">
                                    </div>
                                    <div class="playRound">
                                        <div class="playSan"></div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgArr: [
            {img: 'http://p.soyilu.com/data/nfs/guest/2014.jpg'},
            {img: 'http://p.soyilu.com/data/nfs/guest/20170601143722.jpg'},
            {img: 'http://p.soyilu.com/data/nfs/guest/20170601143557.jpg'},
            {img: 'http://p.soyilu.com/data/nfs/guest/20170601143241.jpg'}
            ],
            swiperOption: {
                // notNextTick: true,
                loop: true,
                direction: 'horizontal',
                autoplay: 3000,
                pagination: '.swiper-pagination'
            }
        }
    },
    methods: {
        goTop() {
            $('#theme .container').animate({scrollTop: 0})
        }
    }
}
</script>
<style lang='stylus'>
#theme {
    width: 100%;
    height: 100%;
    overflow: hidden;
    header {
        background: #f8f8f8;
        color: #333;
        i {
            font-size: 20px;
            font-weight: bold;
            vertical-align: middle;
        }
    }
    .content {
        width: 100%;
        height: 100%;
        padding-top: 44px;
        position: relative;
        .container {
            height: 100%;
            overflow: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
        }
    }
}

.theme_header {
    width: 100%;
    position: relative;
    .theme_img {
        width: 100%;
    }
    .theme_title {
        position: absolute;
        width: 70%;
        right: 4px;
        bottom: 6px;
        font-size: 12px;
        color: #fff;
    }
}

.theme_content {
    width: 100%;
    padding: 0 16px;
    .theme_abstract {
        font-size: 14px;
        margin-top: 10px;
    }
    .theme_plate {
        margin-top: 20px;
        section {
            margin-bottom: 20px;
            div {
                width: 48%;
                display: inline-block;
                text-align: center;
                vertical-align: top;
                &:first-child {
                    margin-right: 4%;
                }
                a {
                    display: inline-block;
                    width: 100%;
                    height: 160px;
                    font-size: 12px;
                    text-align: center;
                    padding: 4px;
                    border: 1px solid black;
                    overflow: hidden;
                }
            }
        }
    }
    .theme_pic {
        margin-top: 30px;
        position: relative;
        .swiper-box {
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        .swiper-pagination {
            left: 50%;
            bottom: 10px;
            transform: translateX(-50%);
        }
        .swiper-pagination-bullet {
            margin: 0 2px;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
    .theme_article {
        margin-top: 20px;
        p {
            width: 100%;
            font-size: 14px;
            line-height: 30px;
            word-break: break-word;
        }
    }
    .theme_video {
        margin: 30px 0;
        li {
            margin: 16px 0;
        }
        .video {
            video {
                width: 100%;
            }
            .video_wrapper {
                width: 100%;
                height: 190px;
                position: relative;
                overflow: hidden;
                color: #999;
                .video_info {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    img {
                        position: absolute;
                        width: 100%;
                        min-height: 190px;
                        display: block;
                        left: 0;
                        top: 0;
                        z-index: 111;
                    }
                }
                .video_title {
                    position: absolute;
                    width: 100%;
                    height: 80px;
                    top: 0;
                    left: 0;
                    color: #fff;
                    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, .5)), color-stop(100%, transparent));
                    z-index: 222;
                    p {
                        width: 100%;
                        font-size: 14px;
                        line-height: 24px;
                        padding: 8px 15px 0;
                        margin: 0;
                    }
                }
                .totalTime {
                    position: absolute;
                    display: inline-block;
                    width: 40px;
                    right: 5px;
                    bottom: 5px;
                    background: rgba(0, 0, 0, .5);
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 10px;
                    z-index: 222;
                }
                .playRound {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    left: 50%;
                    top: 50%;
                    margin-left: -25px;
                    margin-top: -25px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, .3);
                    z-index: 222;
                    border: 1px solid #fff;
                }
                .playSan {
                    position: absolute;
                    width: 0;
                    height: 0;
                    font-size: 0;
                    border: 16px solid white;
                    border-color: transparent transparent transparent rgba(255, 255, 255, .6);
                    left: 50%;
                    top: 50%;
                    margin-left: -5px;
                    margin-top: -16px;
                }
            }
        }
    }
}
</style>
