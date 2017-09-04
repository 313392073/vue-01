import Vue from 'vue'
import VueRoute from 'vue-router'
import axios from 'axios'
import route from './router/router'

// import Icon from 'vue-svg-icon/Icon'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/style/global.css'
// import './assets/js/common'
import App from './App'

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(VueRoute)
// Vue.component('icon',Icon)

Vue.config.productionTip = false

var router = new VueRoute({
  mode:'history',
  routes:route
})

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
