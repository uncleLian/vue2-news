import { GetSlideDirection } from './GetSlideDirection.js'
export function swiperDirective(el,direction,vm){
	if(!el || !direction ){
		return
	}
	var directionResult; // 结果

	var startX, startY;
    el.addEventListener('touchstart', function (ev){
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY; 
    }, false);

    el.addEventListener('touchmove', function (ev){
	    var endX, endY;
	    endX = ev.changedTouches[0].pageX;
	    endY = ev.changedTouches[0].pageY;
	    directionResult = GetSlideDirection(startX, startY, endX, endY, 50);
  	}, false);
  	
  	el.addEventListener('touchend', function (ev){
	    if( direction == directionResult ){
	    	vm.$router.go(-1);
	    }
  	}, false);
}