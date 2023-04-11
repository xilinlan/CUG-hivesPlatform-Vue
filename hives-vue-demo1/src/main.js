import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import './assets/global.css'
import './assets/LoginAndRegister.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register';
import svgIcon from './components/svgIcon.vue';
import CommentDialog from "./components/CommentDialog.vue";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
axios.defaults.baseURL = 'http://localhost:88/'

app.config.globalProperties.$http=axios

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('svg-icon', svgIcon)
app.mount('#app')
