<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-flex xs12 class="text-xs-center">
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
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog 
                :meetup="meetup"
              ></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>

          <v-card-media
            :src="meetup.imageUrl"
            height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} in {{ meetup.location }} </div>
            {{ meetup.description }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>

        </v-card>

      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
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

