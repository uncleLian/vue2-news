import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'
const ajaxURL = {
    classID: 'appclassid.php',
    Class: 'appclass.php',
    Stick: 'appistop.php',
    Artilce: 'apparticle.php',
    Recommend: 'apptuijian.php',
    Search: 'search.php'
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
