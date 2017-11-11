<!-- 
  https://www.youtube.com/watch?v=zKRdwpMEaP8&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=20 
-->
<template>
  <v-dialog persistant v-model="RegisterDialog">

    <v-btn accent color="primary" slot="activator">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>

    <v-card>
      <v-container>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered"><h3 class="headline mb-0">Unregister from Meetup</h3></v-card-title>
            <v-card-title v-else><h3 class="headline mb-0">Register for Meetup</h3></v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              You can always change your decision later.
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                flat
                class="red--text darken-1" 
                @click.stop="RegisterDialog=false"
              >Cancel</v-btn>
              <v-btn 
                flat 
                class="green--text darken-1"
                @click="onAgree"
              >Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {

    props: ['meetup'],
    data () {
      return {
        RegisterDialog: false
      }
    },

    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },

      userIsRegistered () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetup.id
        }) >= 0
      }
    },

    methods: {
      onAgree () {
        this.$store.dispatch(
          (this.userIsRegistered ? 'unregisterUserFromMeetup' : 'registerUserForMeetup'),
          this.meetup.id
        )
        this.RegisterDialog = false
      }
    }
  }
</script>
