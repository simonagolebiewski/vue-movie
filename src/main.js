// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App';
import Home from './Home.vue';
import Towatchlist from './Towatchlist.vue';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
import axios from 'axios';
import firebase from 'firebase';
import $ from 'jquery';
import { store } from './store/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
// Initialize Firebase
let app;
let config = {
  apiKey: "AIzaSyCsnmtrgAaPsI6Y3H0YXBMEDEdz7ImYjZY",
  authDomain: "vue-movie-firebase.firebaseapp.com",
  databaseURL: "https://vue-movie-firebase.firebaseio.com",
  projectId: "vue-movie-firebase",
  storageBucket: "",
  messagingSenderId: "752625808450"
};
firebase.initializeApp(config);

Vue.use(VueRouter);
Vue.use(Vuex);

export const bus = new Vue();

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      components: {
        header: MyHeader,
        home: Home,
        footer: MyFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/towatchlist',
      component: Towatchlist,
      components: {
        header: MyHeader,
        watchlist: Towatchlist,
        footer: MyFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) next('login');
  else if (!requiresAuth && user) next('home');
  else next();
})

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>',
      render: h=> h(App)
    });
  }
})
/* eslint-disable no-new */
