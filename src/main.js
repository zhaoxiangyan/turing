import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import moment from 'moment'
// var Index = require('element-ui/lib/theme-default/index.css')
import Vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'
import 'font-awesome/css/font-awesome.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(Vuex)
axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'https://192.168.0.119'
Vue.prototype.$http = axios
// Vue.use(Index)

// 全局自定义指令改变路由title
// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.innerText
//     // el.remove()
//   }
// })
// 全局自定义指令改变路由title

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

