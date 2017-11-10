// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuetify from 'vuetify'

// non-Vue packages
import * as firebase from 'firebase'

// use customized styling
import './stylus/main.styl'

// Main application objects
import App from './App'
import router from './router'
import { store } from './store'

// Auxillary objects
import DateFilter from './filters/date'
import AlertCmp from './components/shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

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
    // check if a user is already logged on in the session
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const userData = {
          id: user.uid,
          registeredMeetups: []
        }
        store.dispatch('setUser', userData)
      } else {
        console.log('No user is signed in.')
      }
    })
    // load existing meetups from firebase
    // store.dispatch('loadMeetups')
  }
})
