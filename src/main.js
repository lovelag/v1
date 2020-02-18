import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import { fb } from './firebase'
import VueFirestore from 'vue-firestore'
import Vue2Filters from 'vue2-filters'
import 'popper.js'

require('firebase/firestore')
Vue.use(VueFirestore)
Vue.use(Vue2Filters)
Vue.config.productionTip = false
window.$ = window.jQuery = jQuery

Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.config.productionTip = false
const app = ''
fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
