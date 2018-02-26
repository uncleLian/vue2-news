# vue2-news
![image](https://img.shields.io/badge/vue-2.5.13-blue.svg)
![image](https://img.shields.io/badge/vue--router-3.0.1-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/mint--ui-2.2.13-blue.svg)

## 公告
原项目已拆分，此仓库保留今日头条（web端代码），[native端代码，请戳这里](https://github.com/uncleLian/vue2-native)

## 简介
vue2-news 是一个仿今日头条移动端的项目，共4个页面，涉及文章的分类、展示、阅读、推荐、搜索等。作为App其中一个流量入口。

## 说明
> 如果对你有帮助，您可以点右上角 "star"一下，非常感谢！^_^ 🌹

> 或者您可以 "follow（关注）" 一下，我正在不断开源更多实用的项目

> 如有问题可以直接在 Issues 中提，或者加入我们下方的vue群更进一步地交流

## 最终目标
- 第一阶段：[vue2-echo](https://github.com/uncleLian/vue2-echo) —— echo回声（ 移动端，难度：★★☆☆☆  入门项目）
- 第二阶段：[vue2-news](https://github.com/uncleLian/vue2-news) —— 今日头条（ 移动端，难度：★★★☆☆ 过渡项目）
- 第三阶段：[vue2-health](https://github.com/uncleLian/vue2-health) —— 头条号（ pc端，难度：★★★☆☆ 过渡项目）
- 第四阶段：[vue2-native](https://github.com/uncleLian/vue2-native) —— 今日头条（ native端，难度：★★★★☆ 进阶项目）

##### 注：此系列只关注前端项目的实现，后端等知识不是此系列的范围，但会告知一二。


## 注意

> 1、本地运行项目请把项目里的mint-ui.common.js文件替换掉 node_modules/minit-ui/lib/mint-ui.common.js文件。主要优化下拉动作和左右滑动的体验。详细查看文章 [饿了么mint-ui库loadmore组件的下拉问题](http://liansixin.win/2017/08/01/mint-ui/)

> 2、下载App安装包请使用手机浏览器下载。

## 项目演示

[项目演示请戳这里 ](http://toutiao.liansixin.win)（请使用手机模式预览）

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_QRcode.png" width="250" height="250"/>

## 功能

- [x] 下拉上滑查看更多内容
- [x] 左右滑动切换栏目列表
- [x] 点击头部回到顶部（指令）
- [x] 右滑返回上一页（指令）
- [x] 视频播放的加载、重播指示以及悬浮等功能
- [x] 热点文章和搜索推荐（后台算法）
- [x] 文章标签（后台算法）
- [x] 分享
- [x] 搜索（关键字高亮显示）
- [x] 刷新保持页面的数据和状态
- [x] 展开全文
- [x] 下载页（目前只支持下载Android包）

## 部分截图

### 移动端

- 首页、详情页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_index.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_detail.png" width="365" height="619"/>

- 搜索页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_search.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_search2.png" width="365" height="619"/>



## 目录结构


``` bash
├── build                                        // 构建相关  
├── config                                       // 配置相关
├── src                                          // 项目代码
│   ├── assets                                   // 样式、图标等静态资源
│   ├── components                               // 全局公用组件
│   │   ├── banner.vue                           // banner组件
│   │   ├── commentItem.vue                      // 评论Item组件
│   │   ├── error.vue                            // 错误提示组件
│   │   ├── info.vue                             // listItem的列表信息组件
│   │   ├── listItem.vue                         // 文章List组件
│   │   ├── loading.vue                          // 加载提示组件
│   │   ├── myHeader.vue                         // 头部组件
│   │   ├── popuMenu.vue                         // 模态框组件
│   ├── config                                   // 全局公用方法
│   │   ├── cache.js                             // 缓存方法
│   │   ├── directive.js                         // 指令方法
│   │   ├── fetch.js                             // 请求方法
│   ├── page
│   │   ├── detail
│   │   |   ├── components
│   │   |   |   ├── article.vue                  // 文章组件
│   │   |   |   ├── recommend.vue                // 推荐组件
│   │   |   |   ├── share.vue                    // 分享组件
│   │   |   |   ├── tags.vue                     // 标签组件
│   │   |   ├── detail.vue                       // 详情页
│   │   ├── index
│   │   |   ├── children
│   │   |   |   ├── channel.vue                  // 栏目页
│   │   |   ├── components
│   │   |   |   ├── index_footer.vue             // 首页底部组件
│   │   |   |   ├── index_header.vue             // 首页头部组件
│   │   |   |   ├── pullContainer.vue            // 下拉容器组件
│   │   |   |   ├── swiperContainer.vue          // 滑动容器组件
│   │   |   ├── index.vue                        // 首页
│   │   ├── search
│   │   |   ├── search.vue                       // 搜索页
│   ├── router
│   │   ├── index.js                             // 路由配置       
│   ├── store
│   │   ├── detail
│   │   |   ├── index.js                         // 详情页store
│   │   ├── index
│   │   |   ├── index.js                         // 首页store
│   │   ├── search
│   │   |   ├── index.js                         // 搜索页store
│   │   ├── index.js                             // 全局store
│   ├── App.vue                                  // 页面入口
│   └── main.js                                  // 程序入口
├── static                                       // 空文件夹，只作为github保留
├── .babelrc                                     // babel-loader 配置
├── .eslintrc.js                                 // eslint 配置项
├── .gitignore                                   // git 忽略项
├── index.html                                   // 入口html文件
└── package.json                                 // package.json
```

## 安装运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8086
npm run dev

# build for production with minification
npm run build（File in the docs folder）
```

## 捐赠
如果你觉得这个项目帮助到了你，你可以请我喝一杯果汁表示支持🍹

<img src="https://github.com/uncleLian/vue2-blog/raw/master/screenshots/donate.jpg" width="500px" style="max-width: 100%;"/>

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- QQ：771674109
- Vue交流群：338241465 —— 广州-小鑫

## License

[MIT](https://github.com/uncleLian/vue2-news/blob/master/LICENSE)

Copyright (c) 2017-present，uncleLian