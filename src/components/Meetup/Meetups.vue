<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>

        <v-card class="info mb-3" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>
              
              <v-flex xs5 sm4 md3>
                <v-card-media
                  height="125px"
                  style="cursor: pointer"
                  :src="meetup.imageUrl"
                  @click="showSingleMeetup(meetup.id)"
                ></v-card-media>
              </v-flex>

              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>                  
                    <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                    <div>{{ meetup.date | date }} in {{ meetup.location }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn 
                    @click="showSingleMeetup(meetup.id)"
                    flat>
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
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  },
  methods: {
    showSingleMeetup (id) {
      this.$router.push({name: 'meetup', params: { id: id }})
    }
  }
}
</script>

