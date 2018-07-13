// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Home from './Home.vue';
import Towatchlist from './Towatchlist.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home},
  { path: '/towatchlist', component: Towatchlist}
];

const router = new VueRouter({
  routes, // short for `routes: routes`
  mode: 'history'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h=> h(App)
});
