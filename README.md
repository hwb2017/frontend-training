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

### 字符串分析算法
极客大学，字符串分析相关的数据结构和算法

技术栈: 原生JS，数据结构与算法

总结:

1. 字典树(Trie)用于大量高重复字符串的存储与分析，一个典型的应用场景是HTTP服务器的路由匹配，KMP算法用于在长字符串里找模式串
2. 字典树是字符(word)的有序集合，是一个多叉树，在JavaScript中用Map或者Object都可以实现，因为Map是值=>值(即键也可以是数组、对象等)的集合，Object是字符串=>值的集合，它们都可以用于存储trie
3. 字典树的本质是利用字符串之间的公共前缀，将重复的前缀合并在一起，因此在构造过程中(insert)如果某个字符已经在trie中，则继续处理之后的字符，不存在则插入到前一个字符的叶子结点中
4. kmp算法旨在找到一种规律(模式串的自重复性)，使得某个位置的字符匹配失效时，不用从头开始匹配模式串，而是利用模式串的自重复性让它滑动更多位置，减少匹配次数
5. kmp算法最核心的数据就是PMT(partial match table,部分匹配表)，它是对模式串进行预处理得来的，PMT中的值是模式串的前缀字符串集合与后缀字符串集合的交集中的最长元素的长度，当模式串在j指针位置与原串不匹配时，原串的i指针位置不动，j指针移动到PMT[j-1]位就好(j指针位置的前缀字符集合是由0-j-1位置的字符决定的)，实际编程中为了处理方便会将pmt表处理为next数组
6. 在含有wildcard通配符的字符串匹配问题中，最后一个星号之前的星号应该尽量少匹配字符（可以通过RegExp.exec实现），最后一个星号尽量多匹配字符（可以从后往前进行确定字符匹配）

### 使用 Proxy 实现双向绑定(Vue3 reactivity API)
极客大学，proxy与双向绑定练习

技术栈: 原生JS

总结:

1. 双向绑定的重难点在于JS对象的数据到DOM方向的数据监听，因为DOM到JS方向的数据监听可以通过DOM的事件来实现。
2. proxy可以拦截对象的原生方法，可以用于写一些底层的库，但是这种元编程的特性可能带来一些不可预测性，不建议用在日常开发中
3. reactivity api 中，利用 effect 来调用一次回调函数，并记录所有响应了这次事件的元素及其属性(通过proxy的get方法)，保存到全局的callbacks Map中，保存对象，属性，以及它响应的回调函数列表；当之后再改变这些对象的属性时，就会触发相关的回调函数(通过proxy的set方法)，可以借助这点实现数据变更时触发DOM更新的效果
4. mousemove这类事件更适合绑定到全局的 document 对象上，而不是绑定到某个局部的 dom 对象上，避免出现鼠标移速过快时出现“拖断”现象。可以通过在 mousedown 事件中添加 document 的 mousemove 监听，并在事件结束时移除 document 的 mousemove 监听来实现

### Vue2.x模仿美团外卖移动端
网易云课堂，Vue实战仿美团外卖移动端

技术栈：Vue2.x

