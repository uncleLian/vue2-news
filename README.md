# news

### 一个基于Vue2.x 框架开发的移动端单页面新闻类项目

#### 开发环境：
*   vue-cli + webpack 构建
*   技术栈：
    + stylus
    + es2015 
    + vue2.x 全家桶( vue + vue-router + vuex )
*   其他库：
    + mint-ui 
    + vue-awesome-swiper 
    + fastclick 
    + jquery

#### 说明： 
##### 一、修改mint-ui / mint-ui.common.js的loadMore组件源码：
1.  下拉阈值，0 => 5 （增强流畅感）
2.  添加属性 distance (用于左右滑动时，禁止下拉)
3.  在handleTouchEnd里添加```event.preventDefault();event.stopPropagation();```
(与fastclick冲突，下拉结束时会在当前鼠标位置的元素上触发一次点击事件) 

4.  添加了触摸判断，下拉ing / 下拉end去除，上滑添加```-webkit-overflow-scrolling: touch;```
( 解决ios端下无法下拉或滚动不流畅的bug )

#### 二、web端 / app端 差异

* **web**
    + **页面** ：index页面，多了indexFooter组件 
    + **响应式** ：淘宝 flexble.js 方案
    + **分享** ：```window.location.href```
    + **其他** ：安卓端 index / detail 页面底部均有apk 下载链接
* **app**
    + **页面** ： ios 端页面顶部，增加20px高度
    + **响应式** : 媒体查询 media
    + **分享** ：原生客户端
    + **其他** ：禁止了新闻来源
    

####  三、功能详情

* **Index 页面**
    + nav滚动居中
    + 下拉加载、上滑加载更多
    + 左右滑动切换栏目
    + 上次浏览到这里
* **Detail 页面**
    + 分享功能
    + 展开全文
    + 文章标签 （ 点击进入 search 页面 ）
    + 文章推荐
    
* **Search 页面**  
    + 搜索功能


* **访问量统计：**
```
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?87e080ee32b19db3f8adcacfb178347a";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
```
* **详情页浏览统计：**
```
$.ajax({
    url: `http://api.toutiaojk.com/public/ViewClick/?classid=${this.classid}&id=${this.id}&addclick=1`,
    type: 'GET'
})
```

* **其他**
    + 点击页面顶部，返回头部
    + 右滑页面，返回上一页
    + sessionStorage 缓存

