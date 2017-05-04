# news
一个基于Vue2.x 框架开发的移动端单页面新闻类项目

开发环境：vue-cli + webpack 构建 
技术栈：
	stylus + es2015 + Vue2.x全家桶( vue + vue-router + vuex )
	UI组件库：mint-ui
	其他库：vue-awesome-swiper + fastclick + jquery
说明：
	1、修改了mint-ui/mint-ui.common.js里面loadMore组件的源码：
		1、下拉阈值，0 -> 5 (增强上下左右滑动的流畅感)
		2、添加1个属性 distance (用于左右滑动中，禁止下拉)
		3、handleTouchEnd方法里添加 event.preventDefault();event.stopPropagation(); (使用fastclick，下拉结束时会在当前鼠标位置的元素上触发一次点击事件的bug)
	2、添加了触摸判断： ios端下拉ing&下拉end去除，上滑添加-webkit-overflow-scrolling: touch;
		(解决ios端下无法下拉或滚动不流畅的bug)