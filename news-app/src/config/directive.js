function GetSlideDirection(startX, startY, endX, endY, move) {
    let dy = startY - endY
    let dx = endX - startX
    let result
    // 如果滑动距离太短
    if (Math.abs(dx) < move && Math.abs(dy) < move) {
        return
    }
    let angle = Math.atan2(dy, dx) * 180 / Math.PI // 获取角度
    if (angle >= -45 && angle < 30) {
        result = 'swiperRight' // 右
    } else if (angle >= 45 && angle < 135) {
        result = 'swiperUp' // 上
    } else if (angle >= -135 && angle < -45) {
        result = 'swiperDown' // 下
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 'swiperLeft' // 左
    }
    return result
}

// 根据触摸方向做相应需求
export function swiper(el, direction, type, vm) {
    if (!el || !direction) {
        return
    }
    let res // 结果
    let startX, startY
    el.addEventListener('touchstart', function(ev) {
        res = ''
        startX = ev.touches[0].pageX
        startY = ev.touches[0].pageY
    }, false)

    el.addEventListener('touchmove', function(ev) {
        let endX, endY
        endX = ev.changedTouches[0].pageX
        endY = ev.changedTouches[0].pageY
        res = GetSlideDirection(startX, startY, endX, endY, 50)
        // 如果组件传的类型为blur，找到当前组件的input元素失去焦点
        if (type === 'blur') {
            let input = $(vm.$el.querySelector('#input'))
            if (input.is(':focus')) {
                input.blur()
            }
        }
    }, false)

    el.addEventListener('touchend', function(ev) {
        // 触摸滑动的方向和组件传的方向相等，则返回上一页
        if (direction === res) {
            vm.$router.go(-1)
        }
    }, false)
}

// 点击滚动到顶部
export function goTop(el, eventType, vm) {
    if (eventType === 'click') {
        $(el).on('click', () => {
            $(vm.$el.querySelector('.container')).animate({scrollTop: 0})
        })
    }
}
