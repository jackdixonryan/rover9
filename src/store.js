import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
});

export default store;