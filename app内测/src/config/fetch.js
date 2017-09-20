import axios from 'axios'
import qs from 'qs'
let baseUrl = 'http://app.toutiaojk.com/e/extend/list/'
let publishURL = 'http://api.toutiaojk.com/e/extend/jkh/'
const ajaxURL = {
    classID: baseUrl + 'appclassid.php',
    Class: baseUrl + 'appnews.php',
    Stick: baseUrl + 'appistop.php',
    Artilce: baseUrl + 'apparticle.php',
    Recommend: baseUrl + 'apptuijian.php',
    Search: baseUrl + 'search.php',
    userData: baseUrl + 'appuserdata.php',
    collectList: baseUrl + 'appreaduserdata.php',
    videoList: baseUrl + 'appvideo.php',
    postComment: baseUrl + 'appPostComment.php',
    getComment: baseUrl + 'appGetComment.php',
    historyComment: baseUrl + 'historyComment.php',
    appreaduserdata: baseUrl + 'appreaduserdata.php',
    addata: baseUrl + 'ad.php',
    // login: 'Logincc.php',
    list: publishURL + 'List.php',
    edit: publishURL + 'Edit.php',
    uploadFile: publishURL + 'upload_file.php'
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
