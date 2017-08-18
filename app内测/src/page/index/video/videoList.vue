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
    props: [
      'videoJson'
    ],
    data() {
      return {}
    },
    methods: {
      url(item) {
        return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}`
      }
    }

  }
</script>
<style scoped lang='stylus'>
  small_height = 1.96875rem
  larger_height = 4.6875rem
  #listItem li {
    margin: 0 15px;
    border-bottom: 1px solid hsla(0, 0%, 87%, .6);
    a {
      display: block;
      width: 100%;
      padding: 16px 0;
      outline: none;
      color: #131313;
      -webkit-tap-highlight-color: rgba(0, 0, 0, .1);
      text-decoration: none;
    }
    a:visited h3 {
      color: #999;
    }
    img {
      background: #ddd;
    }
    img[lazy=loading] {
      height: 100%;
    }
    .news_title h3 {
      white-space: normal;
      font-size: 17px;
      line-height: 21px;
      color: #222;
      font-weight: 400;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .video {
    video {
      width: 100%;
    }
    .video_wrapper {
      width: 100%;
      height: larger_height;
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
          min-height: larger_height;
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

  #listItem.checkBox li {
    white-space: nowrap;
    position: relative;
    a {
      display: inline-block !important;
    }
    .checkBox {
      width: 30px;
      padding: 16px 0;
      display: inline-block;
      vertical-align: top;
      input[type="checkbox"] {
        display: none;
      }
      label {
        position: absolute;
        top: 50%;
        left: 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-top: -10px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 100%;
        text-align: center;
      }
      input[type="checkbox"]:checked + label {
        border: 1px solid #d81e06;
        background: #d81e06;
        color: #fff;
      }
      input[type="checkbox"]:checked + label:after {
        content: "\2714";
      }
      .checked_btn {
        position: absolute;
        width: 120%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 888;
      }
    }
  }
</style>
