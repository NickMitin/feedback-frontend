import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from 'bootstrap-vue'
import VueMask from 'v-mask'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(VueMask)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
