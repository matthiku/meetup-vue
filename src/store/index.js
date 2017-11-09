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
    user: null
  },

  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        id: payload.id,
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        imageUrl: payload.imageUrl
      }
      // store it on the server
      commit('createMeetup', meetup)
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
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
    }
  }
})
