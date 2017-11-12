<template>
  <v-container fluid>
    <v-layout row wrap>

      <!-- Alert Panel -->
      <v-layout row v-if="error">
        <v-flex sm12 md6 offset-sm2>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>

      <v-flex xs12 class="text-xs-center">
        <!-- show loader icon while loading -->
        <v-progress-circular 
          v-if="isLoading" 
          indeterminate 
          :width="7"
          :size="70"
          color="primary"
        ></v-progress-circular>
      </v-flex>

      <v-flex xs12>

        <v-card mt-0 v-if="!isLoading">

          <v-card-title>
            <h6 class="primary--text">{{ meetup.title }}</h6>
          </v-card-title>

          <v-card-media
            :src="meetup.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <span v-if="!userIsCreator">{{ meetup.date | date }} in {{ meetup.location }} </span>
            <template v-else>
              <!-- show EDIT icons -->
              <app-edit-meetup-dialog 
                :meetup="meetup"
              ></app-edit-meetup-dialog>
            </template>
            <v-spacer></v-spacer>
            {{ meetup.description }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <app-meetup-register-dialog 
              v-if="!userIsCreator && userIsAuthenticated" 
              :meetup="meetup"
            ></app-meetup-register-dialog>
          </v-card-actions>

        </v-card>

      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
export default {
  props: ['id'],

  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },

  computed: {

    error () {
      return this.$store.getters.error
    },

    isLoading () {
      return this.$store.getters.loading
    },

    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },

    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },

    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
}
</script>

