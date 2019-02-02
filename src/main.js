import Vue from "vue";
import './plugins/vuetify'
import firebase from 'firebase';

import router from './router';
import store from './store';

import App from "./App.vue";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyAl_38j8WCn_-eGv7Gh6SeDtQO-sPuGGeE",
  authDomain: "rover9-c64db.firebaseapp.com",
  databaseURL: "https://rover9-c64db.firebaseio.com",
  projectId: "rover9-c64db",
  storageBucket: "rover9-c64db.appspot.com",
  messagingSenderId: "578259965974"
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
