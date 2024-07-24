import { createApp } from 'vue'
import App from './App.vue'

// CSS
import 'normalize.css'
import '@/assets/css/index.css'
// import 'element-plus/theme-chalk/el-message.css'

import router from './router'
import pinia from './store'
import registerIcon from './global/register-icons'

const app = createApp(App)
app.use(registerIcon)
app.use(pinia)
app.use(router)
app.mount('#app')
