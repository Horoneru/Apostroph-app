// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/utilities.css';

import App from './App';
import router from './router';
import store from './store';

import VueIntro from 'vue-introjs';
Vue.use(ElementUI);
Vue.use(VueIntro);
Vue.config.productonTip = false;

// eslint-disable-next-line
String.prototype.capitalize = function(){
  return this.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
