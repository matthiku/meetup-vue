<template>
  <v-container fluid>

    <!-- Alert Panel -->
    <v-layout row v-if="error">
      <v-flex sm12 md6 offset-sm2>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <!-- Show user specific data -->
    <v-layout row wrap>
      <v-flex md12 lg8 xl6 offset-md2 offset-xl3>
        <v-card>
          <v-card-text>

            <v-toolbar color="blue">
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title class="white--text">My Registrations</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>

            <v-container>
              <v-layout row wrap>

                <!-- iterate through each registered meetup -->
                <v-flex xs12 mb-3 key="meetup.id" v-for="meetup in registeredMeetups">
                  <v-card color="cyan darken-2" class="white--text">
                    <v-container fluid grid-list-lg>
                      <v-layout row>
                        <v-flex xs7>
                          <div>
                            <div class="headline">{{ meetup.title }}</div>
                            <div>{{ meetup.date | date }} in {{ meetup.location }}</div>
                            {{ meetup.description }}
                          </div>
                        </v-flex>
                        <v-flex xs5>
                          <v-card-media
                            :src="meetup.imageUrl"
                            style="cursor: pointer"
                            @click="showSingleMeetup(meetup.id)"
                            height="125px"
                            contain
                          ></v-card-media>

                          <v-card-actions>
                            <v-btn @click="showSingleMeetup(meetup.id)">
                              <v-icon left>arrow_forward</v-icon>
                              View Meetup
                            </v-btn>
                          </v-card-actions>

                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>

              </v-layout>
            </v-container>

            <v-divider></v-divider>

            <v-container>
                <span v-if="!loading && user"><strong>Your id:</strong> {{ user.id }}</span>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn 
                      type="submit" 
                      class="secondary"
                      :loading="loading"
                      @click="onSignOut"
                      >Sign Out
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>

            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>

export default {

  data () {
    return {
      loader: ''
    }
  },

  computed: {
    user () {
      return this.$store.getters.user
    },
    registeredMeetups () {
      return this.$store.getters.registeredMeetups
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },

  watch: {
    user (value) {
      if (value === null || value === undefined) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    onSignOut () {
      this.loader = 'loading'
      this.$store.dispatch('signUserOut')
    },
    showSingleMeetup (id) {
      this.$router.push({name: 'meetup', params: { id: id }})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}

</script>

