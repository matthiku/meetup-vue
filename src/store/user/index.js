import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },

  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      // check if user is already registered for this meetup
      if (state.user.registeredMeetups.findIndex(meetup => meetup === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      // save the firebase key of this registration with the user so that it is easier later to unregister
      // https://www.youtube.com/watch?v=d4nUU8vCT8U&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=22
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      let findRegistrationIndex = registeredMeetups.findIndex(meetup => meetup === payload)
      registeredMeetups.splice(findRegistrationIndex, 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch((error) => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      // get the firebase key we assigned to the local user during the registration in the mutation
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
          commit('unregisterUserFromMeetup', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    setUser ({commit}, payload) {
      const userData = {
        id: payload.uid,
        fbKeys: {},
        registeredMeetups: []
      }
      commit('setUser', userData)
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then((data) => {
          const dataPairs = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    signUserOut ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signOut()
        .then(() => {
          // Sign-out successful.
          commit('setLoading', false)
          commit('setUser', null)
        }).catch((error) => {
          commit('setError', error)
          commit('setLoading', false)
          // An error happened.
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
              fbKeys: {},
              registeredMeetups: []
            }
            commit('setUser', newUser)
            commit('fetchUserData')
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
              fbKeys: {},
              registeredMeetups: []
            }
            commit('setUser', newUser)
            commit('fetchUserData')
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
    user (state) {
      return state.user
    }
  }
}
