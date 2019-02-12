/* eslint disable */

import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import Mini from './views/Mini';
import User from './views/User';
import Test from './views/Test';
import Shop from './views/Shop';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'sign up',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/mini',
      name: 'Minigame',
      component: Mini
    },
    {
      path: '/user',
      name: 'User Profile',
      component: User
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
    },
  ]
});
