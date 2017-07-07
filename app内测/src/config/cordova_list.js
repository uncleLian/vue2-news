/**
 * Created by yzj on 2017/7/4.
 */
//IOS 定位
export const getGeolocation = () => {
  let latitude ;
  var onSuccess = function(position) {
    // alert('纬度: '          + position.coords.latitude          + '\n' +
    //   '经度: '         + position.coords.longitude         + '\n' +
    //   '海拔: '          + position.coords.altitude          + '\n' +
    //   '水平精度: '          + position.coords.accuracy          + '\n' +
    //   '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
    //   '方向: '           + position.coords.heading           + '\n' +
    //   '速度: '             + position.coords.speed             + '\n' +
    //   '时间戳: '         + position.timestamp                + '\n');
     latitude = position;
  };
  //定位数据获取失败响应
  function onError() {
    alert("打开定位失败！！");
  }
  //开始获取定位数据
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  return latitude;
}

//android定位
export const baidumap_location = () => {
  let latitude ;
  var onSuccess = function(position) {
    alert('纬度: '          + position.latitude          + '\n' +
          '经度: '         + position.longitude         + '\n' )
    //   '海拔: '          + position.coords.altitude          + '\n' +
    //   '水平精度: '          + position.coords.accuracy          + '\n' +
    //   '垂直精度: ' + position.coords.altitudeAccuracy  + '\n' +
    //   '方向: '           + position.coords.heading           + '\n' +
    //   '速度: '             + position.coords.speed             + '\n' +
    //   '时间戳: '         + position.timestamp                + '\n');
    latitude = position;
  };
  //定位数据获取失败响应
  function onError() {
    alert("打开定位失败！！");
  }
  //开始获取定位数据
  baidumap_location.getCurrentPosition(onSuccess,onError);
  return latitude;
}
