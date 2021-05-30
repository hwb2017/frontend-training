// import Vue from "./node_modules/vue/dist/vue.esm-browser.prod.js"

// Vue.mixins({
//   data() {
//       return {
//           common: "vue-mixins"
//       }
//   }
// })

// const app1 = new Vue({
//     el: '#app-1',
//     render() {
//         return Vue.h('p', 'app-1')
//     }
// })
// const app2 = new Vue({
//     el: '#app-2',
//     render() {
//         return Vue.h('p', 'app-1')
//     }    
// })
// Vue3中已经没有全局的Vue构造函数，所以以上代码会报错，使用 createApp 代替
import { createApp, h } from "./node_modules/vue/dist/vue.esm-browser.js"
const app = createApp({
    render() {
        return h(
            'p',
            'Hello World!'
        )
    }
}).mount('#app-1')