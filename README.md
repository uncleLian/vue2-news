# vue2-news
![image](https://img.shields.io/badge/vue-2.5.2-blue.svg)
![image](https://img.shields.io/badge/vue--routet-3.0.1-blue.svg)
![image](https://img.shields.io/badge/vuex-3.0.1-blue.svg)
![image](https://img.shields.io/badge/mint--ui-2.2.10-blue.svg)
![image](https://img.shields.io/badge/license-MIT-blue.svg)

## 前言

该项目UI模仿今日头条，但我尽可能地做了许多修改，我不是UI设计出生的，如何还看得过去，右上角点个 "star" 支持一下吧🌹

该项目包括移动端和native端，移动端共4个页面，native端共20个页面，涉及文章的分类、展示、阅读、推荐、搜索和用户的登录、评论、收藏以及后台文章编辑等等，是一个完整的生态链。其复杂度不用说大家也能感受到。如果这个项目能驾驭的了，你的Vue使用能力已经达到一定水平了，相信大部分公司的单页面应用也就不在话下。

## 技术栈

> vue2、vuex3、vue-router3、vue-awesome-swiper、vue-quill-editor

> axios、mint-ui、flexible.js、IconFont

> ES6/7、Stylus、ESlint、webpack3、

## 说明

> 如果对您有帮助，您可以点右上角 "Star"一下， 您的支持是我最大的动力！非常感谢！^_^ 🌹

> 或者您可以 "follow" 一下，我会不断开源更多的有趣实用的项目

> 开发环境 macOS 10.12.6、Chrome 61、 nodejs 8.4.0

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

> 该项目是此开源系列的其中一个阶段，更多内容查看下方的最终目标

## 最终目标

- 第一阶段：echo回声（移动端，难度：简单 ~ 中等） —— [仓库地址](https://github.com/uncleLian/vue2-echo) —— [项目演示地址](http://echo.liansixin.win)

- 第二阶段：今日头条（移动端 & native，难度：困难） —— [仓库地址](https://github.com/uncleLian/vue2-news) —— [移动端演示地址](http://toutiao.liansixin.win)， [native端演示地址](http://native.liansixin.win)

- 第三阶段：头条号（pc端，难度：中等 ~ 困难） —— [仓库地址](https://github.com/uncleLian/vue2-health) —— 还在开发，敬请期待！（已实现核心功能）

##### 注：此系列只关注前端项目的实现，后端等知识不是此系列的范围，但会告知一二。

## 注意

> 1、请把项目里的mint-ui.common.js文件替换掉 node_modules/minit-ui/lib/mint-ui.common.js文件。主要优化下拉动作和左右滑动的体验。详细查看文章 [饿了么mint-ui库loadmore组件的下拉问题](http://liansixin.win/2017/08/01/mint-ui/)

> 2、该项目使用vue-router的hash模式，项目里写了许多用来记录页面滚动条位置的代码，有点不优雅，其最终原因都是为了能实现首页下拉和左右滑动切换栏目的功能。如需history模式的实例。请参考第一阶段和第三阶段的项目vue2-echo、vue2-health

> 3、native端某些代码在浏览器里是不能生效的，这些是用于手机app的，如：获取设备uuid、微信客户端登录等。技术是利用cordova打包成app和使用cordova的一些插件。具体请查看[cordova官网](http://cordova.axuer.com/)

> 4、如果运行项目是灰屏，那可能是打开了app.vue文件beforeRouteEnter钩子的代码。这个主要是用于app需要保证加载完cordova插件才能进入项目。浏览器打开这段代码是进不到项目的。

> 5、关于后台文章管理，操作的都是真实后台数据，虽然没什么价值，但为了大家都能查看一个很真的数据信息，请勿随意捣乱原有的数据哈，可以新建任务去操作查看效果，谢谢啦。

## 效果演示 

[web端demo请戳这里 ](http://toutiao.liansixin.win)（请使用chrome手机模式预览）

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_QRcode.png" width="250" height="250"/>

[native端demo请戳这里](http://native.liansixin.win)（请使用chrome手机模式预览）

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_QRcode.png" width="250" height="250"/>

[安装包请戳这里](http://m.toutiaojk.com/guide.html)（目前只支持 Android）

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/downLoad_QRcode.png" width="250" height="250"/>

## 功能

#### 共同功能
- [x] 下拉上滑请求数据
- [x] 左右滑动切换栏目
- [x] 点击头部回到页面顶部（指令）
- [x] 右滑返回上一页（指令）
- [x] 视频播放的加载、重播指示以及悬浮等功能
- [x] 热点文章和搜索推荐（后台算法）
- [x] 文章标签（后台算法）
- [x] 分享功能（移动端分享网址，native端微信分享）
- [x] 搜索功能

#### 移动端
- [x] 刷新保持页面的数据和状态
- [x] 展开全文
- [x] 下载页（目前只支持下载Android包）

#### native端
- [x] 增减栏目
- [x] 浏览历史
- [x] 微信客户端登录
- [x] 点赞、收藏、评论
- [x] 删除浏览历史、收藏、评论
- [x] 持久保存用户的登录状态、浏览历史、收藏等数据
- [x] 后台文章管理（发表、修改、删除、撤回、预览等功能）
- [x] 启动广告页
- [x] 热更新、版本更新
- [x] GPS定位
- [ ] 消息推送（极光推送：没调通，不弄了。。。）

## 部分截图

### 移动端

- 首页、详情页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_index.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_detail.png" width="365" height="619"/>

- 搜索页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_search.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_search2.png" width="365" height="619"/>

- GIF

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_1.gif" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/web_2.gif" width="365" height="619"/>

#### native端：

- 首页、详情页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_index.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_detail.png" width="365" height="619"/>

- 频道页、用户页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_channel.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_user.png" width="365" height="619"/>

- 后台文章管理页、广告页

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_health.png" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_ad.png" width="365" height="619"/>

- GIF

<img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_1.gif" width="365" height="619"/> <img src="https://github.com/uncleLian/vue2-news/raw/master/screenshots/native_2.gif" width="365" height="619"/>

## 目录结构

#### 总目录

``` bash
├── news-app                                     // native端项目  
├── news-web                                     // 移动端项目
├── screenshots                                  // 项目截图
├── mint-ui.common.js                            // 修改之后的mint-ui源码文件
├── README.md                                    // 项目介绍
```

#### 移动端目录

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

#### native端目录

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
│   │   ├── publishItem.vue                      // 后台文章列表组件
│   │   ├── tool.vue                             // 评论工具栏组件
│   ├── config                                   // 全局公用方法
│   │   ├── autoTextarea.js                      // textarea自动增加高度方法
│   │   ├── cache.js                             // 缓存方法
│   │   ├── cordova.js                           // cordova插件方法
│   │   ├── directive.js                         // 指令方法
│   │   ├── fetch.js                             // 请求方法
│   ├── page
│   │   ├── detail
│   │   |   ├── children
│   │   |   |   ├── comment.vue                  // 评论页
│   │   |   |   ├── reply.vue                    // 回复页
│   │   |   ├── components
│   │   |   |   ├── article.vue                  // 文章组件
│   │   |   |   ├── collect.vue                  // 收藏组件
│   │   |   |   ├── like.vue                     // 点赞组件
│   │   |   |   ├── recommend.vue                // 推荐组件
│   │   |   |   ├── share.vue                    // 分享组件
│   │   |   |   ├── tags.vue                     // 标签组件
│   │   |   ├── detail.vue                       // 详情页
│   │   ├── index
│   │   |   ├── collect
│   │   |   |   ├── collect.vue                  // 收藏页
│   │   |   ├── home
│   │   |   |   ├── children
│   │   |   |   |   ├── channel.vue              // 栏目页
│   │   |   |   ├── components
│   │   |   |   |   ├── homeHeader.vue           // 首页头部组件
│   │   |   |   |   ├── pullContainer.vue        // 下拉容器组件
│   │   |   |   |   ├── swiperContainer.vue      // 滑动容器组件
│   │   |   |   ├── home.vue                     // 主页
│   │   |   ├── user
│   │   |   |   ├── children
│   │   |   |   |   ├── health
│   │   |   |   |   |   ├── health.vue           // 文章管理页
│   │   |   |   |   |   ├── preview.vue          // 文章预览页
│   │   |   |   |   |   ├── publish.vue          // 文章编辑页
│   │   |   |   |   ├── feedBack.vue             // 用户反馈页
│   │   |   |   |   ├── myComment.vue            // 我的评论页
│   │   |   |   |   ├── myHistory.vue            // 我的历史页
│   │   |   |   |   ├── QRcode.vue               // 应用分享页
│   │   |   |   ├── user.vue                     // 用户页
│   │   |   ├── video
│   │   |   |   ├── video.vue                    // 视频页
│   │   |   ├── index.vue                        // 首页
│   │   |   ├── navBar.vue                       // 底部导航组件
│   │   ├── login
│   │   |   ├── login.vue                        // 登录页
│   │   ├── search
│   │   |   ├── search.vue                       // 搜索页
│   ├── router
│   │   ├── index.js                             // 路由配置       
│   ├── store
│   │   ├── collect                              // 收藏页store
│   │   ├── detail                               // 详情页store
│   │   ├── health                               // 文章管理store
│   │   ├── index                                // 首页store
│   │   ├── login                                // 登录store
│   │   ├── search                               // 搜索页store
│   │   ├── user                                 // 用户store
│   │   ├── video                                // 视频页store
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

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build
```

## 交流

欢迎热爱学习、忠于分享的朋友一起来交流
- QQ：771674109
- WX：L771674109


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present，uncleLian
