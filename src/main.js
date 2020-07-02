import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/premisson'
import './assets/index.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from '@/utils'
import components from './components'
Vue.use(components)
// 全局注册element-ui
Vue.use(Element)
// 配置请求头以及给原型属性

Vue.prototype.$axios = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
