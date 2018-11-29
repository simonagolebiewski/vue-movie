import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    setUser: state => {
      state.user = Firebase.auth().currentUser;
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser');
    }
  },
  plugins: [vuexPersist.plugin]
});
