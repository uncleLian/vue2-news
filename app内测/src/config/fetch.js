import axios from 'axios'
import qs from 'qs'
// let url = window.location.host
// let baseUrl = `http://${url}/e/extend/list/`
// if(url == 'localhost:8082' || url == '192.168.3.24:8082'){
// let baseUrl = 'http://ts.toutiaojk.com/e/extend/list/'
let baseUrl = 'http://app.toutiaojk.com/e/extend/list/'
    // }
const ajaxURL = {
    classID: 'appclassid.php',
    Class: 'appnews.php',
    Stick: 'appistop.php',
    Artilce: 'apparticle.php',
    Recommend: 'apptuijian.php',
    Search: 'search.php',
    userData: 'appuserdata.php',
    collectList: 'appreaduserdata.php',
    videoList: 'appvideo.php',
    postComment: 'appPostComment.php',
    getComment: 'appGetComment.php',
    historyComment: 'historyComment.php',
    appreaduserdata: 'appreaduserdata.php',
    addata: 'ad.php'
}

export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    url = baseUrl + ajaxURL[url]

    if (type === 'GET') {

    } else if (type === 'POST') {
        await axios.post(url, qs.stringify(data))
        .then(res => {
            result = res.data
        })
    }
    return result
}
