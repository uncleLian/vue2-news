import axios from 'axios'

const baseUrl = 'http://data.toutiaojk.com/extend/list/';

export var fetch = async(type = 'POST', url = '', data = {}) => {
	let result, params;
    type = type.toUpperCase();
    url = baseUrl + url;

    if(type == 'GET') {

    }else if (type == 'POST') {
        params = new URLSearchParams();
        for (var key in data) { params.append(key, data[key]) }
        await axios.post(url, params)
        .then(function(res) {
            result = res.data;
        })
    }

    return result
}