1. 本地模拟接口数据，如果数据规模较小，可以通过自己搭建Koa或者Gin搭建API服务，如果数据规模较大，可以通过引入 mock.js 或者更专业的mock工具，参考[前端开发如何做好本地接口模拟](https://segmentfault.com/a/1190000017775806)
2. vue 中我们改变数据时不会立即触发视图更新，如果需要实时获取到最新的DOM，这个时候可以手动调用 nextTick，nexTick接收一个回调函数作为参数，是DOM更新后执行该函数，本质上也是一个Vue内部基于JS执行机制实现的异步任务，参考[Vue3官方文档nextTick](https://vue3js.cn/global/nextTick.html)
3. Vue.set()是Vue2.x中实现追踪数据对象变化的一种办法，Vue中的data对象的所有属性都被vue转为了 getter/setter, 因此运行过程中临时给对象添加属性(这也是Javascript的对象的特性之一，允许运行时增加属性),Vue并不会自动地给它转为getter/setter，所以需要通过Vue.set()的方法来添加该属性，该属性才能是响应式的，参考[Vue.set()方法的使用](https://www.html.cn/qa/vue-js/17144.html)。Vue3之后，由于ES6中的Proxy特性，使得Vue监听对象属性增减更加方便，响应式的实现方法也与Vue2.x不同
4. 网页中图片加载时，如果图片加载后把原来的父级容器内容“撑开”，则会出现图片闪烁的现象，同时触发重绘和回流也会影响性能。一种好的做法是提前为图片位置预留空间，可以通过padding-top来实现，padding-top的值用百分比来呈现时，基准是容器的宽度，具体参考[利用padding-top/padding-bottom百分比，进行占位和高度自适应](https://www.cnblogs.com/daisygogogo/p/9344727.html)
5. Vue2.x中父组件调用子组件方法（比如调用子组件的show方法，因为show方法是子组件的可视性的开关，所以定义在子组件上符合内聚性）,由ref和emit/on两种方式，参考[Vue2.xvue父组件中调用子组件的方法](https://www.cnblogs.com/yuzhongyu/p/10825824.html)
6. 创建BFC的一个作用是可以清除浮动(识别容器内的浮动元素)，参考[前端面试题-BFC(块格式化上下文)](https://segmentfault.com/a/1190000013647777#:~:text=%E5%9D%97%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%8A%E4%B8%8B%E6%96%87%EF%BC%88Block%20Formatting,Context%EF%BC%8CBFC%EF%BC%89%E6%98%AFWeb%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%8F%AF%E8%A7%86%E5%8C%96CSS%E6%B8%B2%E6%9F%93%E7%9A%84%E4%B8%80%E9%83%A8%E5%88%86%EF%BC%8C%E6%98%AF%E5%B8%83%E5%B1%80%E8%BF%87%E7%A8%8B%E4%B8%AD%E7%94%9F%E6%88%90%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%E7%9A%84%E5%8C%BA%E5%9F%9F%EF%BC%8C%E4%B9%9F%E6%98%AF%E6%B5%AE%E5%8A%A8%E5%85%83%E7%B4%A0%E4%B8%8E%E5%85%B6%E4%BB%96%E5%85%83%E7%B4%A0%E7%9A%84%E4%BA%A4%E4%BA%92%E9%99%90%E5%AE%9A%E5%8C%BA%E5%9F%9F%E3%80%82%202.%E9%80%9A%E4%BF%97%E7%90%86%E8%A7%A3)

### Vue3.x基于ElementPlus的后台管理系统
Vue3 Onepiece: vue3-composition-admin

技术栈: Vue3.x TypeScript

1. browserslist 是可以根据项目根目录下的 .browserslistrc 查看应用支持的浏览器信息，也可以调用 browserslist 的API接口，对不同浏览器增加不同的适配JS代码。这部分配置也可以移入babel的target配置中。
2. .editorconfig 也是一种代码风格规范工具，不同于eslint专注于语法，它更关注缩进、尾部空格、换行符这些所有变成语言通用的代码风格，需要配合IDE工具的editorconfig插件使用
3. babel中有的插件需要安装为运行时依赖，比如 babel-plugin-transform-runtime & babel-runtime, 它们主要的作用是在低版本ES下提供 Iterator, Promise, Proxy 等ES6 API 的 polyfill(因为babel默认只是转译JS语法，不转译 API), 而同样功能的 babel-polyfill 是在编译时引入的，但会污染全局变量且包的体积较大，因此实际生产环境中还是有这两个runtime的插件比较多，比如 [vue-cli](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/babel-preset-app/package.json) 中就要到了这两个插件, 参考[一口气了解babel](https://zhuanlan.zhihu.com/p/43249121)
4. dotenv可以使得程序在多个环境中获取不同的配置，比如baseurl，参考 [React 项目多环境配置](https://zhuanlan.zhihu.com/p/95855648)
5. vue cli 中的 webpack 会自动进行 code vendor spliting, 这样可以把频繁变动的业务代码和较少变动的第三方模块分开打包，充分利用浏览器的缓存，减少打包文件的传输大小。其他code spliting 方面的最佳实践还包括按需加载，对于引用多次的代码共同打进一个chunk等，参考[Webpack 大法之 Code Splitting](https://zhuanlan.zhihu.com/p/26710831)
6. vue cli 创建vue3+typescript的项目后，会在src目录下创建 shims-vue.d.ts 文件，该文件用于告诉typescript如何解析引入的 .vue 文件，即把它认为是一个vue 的 component实例，该文件通过 tsconfig.json 中的 include src/**/*.ts 查找到，最终被typescript编译。
7. 在 typescript 中引入第三方非typescript编写的库是，还需要引入它们的声明文件才能起作用。一种方法是引入对应的 @types/<模块名>, 另一种方法是通过 declare module 自己编写该模块的声明文件，参考[type和@types](https://zhuanlan.zhihu.com/p/194196536)和[TypeScript官方文档module部分](https://www.tslang.cn/docs/handbook/modules.html)
8. 在单页应用中需要给不同路由做权限隔离时(比如login，register可以不用鉴权就可以访问，其他路由需要从vuex获取并校验token), 可以考虑在src目录下放一个 permission.js/ts 文件，它主要依靠从vuex 中获取login时存入的token并解析，然后通过 vue-router的路由守卫功能对用户的请求进行拦截
9. css-loader 使得开发者可以想导入js模块一样引用css文件，但这是导入一个解析后的js对象，要让css样式自动应用(写入html文件的style标签中)还要引入 style-loader, 参考[css-loader与style-loader的关系原理及作用](https://www.jianshu.com/p/d2470f719fee)
10. style-resource-loader 可以导入一些css预处理器的公共样式文件，避免每个css文件中都要导入，比如全局的 variable， mixin文件，参考[webpack中使用style-resources-loader
](https://www.jianshu.com/p/13d9f18faafe)
11. sass中的变量除了可以用于css引入外，还可以通过export指令用于在js文件中引入，如果是typescript的场景还需要额外增加一个xxx.scss.d.ts的文件，参考[在Typescript和Javascript中使用sass变量](https://mattferderer.com/use-sass-variables-in-typescript-and-javascript)
12. nomalize.css 是一个npm包，包含一些css样式文件，用于覆盖多家浏览器的默认样式，而统一使用一个默认样式，它是 css reset之类方案的替代品
13. mock服务用ts编写的话，可以下载 ts-node-dev 包，它的作用是允许在node环境中直接运行ts文件，并且在文件变更时重启服务，但是在生产环境中还是建议把ts编译成js后再运行，参考[我为什么要将Typescript与Express、nodejs一起使用](https://baijiahao.baidu.com/s?id=1617561336289671819&wfr=spider&for=pc)
14. 在实现一个有多模块的路由控制函数时，可以通过typescript的装饰器功能来封装 router 的 get 和 post 等方法，使代码有更好的业务/模块内聚性，类似于实现gin框架中的路由组功能，参考[TS装饰器初体验，用装饰器管理Koa接口](https://www.jianshu.com/p/f32ab4839b56)
15. Typescript中类型导入可以通过 import type 来显式声明
16. es6中的import()函数与node中的require函数都是动态(运行时)加载的，区别是前者是异步加载(返回promise)，后者是同步加载，import()函数也可以放在 async/await 的结构中进行同步加载; import()函数返回的模块对象会作为参数传递给resolve函数，参考[es6 import()函数](https://blog.csdn.net/ixygj197875/article/details/79263912)
17. webpack-dev-server 可以作为命令行工具使用，核心模块依赖是 webpack 和 webpack-dev-middleware。webapck-dev-server 负责启动一个 express 服务器监听客户端请求；实例化 webpack compiler；启动负责推送 webpack 编译信息的 webscoket 服务器；负责向 bundle.js 注入和服务端通信用的 webscoket 客户端代码和处理逻辑。参考[webpack-dev-server 运行原理](https://jishuin.proginn.com/p/763bfbd4c6f6)
18. 索引签名可以规定一个object对象中索引/键的数据类型和值的数据类型，参考[TypeScript 笔记（四） 类型字面量](https://zhuanlan.zhihu.com/p/61635691)
19. TypeScript 自带的工具类型可以获得函数的返回值类型(ReturnType)、参数类型(Parameters)等，参考[TypeScript官网 Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
20. 当需要引入某个文件夹下的所有模块时，可以通过 require.context() 方法，它自带的几个参数用起来也比基于 file.readdirSync 方法去实现批量引入方便得多，参考[require.context()的用法详解](https://blog.csdn.net/pinbolei/article/details/115620728)
21. vue-router库中，组件要从当前路由获取参数的话，可以从 $route或者 useRoute() 方法来获取，或者使用props属性的布尔模式或者函数模式来获取路由中的参数或者查询，参考[Vue-Router4.x官方文档](https://next.router.vuejs.org/zh/guide/essentials/passing-props.html)
22. vue-router中所有的route路由记录都是挂载在matcher对象上的，可以新建一个 router，用它的matcher对象替换原有router实例的matcher对象，达到重置路由的效果。重置路由主要用在不同权限不同路由规则的场景中，当用户切换权限角色时，可以调用resetRouter方法把动态添加的权限相关的路由记录清除掉。参考[vue-router 源码探究——路由重置实现](https://set.sh/post/190626-how-to-reset-routes-in-the-vue-router)
23. vuex中的类型泛型主要是围绕state来的，比如Store类型中传入state来定义根状态需要包含哪些数据字段，Module类型中传入state和rootState来定义模块命名空间中需要包含哪些数据字段，并引入RootState供getter和action作为参数类型，参考vuex的类型定义文件。 
```typescript
export interface Module<S, R> {
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>;
}
```
24. TypeScript中的declare module，不仅可以给未提供类型声明文件的模块定义类型，还可以给已经提供类型声明文件，但是不全的模块来定义类型，这被称为模块补充(module augmentation)。参考[Vue 组件中 $store属性的类型声明](https://next.vuex.vuejs.org/zh/guide/typescript-support.html#vue-%E7%BB%84%E4%BB%B6%E4%B8%AD-store-%E5%B1%9E%E6%80%A7%E7%9A%84%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)
25. TypeScript中，可以使用ObjectConstructor来表示一个对象实例类型，如果要访问对象的原型方法，可以使用Object接口，参考[一文读懂 TS 中 Object, object, {} 类型之间的区别](https://cloud.tencent.com/developer/article/1610691)
26. defineComponent的作用，实际上就是返回传递给它的对象，或者把传递给它的函数转为对象，主要是能够适配在不同参数形式下的类型推断，比如有无 props 的场景。参考[Vue3 - defineComponent解决了什么？](https://blog.csdn.net/qq_36157085/article/details/109498473)
27. 按需引入组件库可借助 babel-plugin-component 组件，参考[浅析babel-plugin-component](https://juejin.cn/post/6844904077634060302)
28. 在vue的单文件组件中，template标签常用于条件渲染分组和复杂列表项的渲染，它是由HTML5引进的新标签元素，参考[vue中的template标签](https://zhuanlan.zhihu.com/p/114246194)
29. web安全(隐私)问题，在页面中通过新标签页(target=_blank)的形式打开外链时,可以设置a标签的rel值为 noreferrer noopener,保护源站的信息不被获取，参考[聊聊 rel=noopener](https://www.cnblogs.com/10yearsmanong/p/12222786.html)
30. composition api 中，setup方法接受两个参数，一个是props，因为setup的执行时期是在组件解析了props之后，因此可以获取props；第二个参数是 setupContext, 它包含三个成员 attrs, emit, slot，用以代替 this.$attrs, this.$emit, this.$slot, 因为setup是在组件实例创建完成之前执行的，没有this。参考[熬夜总结vue3中setUp函数的2个参数详解](https://www.cnblogs.com/IwishIcould/p/14952332.html)
31. vue3 的 emit 的流程是子组件触发一个自定义事件，父组件监听，并调用父组件上的方法来handle，这样做的好处是，如果handle函数中设计到对全局 store 的访问，而且父组件中其他函数已经用到了store，那么子组件只要触发父组件的回调即可，不在在子组件中再引入 store
32. 由于vue router中存在不同路由路径复用同一组件的情况，复用时组件后续的 mount 相关声明周期将不再执行，解决方法是给 router-view 添加 key 属性，并执行 route.path (有的情况也可以使用route.fullPath，考虑不同的查询字符串情况), 参考[VUE router-view key 属性解释](https://www.cnblogs.com/yg_zhang/p/10867617.html)

### 自己打造组件库 cloud-console-design
参照aws的组件API文档，自己动手实现一个组件库

技术栈: Vue3.x TypeScript
1. 引入npm包时，具体引入哪个entry文件，需要看npm包的package.json中的main，module，browser字段是怎么定义的，还需要看打包工具的构建目标是啥(比如webpack的默认构建模板target是web,在浏览器中运行的web应用)，具体是当构建目标为web时，默认的加载判断顺序是 browser+mjs > module > browser + cjs > main, 参考[package.json中你还不清楚的browser，module，main 字段优先级](https://www.cnblogs.com/h2zZhou/p/12929472.html)
2. npm pubilish 时的文件包含规则，参考[npm 发布如何忽略指定的文件](https://blog.csdn.net/terrychinaz/article/details/112976268)
3. element-plus 和 ant-design-vue 中package.json main/module 对应的入口文件都是 esm 规范的，前者基于 rollup 对每一个组件打包，后者通过 gulp 统一对所有的组件模块进行处理; unpkg 对应的入口文件都是通过webpack打的 umd 模块规范的包。在css分包和压缩方面，二者都选用 mini-css-extract-plugin 和 css-minimizer-webpack-plugin。按需加载方面前者使用 babel-plugin-component, 后者使用 babel-plugin-import, 没有本质区别，前者是从后者 fork 出来的一个分支
4. 按需引入和Tree-shaking 本质上都是 live code inclusion, 区别是前者是在babel转移时做地址转换处理，后者(以Webpack为例)是在构建bundle时标记，然后在压缩混淆过程中删除标记未无用代码的部分。Tree-shaking只能删除没有副作用的代码(访问引用对象的getter或setter方法即视为有副作用)，经过Babel转移后可能很多代码都会有副作用，如果打包工具支持的话，可以在 package.json 中加入 sideEffetcs: false 消除副作用。参考 [按需引入和Treeshaking的区别](https://www.jianshu.com/p/e62deb8d444a), [深入浅出 sideEffects](https://zhuanlan.zhihu.com/p/41795312)
5. typescript 中 typeof + 自定义 tuple 的用法，可以把元组中的所有元素组合成联合类型，参考[What does typeof tuple with index type signature represents](https://stackoverflow.com/questions/56897267/what-does-typeof-tuple-with-index-type-signature-represents)
6. 使用 vue-types 来简便地定义 props 的类型检查和验证函数，参考[VueTypes官方文档](https://dwightjack.github.io/vue-types/#when-to-use)
7. vue 中的 scoped style 是利用属性选择器实现的样式"私有化，scoped 样式设计的初衷就是不改变其他地方的同名样式，也不容易被其他地方覆盖，因此在组件库中要谨慎使用，参考 [vue中慎用style的scoped属性](https://2ue.github.io/2017/11/15/vue-style-scoped/)和[vue---style scoped属性的作用和原理、scoped穿透](https://blog.csdn.net/maidu_xbd/article/details/106361205#:~:text=%E5%9C%A8vue%E6%96%87%E4%BB%B6%E4%B8%AD%E7%9A%84style%E6%A0%87%E7%AD%BE%E4%B8%8A%EF%BC%8C%E6%9C%89%E4%B8%80%E4%B8%AA%E7%89%B9%E6%AE%8A%E7%9A%84%20%E5%B1%9E%E6%80%A7%20%EF%BC%9A%20scoped%20%E3%80%82,%E5%BD%93%E4%B8%80%E4%B8%AAstyle%E6%A0%87%E7%AD%BE%E6%8B%A5%E6%9C%89%20scoped%E5%B1%9E%E6%80%A7%20%E6%97%B6%EF%BC%8C%E5%AE%83%E7%9A%84CSS%E6%A0%B7%E5%BC%8F%E5%B0%B1%E5%8F%AA%E8%83%BD%20%E4%BD%9C%E7%94%A8%20%E4%BA%8E%E5%BD%93%E5%89%8D%E7%9A%84%E7%BB%84%E4%BB%B6%EF%BC%8C%E4%B9%9F%E5%B0%B1%E6%98%AF%E8%AF%B4%EF%BC%8C%E8%AF%A5%E6%A0%B7%E5%BC%8F%E5%8F%AA%E8%83%BD%E9%80%82%E7%94%A8%E4%BA%8E%E5%BD%93%E5%89%8D%E7%BB%84%E4%BB%B6%E5%85%83%E7%B4%A0%E3%80%82)
8. sass 中的 !default 语法，表示如果在此之前变量已经赋值，那就不使用默认值，如果没有赋值，则使用默认值; !global 将局部变量转化为全局变量，参考[Scss学习--定义变量!default、!global、!optional](https://blog.csdn.net/hide_in_darkness/article/details/107540449)
9. css中的属性选择器也是支持正则表达式的，参考 [css 选择器中的正则表达式](https://www.cnblogs.com/xiaofenguo/p/6134303.html#:~:text=css%E5%B1%9E%E6%80%A7%E9%80%89%E6%8B%A9%E5%99%A8%E4%B8%8E%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%EF%BC%9A%201%20%5Battr%3D%22val%22%5D%20%E9%80%89%E6%8B%A9attr%E5%B1%9E%E6%80%A7%E5%80%BC%E5%8F%AA%E4%B8%BAval%E7%9A%84%E5%85%83%E7%B4%A0%3Cdiv%20attr%3D%22val%22%2F%3E%202%20%5Battr%5D%E9%80%89%E6%8B%A9%E6%9C%89attr%E8%BF%99%E4%B8%AA%E5%B1%9E%E6%80%A7%E7%9A%84%E5%85%83%E7%B4%A0%EF%BC%88%E5%8C%BA%E5%88%86%E5%A4%A7%E5%B0%8F%E5%86%99%EF%BC%89,%3Cdiv%20attr%3D%22val%22%2F%3E%20%3Cdiv%20attr%20%2F%3E%20%3Cdiv%20attr%3D%22val5435454%22%2F%3E)
10. 在有一定规模的CSS文件中，可以使用 B.E.M. 规范来组织css代码，element-plus 的 theme-chalk 就是使用这种规范，参考[如何看待 CSS 中 BEM 的命名方式？](https://www.zhihu.com/question/21935157)
11. scss 中有个颜色相关的函数 mix，可以通过两种颜色并设置第一种颜色所占的比例来混合新颜色，比较适合设置元素在 hover 或 active 时的短暂明暗变化，参考[Sass:RGB颜色函数-Mix()函数](https://www.cnblogs.com/qjuly/p/9125219.html)
12. scss 中的变量可以结合 css3 中的变量来使用，css3的变量支持在运行时被 js 所改变，适合用于设置全局主题或风格相关的变量，参考[利用css3的var()实现运行时改变scss的变量值](https://blog.csdn.net/weixin_44392565/article/details/85755592)
13. -webkit-appearance: none 私有属性可以用于去除某个控件在浏览器中的默认样式，由开发者来统一确定样式，参考[CSS：关于“-webkit-appearance: none”样式使用问题](https://blog.csdn.net/u012518659/article/details/49913999#:~:text=-webkit-appearance%20%E6%98%AF%E4%B8%80%E4%B8%AA%20%E4%B8%8D%E8%A7%84%E8%8C%83%E7%9A%84%E5%B1%9E%E6%80%A7%EF%BC%88unsupported%20WebKit,property%EF%BC%89%EF%BC%8C%E5%AE%83%E6%B2%A1%E6%9C%89%E5%87%BA%E7%8E%B0%E5%9C%A8%20CSS%20%E8%A7%84%E8%8C%83%E8%8D%89%E6%A1%88%E4%B8%AD%E3%80%82%20%E6%AD%A4%E5%B1%9E%E6%80%A7%E9%9D%9E%E6%A0%87%E5%87%86%E4%B8%94%E6%B8%B2%E6%9F%93%E6%95%88%E6%9E%9C%E5%9C%A8%E4%B8%8D%E5%90%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8B%E4%B8%8D%E5%90%8C%EF%BC%8C%E6%9C%89%E4%BA%9B%E5%B1%9E%E6%80%A7%E5%80%BC%E7%94%9A%E8%87%B3%E4%B8%8D%E6%94%AF%E6%8C%81%EF%BC%8C%E8%AF%B7%E6%85%8E%E7%94%A8%E3%80%82%20webkit%E6%98%AF%E4%B8%80%E7%A7%8D%E6%B5%8F%E8%A7%88%E5%99%A8%E7%A7%81%E6%9C%89%E5%89%8D%E7%BC%80%2C%E6%98%AF%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AF%B9%E6%96%B0css%E5%AE%9E%E7%8E%B0%E7%9A%84%E4%B8%80%E4%B8%AA%E6%8F%90%E5%89%8D%E6%94%AF%E6%8C%81-webkit-%E5%89%8D%E7%BC%80%E6%98%AF%E6%8C%87webkit%E5%86%85%E6%A0%B8%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%2C%E4%B8%8E%E4%B9%8B%E7%9B%B8%E5%90%8C%E7%9A%84%E8%BF%98%E6%9C%89%E4%B8%80%E4%B8%AA%E6%B5%8F%E8%A7%88%E5%99%A8%E7%A7%81%E6%9C%89%E5%89%8D%E7%BC%80-moz-%2C-moz-%E6%98%AF%E6%8C%87Firefox%E5%86%85%E6%A0%B8%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8)
14. pointer-events: none 属性可以使元素避免成为鼠标事件的目标，针对鼠标事件可以达到禁用元素的目的，同时不像 cursor: not-allowed 那样在鼠标 hover 时会产生禁用图标，适合用于元素 loading/pending 状态
15. node.js 中json文件有 fs.readFile, require, import (esm) 三种导入方式，import 方式导入仍处于实验阶段，参考[How to import JSON files in ES modules](https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/)
16. typescript 中设置 noImplicitAny 为 false，可以将未设置类型的变量的类型置为 any，减少一部分类型声明的工作，参考[我应该使用noImplicitAny TypeScript编译器标志吗](https://segmentfault.com/a/1190000019768261)
17. 使用 autoprefixer 可以给css属性加上适配多种浏览器的前缀，参考[AutoPrefixer](https://www.jianshu.com/p/f5b0b92e6b0f)
18. rollup 中可以使用 rollup-plugin-postcss 来单独处理css, 依赖的sass预处理器应该下载sass(dart-sass)，而不是node-sass, 参考[rollup-plugin-postcss npm文档](https://www.npmjs.com/package/rollup-plugin-postcss/v/2.4.1) 和 [rollup从入门到打包一个按需加载的组件库](https://juejin.cn/post/6934698510436859912#heading-6)
19. rollup 和 webpack 这样适用于将那些有较少入口文件、能够形成依赖图的所有文件打包成少数几个文件，如果是有多个目录需要单独打包，则使用 gulp 这样的构建工具会更灵活
20. package.json 中的style字段可以指向npm包中的css文件，postcss 或 sass 这样的css预处理器都可以从下载的npm包中根据 style 字段导入样式，参考[PACKAGE.JSON "STYLE" ATTRIBUTE](https://jaketrent.com/post/package-json-style-attribute)
21. 组件库项目通过cdn方式全量引用时可以进行代码压缩，如果是提供给项目引用的话，则没必要进行代码压缩。因为混淆后的代码无法根据组件名进行按需加载，而且引用组件库的Web应用项目最终也会进行代码压缩，没必要在组件库层面就压缩。
22. 目前主要的图标方案有字体图标和SVG图标，SVG图标的主要好处是1. 通过内联SVG代码的方式，减少一次http请求(字体图标需要额外下载字体库) 2. 更细粒度的颜色和动画控制(字体图标只能做整体的颜色转换和动画效果) 3.更好的稳定性，字体图标可能因为加载中或加载错误，导致所有图标都显示黑框。主要确定是对旧客户端的兼容性不太好，需要搭配字体图标作为降级方案。参考[Icon Fonts vs SVG – Clash of the Icons](https://www.lambdatest.com/blog/its-2019-lets-end-the-debate-on-icon-fonts-vs-svg-icons/)
23. iconfont 字体文件下载的时机，不同浏览器有不同行为，IE 8浏览器是由定义font-face就下载，Firefox和IE9是在引用 font-family 样式时下载，Chrome和Safari是在有文字内容匹配时才下载。加载图标字体过程中还有可能出现FOIT(Flash of Invisible Text)和FOUT(Flash of Unstyled Text)的现象。参考[CSS @font-face性能优化](https://zhuanlan.zhihu.com/p/67616144)
24. 组件库中如果要给用户提供几个预置的样式，可以通过 -normal、-primary 等variant形式的样式，如果要给用户更大的自由度，可以传入color size等变量来改变样式，可以封装css variable 的接口给用户，参考[In vue.js component, how to use props in css?](https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css)
25. node child_process 可以通过异步的方式获取执行程序的返回码和输出，并执行回调函数，参考[Node.js spawn child process and get terminal output live](https://stackoverflow.com/questions/14332721/node-js-spawn-child-process-and-get-terminal-output-live)
26. webpack中，sideEffects 是模块/文件级别的dce(死代码清除), usedExports 是语句级别的dce，前者比后者更容易处理也更高效，一般只要不是polyfill或者shim类型的包都可以配置为 sideEffects: false，表示自己是无副作用的，未引用的模块、子树可以直接删除，参考[Webpack官方文档-TreeShaking](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)
27. vue3 组合式API中，组件的状态和方法基本都在setup函数中声明，都可以互相访问，不用像选项式API中那样通过this访问组件的状态和方法，因此组合式API中不建议使用 getCurrentInstance 代替 this 获取内部组件实例上的状态属性和方法，参考[关于Vue3获取当前组件实例的 getCurrentInstance 方法的补充](https://blog.csdn.net/l_ppp/article/details/110290182)
28. vue 的 provide/inject 机制除了用于祖孙组件之间通信以外，还可以用于限制某个组件只能作为其他组件的子组件使用，比如 element plush 中标签页组件中，tab bar 组件中会判断 tab 组件是否在它的外层组件中:
```javascript
    const rootTabs = inject<RootTabs>('rootTabs')
    if (!rootTabs) {
      throw new Error(`ElTabBar must use with ElTabs`)
    }
```
29. vue 中父组件可以把自己的方法通过props转递给子组件，使子组件可以调用父组件的方法，达到改变组件级别共享状态的目的，父组件可以通过模板引用 ref 的方式访问子组件实例并调用子组件方法，改变子组件的状态
30. vue 的 ref 属性处理用于引用子组件外，还可以用于用于模板/渲染函数内的原生html元素，可以获取元素的dom属性，比如长宽高等
31. 组件性能优化的技巧之避免无意义的渲染，vue中组件或计算属性依赖的响应式属性变更时即会触发依赖的重新收集和视图重新渲染等，但是有时候这会没有意义，比如计算属性的计算过程从 1 + 1 变为 2 + 0, 但是计算属性的值没有变化，此时不应该再继续派发更新。可以缓存计算属性之前的值跟最新的值做比较，如果没有变化则不派发更新。vue中的计算属性和element plus 中的标签页组件的pane组件更新都有做此类优化
32. typescript 中的类型守卫可以用于缩小变量的类型取值，在类型确定的 if/else 语句块中，可以直接把变量当作确定的类型来使用，或者通过 return/throw 等语句，使得 if/else 语句块之外，变量的类型也被永久的缩小，参考 [Typescript Type Guards](https://www.typescripttutorial.net/typescript-tutorial/typescript-type-guards/#:~:text=%20TypeScript%20Type%20Guards%20%201%20typeof.%20First%2C,can%20also%20use%20it%20as%20a...%20More%20)
33. 对于页面中的可聚焦元素，除了默认的通过鼠标点击和tab键获取和失去焦点外，还要支持对 window.focus 和 window.blur 事件的监听，使得页面中的元素可以在浏览器窗口转移到后台时失焦，转移到前台时设置focusable: true 之类的开关获得聚焦能力；支持 document.visibilityState 事件的监听，使得页面中的元素可以在浏览器标签页不活跃时失焦，标签页活跃时设置focusable: true 之类的开关获得聚焦能力
34. vue 的 inheritAttrs 用于选择是否继承父组件上传递的非props的属性，默认是继承，对于一些避免接收所有用户输入的组件，可以把 inheritAttrs 设置为 false，然后在组件内通过 this.$attrs.xxx 来访问固定的几个属性
35. css3 变量作为局部变量时是具有作用域的，且只有所属的选择器及其后代选择器内生效，可以配合 calc 和 counter 来实现实时地对css属性进行更新，类似函数调用，参考 [CSS var变量的局部作用域（继承）特性](https://www.zhangxinxu.com/wordpress/2019/01/css-var-%e5%8f%98%e9%87%8f-%e5%b1%80%e9%83%a8/)
36. javascript 的 delete 操作符可以删除对象的key，但是对象的key对应的value如果是引用类型的话，它所占用的内存不会自动释放，因此更好的办法是在删除key之前先通过 `object[key] = null` 的方式释放对 value 的引用，参考 [MDN delete操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)
37. stopImmediatePropagation 可以阻止在同一元素上后续事件监听函数的执行，而 stopPropagation 阻止事件在父级容器上的传播
38. typescript 设置函数的返回值类型为 void 时，只有在函数调用时通过 void 进行注解才有用，在函数 interface 声明中注解没有用
```typescript
// void注解无效
export interface CFormContext {
  registerLabelWidth?(width: number, oldWidth: number): void
  deregisterLabelWidth: (width: number) => void
}
// void注解有效
const cFormContext: CFormContext = {
  registerLabelWidth(width: numbser, oldWidth: number): void {
    return
  }
}
```
39. 组件内部各元素的联动更新可以通过状态和状态的设置函数来解耦，比如 states.XXX 和 setXXX, 这样子元素的更新逻辑可以通过 setXXX 统一暴露，可以多出复用，父元素不用知道它的内部实现。同时也把状态的更新(setXXX)和dom的更新解耦了

### 移动端H5活动项目

技术栈: preact等

1. 通过url传复杂的参数时，为了更安全地保证url解析不被破坏，可以引入base62对参数进行编码，参考 [为什么使用 base62](https://razertory.github.io/2020/12/25/why-base62/)
2. 移动端的模态框滚动穿透问题，可以借助库 tua-body-scroll-lock 来解决, 参考 [重新认识滚动穿透](https://zhuanlan.zhihu.com/p/373328247)
3. react-loadable 用于提供组件级别的代码按需加载，并提供加载动画、延时、超时等辅助功能