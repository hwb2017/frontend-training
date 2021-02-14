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