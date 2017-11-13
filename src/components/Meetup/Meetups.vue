<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>

        <v-card class="info mb-3" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>

              <!-- Alert Panel -->
              <v-layout row v-if="error">
                <v-flex sm12 md6 offset-sm2>
                  <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
              </v-layout>

              <!-- show image -->
              <v-flex xs5 sm4 md3>
                <v-card-media
                  height="125px"
                  style="cursor: pointer"
                  :src="meetup.imageUrl"
                  @click="showSingleMeetup(meetup.id)"
                ></v-card-media>
              </v-flex>

              <!-- show title, date and location -->
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title class="mb-0 pb-0">
                  <div>                  
                    <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                    <div>{{ meetup.date | date }} in {{ meetup.location }}</div>
                    <div class="yellow--text" v-if="userIsRegistered(meetup.id)">You are registered!</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn 
                    @click="showSingleMeetup(meetup.id)"
                    :flat="!userOwnsMeetup(meetup.creatorId)" 
                    :class="userOwnsMeetup(meetup.creatorId) ? 'info' : ''">
                    <v-icon left>{{ userOwnsMeetup(meetup.creatorId) ? 'edit' : 'arrow_forward' }}</v-icon>
                    {{ userOwnsMeetup(meetup.creatorId) ? 'Edit' : 'View' }} Meetup
                  </v-btn>
                </v-card-actions>

              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    },
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  },
  methods: {
    showSingleMeetup (id) {
      this.$router.push({name: 'meetup', params: { id: id }})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    userIsRegistered (meetupId) {
      return this.$store.getters.user.registeredMeetups.find(id => id === meetupId)
    },
    userOwnsMeetup (creatorId) {
      return this.$store.getters.user.id === creatorId
    }
  }
}
</script>

