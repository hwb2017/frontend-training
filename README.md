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

### Tic Tac Toe(井字棋)
React入门教程

技术栈: React

总结:

1. 数组增加元素可以使用 push 和 concat 方法，区别是前者会更新原数组，而后者不更新原数组，而是返回一个新的副本，基于 React 的不可变数据的概念(总是用完整的新数据去代替旧数据，而不是在旧数据的基础上更新)，如果组件内部数据是数组类型的数据， 那么更新的时候应该用 concat 而不是 push
2. React的单向数据流和状态提升：“通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去”，“在 React 应用中，任何可变数据应当只有一个相对应的唯一数据源。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么你可以将它提升至这些组件的最近共同父组件中。你应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state”，React和Vue都是遵从从父组件到子组件的单向数据流，参考 [React官方文档 状态提升](https://react.docschina.org/docs/lifting-state-up.html)

### Toy React
极客大学 Toy React, 完成一个实现部分功能的简易 React 框架

技术栈: 原生JS

总结:

1. JSX技术是在 Javascript 中穿插 html 语法，以达到提高定义模板的效率(减少用createElement等冗长的dom语句), 它是依赖于 Babel 的一个插件实现的，即在预编译的过程中，将 Javascript 中的 html 语句转换为对应的 dom 创建方法(函数)，而React则提供这些函数的实现
2. React 中的 setState 语句用于更改组件的内部数据，是将新的 state 对象与旧的 state 对象进行合并，做一次深度拷贝，setState方法结束时会对组件内的节点进行重新渲染，Toy React中是基于 dom 的 range api 来实现元素定位的
3. 虚拟DOM技术可以减少DOM绘制次数和范围来降低对性能的影响，通过旧的和新的虚拟DOM树的比对，实现精细化更新，参考 [虚拟DOM的实现原理和优缺点](https://blog.csdn.net/zyq51/article/details/108741558)
4. 创建空对象时，使用Object.create(null)比用字面量{}的方式要好，因为字面量的方式会从Object原型中继承很多方法，参考[Object.create(null) 和 {} 的区别](https://juejin.cn/post/6844903733432680456)
5. Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回，但它可以通过Object.getOwnPropertySymbols()方法访问到，虽然不能做到完全私有，但是可以作为私有属性的替代解决办法

### Tic Tac Toe(AI实现)
极客大学前端训练营，实现TicTacToe的对战AI

技术栈: 原生JS

总结:

1. vertical-align 属性用来对齐一行的内联元素，默认是基线对齐，对于 inline-block 类型的元素，基线的确定规则是：当元素无文本内容，或者 overflow 属性不为 visible 时，基线为元素的 bottom margin；当元素包含文本内容时，基线为文本的基线位置。因此当一群 inline-block 元素中有的有文本，有的没有文本时，会出现“上蹿下跳”的现象，解决办法之一是将元素的 vertical-align 属性设置为 middle，即按照基线 + x-height 的位置来对齐，参考 [深入理解css中的vertical-align属性](https://www.cnblogs.com/starof/p/4512284.html)
2. Object.create(某个对象) 方法，即以某个对象为原型创建新的对象，可以作为克隆对象/数组的一种方法，好处是方法和数据都保存在原型中，当需要多次克隆时，这种克隆方法可以减少内存占用

### 对话框和滑动菜单栏的实现
网易云课堂原生JS实战，对话框和滑动菜单栏的实现

技术栈: 原生JS，CSS动画

总结:

1. 只有定位元素的 z-index 值才有效，定位元素与非定位元素重叠时会覆盖非定位元素，因此可以用来实现遮罩效果，参考 [深入理解css中position属性及z-index属性](https://www.cnblogs.com/zhuzhenwei918/p/6112034.html)
2. transition 和 animation 都可以用来实现 css 的动画效果，主要区别是前者是监听某个css属性变化时触发的，后者是在从元素渲染时触发的，参考 [transition与animation的区别](https://blog.csdn.net/liaozhongping/article/details/79511820)

### 食谱查询器
网易云课堂原生JS实战，通过grid布局实现一个食谱查询器

技术栈: 原生JS

总结:

1. grid布局可以应对一些复杂些的场景，参考 [阮一峰Grid布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
2. css的数据属性可以用于保存不需要渲染，但是可以用于后续JS处理的属性，比起通过在js中用数据结构保存属性，这种方式可以更好看出数据和某个html元素的绑定，参考 [MDN 使用数据属性](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Howto/Use_data_attributes)
3. 内联元素的宽高属性和 margin-top, margin-bottom 属性都不生效，宽高实际由内容大小决定，上下margin不会生效，但是在盒模型中可以看到具体值

### 异步编程Demo
极客大学异步编程练习

技术栈: 原生JS

总结:

1. Promise的引入解决了回调地狱影响代码可读性的问题，async/await的引入使得可以像书写同步代码一样写异步代码
2. async和generator配合可以实现一些无限时序流的效果

### 自定义音乐播放器
网易云课堂原生JS实战，使用audio API自定义音乐播放器

技术栈: 原生JS 

总结:

1. object-fit属性的作用类似background-size，都是设置背景图片的大小和裁剪，设置为 object-fit: cover 时，背景图片能保持原来的宽高比例，并根据容器大小进行裁剪，常用于设置头像的场景，参考 [css3 object-fit详解](https://www.cnblogs.com/ranyonsue/p/9367423.html)
2. css3伪元素比如 ::after，可以添加选中元素中的最后一个内联子元素，伪元素常见的使用场景有清除浮动、设置一些小图形等，参考 [CSS3 ::before和::after伪元素的实际应用](https://www.cnblogs.com/guangzhou11/p/7360589.html)
3. 事件监听函数中的this，如果是采用DOM2级的匿名函数的方式，则this指向触发事件的元素；如果采用DOM0级的onXxx函数或者使用DOM2级的箭头函数方式，则this指向全局window对象，参考 [事件监听函数中的this](https://blog.csdn.net/sinat_27088253/article/details/92696313)

### 寻路算法
极客大学寻路算法练习

技术栈: 原生JS, 数据结构与算法

总结: 

1. 在for循环中创建事件监听函数时，循环变量的声明要使用 let 而不是 var, 因为 var 声明是函数作用域，对于监听函数来说是全局作用域，监听函数只能获得循环变量最后的赋值，而 let 声明变量是块级作用域，即花括号内，每次循环中相当于重新声明，监听函数获取的是循环变量迭代中的不同赋值，参考 [for循环绑定事件时，var和let声明循环变量的区别](https://blog.csdn.net/wlk2064819994/article/details/79772388)
2. 深度/广度优先搜索算法的区别在于数据结构，广度优先使用的是队列，深度优先使用的是栈。广度优先算法的逻辑是: 获取起始结点的所有相邻节点 => 如果相邻节点没有被访问过且不是终点则插入队列，如果是终点则寻找结束 => 每次从队列头部取出节点，继续第一步。对于确定起点和终点之间的最短路径，一种方法是在插入结点时在另一个数据结构中记录它的前驱结点，然后从终点依次找到每个结点的前驱结点，最后可以得到一条路径。伪代码是
```
var frontier = new Array();
frontier.put(start);
var visited = new Array();
visited[start] = true;
while (frontier.length > 0) {
  current = frontier.get();
  if (current == end) {
    console.log("found");
    break;
  }
  for (net in graph.neighbors(current)) {
    var notInVisited = visited.indexOf(next) == -1;
    if (notInVisited) {
      frontier.put(next);
      visited[next] == true;
    }
  }
}
```
参考[让游戏角色快速找到最优路线：详解寻路算法的演进](https://gameinstitute.qq.com/community/detail/119033)
3. A* 算法是启发式的寻路算法，它和深度/广度搜索优先算法的区别是它用了可排序的数据结构，每次取数据时取优先级最高(离终点更近)的结点，提高寻路效率

### 信息流博客
网易云课堂原生JS实战，无限滚动博客项目

技术栈: 原生JS

总结:

1. 要区分函数签名和函数调用，如果某个函数需要作为参数传入，不能通过 函数名(函数参数) 的方式传入，这样会立即调用(闭包的情况除外)
2. addEventListener 的第二个参数可以传入一个回调函数或者 EventListener对象，执行时会调用该对象的 handleEvent() 方法。传入的回调函数应该具有与handleEvent()方法相同的参数和返回值;也就是说，回调接受一个参数：一个基于Event 的对象，描述已发生的事件，并且它不返回任何内容。参考 [MDN addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
3. 防抖与节流的实现，参考[防抖函数的完整实现](https://zhuanlan.zhihu.com/p/268012169)和[防抖与节流简单介绍](https://blog.csdn.net/m0_46157338/article/details/105861928)

### 2D小游戏-打砖块
网易云课堂原生JS实战，通过Canvas加 requestAnimationFrame 实现2D小游戏-打砖块

技术栈: 原生JS, canvas动画

总结:

1. 通过 requestAnimationFrame重绘canvas的好处在于，相对于setTimeout，requestAnimationFrame在页面未激活状态下不会刷新页面，节省CPU资源；requestAnimationFrame 保证在系统的屏幕刷新间隔内只执行一次，不用自己设置重绘时间，而且可以适配不同设备的屏幕刷新频率，参考[深入理解 requestAnimationFrame](https://blog.csdn.net/VhWfR2u02Q/article/details/79492303)

### LL算法进行语法分析
极客大学，使用LL算法构建AST练习

技术栈: 原生JS，数据结构与算法

总结:

1. 词法分析是识别代码中的字符是否属于规定的、可识别的字符集; 语法分析是基于产生式，将代码规约为各种表达式(乘法表达式、加法表达式、四则运算表达式)
2. LL算法基于的数据结构是栈，每次从栈顶 shift 出一个元素后，判断这个元素(或者包含后续相邻元素)是否满足某个产生式，如果满足，则把它处理为表达式的数据类型后再压入栈，直到栈中只剩一个不能再规约的表达式(四则运算表达式)和EOF为止