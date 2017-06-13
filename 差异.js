
// web工程 与 app工程 —— 差异
	一、/* assets */ 
		1、css 
		2、fonts 
		3、/* icon */ : app，多了这个文件夹
		4、img
	二、/* components */ 
		1、banner.vue
		2、info.vue
		3、listItem.vue
		4、loading.vue
		5、/* myHeader.vue */ : app，ios端多20px状态栏高度
		6、popupMenu.vue
		5、swiperDirective.js
	三、config
	四、/* page */
		1、detail
			@components
				1/	article.vue
				2/	recommend.vue
				3/	/* share.vue */	: web-网址，app-客户端
				4/	tags.vue
			/* @detail.vue */	: app，content多了ios padding;下载不一样;share需要数据
		2、index
			@children
				1/	channel.vue
			@components
				1/	/*	index_footer.vue */	: web,多了这个组件
				2/	/*	index_header.vue */	: nav布局不一样
				3/	pullContainer.vue
				4/	/*	swiperContainer.vue */	: app，content多了ios padding
			/* @index.vue */	: 对应app-home.vue,app多了客户端物理键返回方法
		3、search
			/* search.vue */	: app，content多了ios padding
		4、theme
			1/	theme.vue
	五、/* router */	: app，多了用户页面路由
	六、store
	七、App.vue    
	八、main.js



//　app工程 多出的文件
	四、page
		1、index
			1/	collect
			2/	user
			3/	video
			4/	/* home */ : 对应web/page/index
			5/	index.vue
			6/	navBar.vue
		2、login

