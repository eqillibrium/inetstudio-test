import { createApp } from 'vue'
import './style.css'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'

createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')
