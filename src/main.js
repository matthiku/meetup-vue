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
import TimeFilter from './filters/time'
import AlertCmp from './components/shared/Alert.vue'
import EditMeetupDialog from './components/Meetup/Edit/EditMeetupDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.filter('time', TimeFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-dialog', EditMeetupDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/*
    eslint-disable no-new
*/
new Vue({
  el: '#app',

  router,

  store,

  template: '<App/>',

  components: { App },

  // run initialization
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBjajVOEmLbM4aHHuSQn8-J93S_PJtz2Vs',
      authDomain: 'vuejs-http-c91a5.firebaseapp.com',
      databaseURL: 'https://vuejs-http-c91a5.firebaseio.com',
      projectId: 'vuejs-http-c91a5',
      storageBucket: 'gs://vuejs-http-c91a5.appspot.com/'
    })

    // check if a user is already logged on in the session
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.dispatch('setUser', user)
        store.dispatch('fetchUserData')
      } else {
        console.log('No user is signed in.')
      }
    })

    // load existing meetups from firebase
    store.dispatch('loadMeetups')
  }
})
