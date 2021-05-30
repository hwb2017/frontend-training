// Vue2.x 的动态组件加载方法，可以通过 es2020 的import() 函数来实现
// https://www.bookstack.cn/read/es6-3rd/spilt.10.docs-module.md
// const asyncPage = () => import('./NextPage.vue')

// Vue3.x中，异步组件的定义需要将其包装在新的 defineAsyncComponent 助手方法中来显式地定义
import { defineAsyncComponent } from 'vue'
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 不带选项的异步组件
const asyncPage = defineAsyncComponent(() =>
  import('./NextPage.vue'))

// 带选项的异步组件
const asyncPageWithOptions = defineAsyncComponent({
    loader: () => import('./NextPage.vue'),
    delay: 200,
    timeout: 3000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent
})