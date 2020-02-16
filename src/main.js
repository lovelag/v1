import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import jQuery from 'jquery';

Vue.config.productionTip = false;

window.$ = window.jQuery = jQuery;
Vue.component('Navigation', require('./components/Navigation.vue').default);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
