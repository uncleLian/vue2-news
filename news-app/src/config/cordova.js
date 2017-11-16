import { Toast } from 'mint-ui'

// IOS定位
export const get_iosLocation = () => {
    let latitude = {}
    let onSuccess = (position) => {
        // Toast('纬度: '          + position.coords.latitude          + '\n' +
        // '经度: '         + position.coords.longitude       + '\n' +
        // '海拔: '          + position.coords.altitude          + '\n' +
        // '水平精度: '          + position.coords.accuracy          + '\n' +
        // '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
        // '方向: '           + position.coords.heading           + '\n' +
        // '速度: '             + position.coords.speed             + '\n' +
        // '时间戳: '         + position.timestamp                + '\n')
        latitude = position
    }
    // 定位数据获取失败响应
    let onError = () => {
        Toast('打开定位失败！！')
    }
    // 开始获取定位数据
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
    return latitude
}

// android定位
export const get_androidLocation = () => {
    let latitude = {}
    let onSuccess = (position) => {
        // Toast('纬度: ' + position.latitude + '\n' +
        // '经度: ' + position.longitude + '\n')
        latitude = position
    }
    // 定位数据获取失败响应
    let onError = () => {
        Toast('打开定位失败！！')
    }
    // 开始获取定位数据
    baidumap_location.getCurrentPosition(onSuccess, onError)
    return latitude
}

// 获取设备ID
export const get_uuid = () => {
    document.addEventListener('deviceready', () => {
        let uuid = device.uuid
        return uuid
    }, false)
}

// 热更新
export const hotUpdate = () => {
    document.addEventListener('chcp_updateInstalled', function() {
        Toast('更新完成')
    }, false)
}

// 版本更新
// export const versionUpdate = () => {
//     document.addEventListener('chcp_updateLoadFailed', (eventData) => {
//         let error
//         error = eventData.detail.error
//         if (error.code === -2) {
//             MessageBox.confirm('有新的版本，点击确认前往更新').then(action => {
//                 document.addEventListener('deviceready', () => {
//                     window.open('http://m.toutiaojk.com/download.html', '_system', 'location=yes')
//                 }, false)
//             })
//         }
//     }, false)
// }

// 监听物理返回键
export const onBackKeyDown = () => {
    Toast({
        message: '再点击一次退出程序',
        position: 'bottom',
        duration: 2000
    })
    document.removeEventListener('backbutton', this.onBackKeyDown, false)
    document.addEventListener('backbutton', this.exitApp, false)
    var timer = setTimeout(() => {
        document.removeEventListener('backbutton', this.exitApp, false)
        document.addEventListener('backbutton', this.onBackKeyDown, false)
        clearTimeout(timer)
    }, 2000)
}

// 退出App
export const exitApp = () => {
    navigator.app.exitApp()
}
