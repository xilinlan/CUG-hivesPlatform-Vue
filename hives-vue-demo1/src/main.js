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
import VueClipboard from 'vue-clipboard2'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// axios.defaults.baseURL = 'http://localhost:88/'
const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

router.beforeEach((to,from,next)=>{
    if(window.sessionStorage.getItem('user')){
        next()
    }else{
        if(to.path==='/'){
            next()
        }
        else{
            next('/')
        }
    }
})

app.config.globalProperties.$http=service
app.use(VueClipboard)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('svg-icon', svgIcon)
app.mount('#app')
