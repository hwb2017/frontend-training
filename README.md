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