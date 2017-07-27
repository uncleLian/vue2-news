import axios from 'axios'
import qs from 'qs'

const baseUrl = 'http://data.toutiaojk.com/extend/list/';
const ajaxURL = {
    classID:'appclassid.php',
    Class: 'appclass.php',
    Stick: 'appistop.php',
    Artilce: 'apparticle.php',
    Recommend: 'apptuijian.php',
    Search: 'search.php',
}

export var fetch = async(type = 'POST', url = '', data = {}) => {
	let result, params;
    type = type.toUpperCase();
    url = baseUrl + ajaxURL[url];

    if(type == 'GET') {

    }else if (type == 'POST') {
        await axios.post(url, qs.stringify(data))
        .then(res=>{
            result = res.data;
        })
    }
    return result
}
