import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/styles/index.scss'
import 'normalize.css'
import { loadAllPlugins } from './plugins'
import '@/permission'

const app = createApp(App)
// 加载所有插件
loadAllPlugins(app)

app.use(store).use(router).mount('#app')
