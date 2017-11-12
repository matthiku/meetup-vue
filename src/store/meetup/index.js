import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },

  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      state.loadedMeetups.push(payload)
    }
  },

  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const meetup = {}
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(meetup)
        .then(() => {
          commit('updateMeetup', payload)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      // store the meetup on the server, first without the image reference (URL)
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          // return the key as a promise for the next chained method
          return key
        })
        .then(key => {
          // with the key from firebase, now upload the file
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          // with the file hopefully uploaded successfully, we now have the file data
          imageUrl = fileData.metadata.downloadURLs[0]
          // now we can update the meetup and add the reference to the uploaded file
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          // finally, we can store the new meetup in our local DB
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          commit('setError', error)
          console.log(error)
        })
    }
  },

  getters: {
    loadedMeetups (state) {
      // return meetups ordered by date / oldest first
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    registeredMeetups (state, getters) {
      if (!getters.user) {
        return []
      }
      // return meetups for which the current user is registered
      const meetups = []
      state.loadedMeetups.forEach((meetup) => {
        if (getters.user.registeredMeetups.find(id => id === meetup.id)) {
          meetups.push(meetup)
        }
      })
      return meetups
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 4)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
