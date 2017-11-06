import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'

const ajaxURL = {
    // 主页
    classID: 'appclassid.php',          // 栏目
    Class: 'appclass.php',              // 栏目列表
    Stick: 'appistop.php',              // 栏目置顶
    // 详情页
    Artilce: 'apparticle.php',          // 文章
    Recommend: 'apptuijian.php',        // 文章推荐
    // 搜索页
    Search: 'search.php'                // 搜索
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
