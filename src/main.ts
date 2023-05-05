import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import Icons from './global/register-icon'
import useLoginStore from './store/login/login'

// import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(Icons)
app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
