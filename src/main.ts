import './init'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import '@/assets/styles/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'
const app = createApp(App)

// register plugin
registerPlugins(app)

// config Iconify
import { Icon } from '@iconify/vue'
app.component('Icon', Icon)

app.use(Antd).mount('#app')
