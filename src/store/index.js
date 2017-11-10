import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'asdf234df',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda saepe tempora illo amet tenetur eveniet dolores corporis, alias odio, sunt vitae voluptas officia quisquam iusto perspiciatis eos hic expedita dolor.',
        title: 'Meetup in New York',
        date: new Date()
      },
      {
        imageUrl: 'http://www.calaimmigration.ca/wp-content/uploads/2014/01/Vancouver_City_2_by_ajithrajeswari.jpg',
        id: 'asdfwertwert',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla cupiditate soluta omnis aperiam quae possimus, quisquam illum fuga, odit illo est, eligendi consequuntur! Quia, dicta perspiciatis iusto eligendi, inventore necessitatibus!',
        title: 'Meetup in Vancouver',
        date: new Date()
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Karlsruhe_town_centre_air.jpg',
        id: 'karlsruhe',
        description: 'Karlsruhe is the second-largest city in the state of Baden-Württemberg, in southwest Germany, near the French-German border. It has a population of 307,755. The city is the seat of the two highest courts in Germany: the Federal Constitutional Court and the Federal Court of Justice. Its most remarkable building is Karlsruhe Palace, which was built in 1715.',
        title: 'Meetup in KA',
        date: new Date()
      }
    ],
    user: null,
    loading: false,
    error: null
  },

  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },

  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    setUser ({commit}, payload) {
      commit('setUser', payload)
    },
    loadMeetups ({commit}, payload) {
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedMeetups', meetups)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      // store it on the server
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          meetup.id = data.key
          commit('createMeetup', meetup)
          this.$router.push('meetups')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    }
  },

  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
