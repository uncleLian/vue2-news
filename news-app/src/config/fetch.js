import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios

// 应用数据和后台富文本数据的地址不同
let baseUrl = 'http://app.toutiaojk.com/e/extend/list/'
let publishURL = 'http://api.toutiaojk.com/e/extend/jkh/'

const ajaxURL = {
    // 主页
    classID: baseUrl + 'appclassid.php',                // 栏目
    Class: baseUrl + 'appnews.php',                     // 栏目列表
    Stick: baseUrl + 'appistop.php',                    // 栏目置顶
    // 详情页
    Artilce: baseUrl + 'apparticle.php',                // 文章
    Recommend: baseUrl + 'apptuijian.php',              // 文章推荐
    getComment: baseUrl + 'appGetComment.php',          // 获取评论
    postComment: baseUrl + 'appPostComment.php',        // 提交评论
    userData: baseUrl + 'appuserdata.php',              // 提交数据：用户浏览时间、喜欢、收藏
    // 搜索页
    Search: baseUrl + 'search.php',                     // 搜索
    // 视频页
    videoList: baseUrl + 'appvideo.php',                // 视频列表
    // 收藏页
    collectList: baseUrl + 'appreaduserdata.php',       // 收藏列表
    // 用户页
    appreaduserdata: baseUrl + 'appreaduserdata.php',   // 用户页数据：评论、收藏数量
    historyComment: baseUrl + 'historyComment.php',     // 用户的历史评论
    // 后台页
    list: publishURL + 'List.php',                      // 后台列表请求
    edit: publishURL + 'Edit.php',                      // 后台编辑内容
    uploadFile: publishURL + 'upload_file.php',         // 后台图片上传
    // 其他
    addata: baseUrl + 'ad.php',                         // 广告
    power: publishURL + 'Logincc.php'                   // 用户权限验证
}

export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    url = ajaxURL[url]
    if (type === 'GET') {
        await axios.get(url, { params: data })
        .then(res => {
            result = res.data
        })
    } else if (type === 'POST') {
        await axios.post(url, qs.stringify(data))
        .then(res => {
            result = res.data
        })
    }
    return result
}
