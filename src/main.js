import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './assets/css/reset.css'
import './components/index'
import './filter/index'
// 引入elementUI
import ElementUI from "element-ui"
import "./less/element.scss"
Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
