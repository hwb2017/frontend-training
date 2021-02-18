# frontend-training
前端练习项目

### 仿拉勾网首页
仿照拉勾网pc端的首页和登录页，参照千锋教育的一个实战课程

技术栈: HTML + CSS

总结:

1. 在父级元素内，子元素(块级)水平居中的方法是使用绝对定位, left 属性设置为 50%,margin-left 属性设置为 -x, x为子元素宽度的一半；垂直居中的方法类似。或者用flex布局解决
2. 子元素文本内容垂直居中的方法：属性 height 与 line-height(行高) 设置为一样，都等于元素的高度，这种做法实际上是增加了行距，参考 [CSS基线与行高](https://blog.csdn.net/qq_27875945/article/details/107499237)
3. 父级元素高度受到子元素影响问题的解决，参考 [a标签中使用img后的高度多了4px](https://blog.csdn.net/weixin_30267697/article/details/97574172)
4. 使用 display: inline-block 可以使得内联元素可以设置宽高，参考 [display:inline-block一些注意点](https://zhuanlan.zhihu.com/p/31856017)

### 简易表单验证
网易云课堂原生JS项目实战，表单验证

技术栈: 原生JS

总结:

1. viewport视窗大小自适应设置，参考 [meta viewport是做什么用的](https://zhuanlan.zhihu.com/p/68539694)
2. 布局模式之flex弹性布局，参考[MDN所有布局模式](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Introduction)和[阮一峰flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
3. min-height使用的前提是父级元素需要有明确的height值，如果父级元素没有指定高度的话，可以通过 min-height: 100vh 来实现占满屏幕的效果，100vh即100%视窗的大小，但是又不要求父级元素指定高度
4. absolute定位时的细节，是相对最近的、已经定位的祖先元素，一般把父级元素设置为 position: relative 即可，参考[css中为什么绝对定位的父级元素要相对定位](https://blog.csdn.net/weixin_41796631/article/details/89604749?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)
5. DOM2级事件处理程序比DOM0级事件处理程序更灵活，可以注册多个处理函数，还可以指定调用方式(冒泡流或者捕获流), 推荐用DOM2级的方式，参考[两者比较](https://blog.csdn.net/flyingpig2016/article/details/52966037)

### 电影座位预订Demo
网易云课堂原生JS项目实战，电影座位预订

技术栈: 原生JS

总结:

1. 同一CSS样式在不同操作系统/浏览器效果不同时，通过调整appearance属性，及相关的私有属性-webkit-appearance(适用于Chrome)和-moz-appearance(适用于FireFox)来进行适配，参考 [关于CSS appearance样式](https://blog.csdn.net/u012518659/article/details/49913999)
2. nth-child 和 nth-of-type 的区别，nth-child 是先把所有子元素排序，然后判断第 an+b 个元素是否符合CSS规则中声明的元素类型，不符合则不进行渲染；nth-of-type 是把子元素按元素类型分组，然后在分组中查找第 an+b 个元素。参考 [nth-child vs nth-of-type](https://bitsofco.de/nth-child-vs-nth-of-type/#:~:text=The%20nth-child%20%28%29%20and%20nth-of-type%20%28%29%20selectors%20are,extra%20information%20is%20the%20element%E2%80%99s%20position%20in%20)
3. CSS样式父级元素中的 perspective 配合子元素中的 translate 和 rotate等transform变换，可以实现一些高级的形变，参考 [CSS——景深perspective属性](https://blog.csdn.net/qq_41625074/article/details/104733796)
4. 一种简便的字符串数据类型转Number数值类型的方式，假设字符串变量为 str, 则 +str 即转换为数值类型。+号实际上是一元操作符，表示正整数，底层操作同 Number() 函数的转换

### 自定义简易视频播放器
网易云课堂原生JS项目实战，自定义播放器

技术栈: 原生JS

总结:

1. 媒体查询，通过查询媒体信息(设备是屏幕还是打印机，设备规格等)来调整样式，常用的方法有三种: 通过浏览器API、通过link/style 标签、通过 @media css样式，参考 [MDN使用媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)

### 汇率计算器
网易云课堂原生JS项目实战，汇率计算器

技术栈: 原生JS

总结:

1. fetch API 是ES6中提供的跨网络获取资源的方式，不同于axios和jQuery.ajax等库，它不是对 XMLHttpRequest 对象的封装，参考 [MDN使用Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
2. select等可以触发 change 事件的HTML元素，它的触发条件是 value 值改变和控件失焦，因此不能仅通过 javascript 中改变 value 值来触发，参考[JQ JS改变value值不触发change事件](https://blog.csdn.net/landylxy/article/details/77984874)

### 数组API使用Demo
网易云课堂原生JS项目实战，数组API使用Demo

技术栈: 原生JS

总结:

1. flex容器中，flex元素属性 flex: 1 的用处，flex属性实际是 flex-shrink, flex-grow, flex-basis 三个属性的简写方式，当父级容器中还有剩余空间时，flex-grow 大于等于 1的 flex元素会根据一定规则瓜分剩余空间，参考 [flex: 1 详解](https://www.jianshu.com/p/57a94430dcbe)
2. async/await 是基于 Promise 的语法糖，async放在包含异步调用的函数声明前，await 放在调用异步函数的语句前，当函数中包含多个 await 语句时，可以通过类似 Promise.all 的方法减少时间开销，参考 [mdn async和await:让异步编程更简单](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/%E5%BC%82%E6%AD%A5/Async_await)