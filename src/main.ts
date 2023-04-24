/*
 * @author: SumO
 * @create: 2022-12-02 14:12 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-23 16:31 PM
 * @desc: 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'
import '@wangeditor/editor/dist/css/style.css'

Vue.use(ElementUI)
// 关闭生产环境提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
