export function GetSlideDirection(startX, startY, endX, endY, move){
	var dy = startY - endY;
 	var dx = endX - startX;
	var result;
  	//如果滑动距离太短
  	if (Math.abs(dx) < move && Math.abs(dy) < move) {
    	return 
    }
    var angle = Math.atan2(dy,dx) * 180 / Math.PI; // 获取角度
    if (angle >= -45 && angle < 30) {
        result = 'swiperRight';		// 右
    }else if (angle >= 45 && angle < 135) {
        result = 'swiperUp';		// 上
    }else if (angle >= -135 && angle < -45) {
        result = 'swiperDown';		// 下
    }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 'swiperLeft';		// 左
    }
    return result;
}
	