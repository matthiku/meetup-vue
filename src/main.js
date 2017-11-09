// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuetify from 'vuetify'

import * as firebase from 'firebase'

import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'

import DateFilter from './filters/date'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/*
    eslint-disable no-new
*/
new Vue({
  el: '#app',

  router,

  store,

  template: '<App/>',

  components: { App },

  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBjajVOEmLbM4aHHuSQn8-J93S_PJtz2Vs',
      authDomain: 'vuejs-http-c91a5.firebaseapp.com',
      databaseURL: 'https://vuejs-http-c91a5.firebaseio.com',
      projectId: 'vuejs-http-c91a5',
      storageBucket: 'vuejs-http-c91a5.appspot.com'
    })
  }
})
