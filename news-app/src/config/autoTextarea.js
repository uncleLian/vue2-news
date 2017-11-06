// textarea自动增加高度
export function autoTextarea(elem, extra, maxHeight) {
    extra = extra || 0
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window
    var isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')
    var addEvent = function(type, callback) {
            elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback)
        }
    var getStyle = elem.currentStyle ? function(name) {
            var val = elem.currentStyle[name]
            if (name === 'height' && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect()
                return rect.bottom - rect.top - parseFloat(getStyle('paddingTop')) - parseFloat(getStyle('paddingBottom')) + 'px'
            }
            return val
        } : function(name) {
            return getComputedStyle(elem, null)[name]
        }
    var minHeight = parseFloat(getStyle('height'))
    elem.style.resize = 'none'
    var change = function() {
        var scrollTop
        var height
        var padding = 0
        var style = elem.style
        if (elem._length === elem.value.length) return
        elem._length = elem.value.length

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'))
        }
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop

        elem.style.height = minHeight + 'px'
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding
                style.overflowY = 'auto'
            } else {
                height = elem.scrollHeight - padding
                style.overflowY = 'hidden'
            }
            style.height = height + extra + 'px'
            scrollTop += parseInt(style.height) - elem.currHeight
            document.body.scrollTop = scrollTop
            document.documentElement.scrollTop = scrollTop
            elem.currHeight = parseInt(style.height)
        }
    }
    addEvent('propertychange', change)
    addEvent('input', change)
    addEvent('focus', change)
    change()
}
