// 点击滚动到顶部
export default function goTop(el, eventType, vm) {
    if (eventType === 'click') {
        $(el).on('click', () => {
            $(vm.$el.querySelector('.container')).animate({ scrollTop: 0 })
        })
    }
}
