<template>
  <v-container>

    <v-layout row>
      <v-flex sm12 md10 offset-md1>
        <h4 class="secondary--text">Create a new Meetup</h4>        
      </v-flex>
    </v-layout>


    <v-layout row>
      <v-flex sm12 md10 offset-md1>

        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="title"
                id="title"
                v-model="title"
                required
                label="Title">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="location"
                id="location"
                v-model="location"
                required
                label="Location">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="imageUrl"
                v-model="imageUrl"
                id="image-url"
                required
                label="Image URL">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <img :src="imageUrl" height="150px" alt="preview image">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="description"
                id="description"
                v-model="description"
                required
                multi-line
                label="Description">
              </v-text-field>
            </v-flex>
          </v-layout>

          <strong>Choose Date and Time:</strong>
          <v-layout row mb-3>
            <v-flex xs12>
              <v-date-picker v-model="date"></v-date-picker>
              <p>{{ date }}</p>
              <p>{{ dateTime }}</p>
            </v-flex>
            <v-flex xs12>
              <v-time-picker v-model="time"></v-time-picker>
              {{ time }}
            </v-flex>
          </v-layout>

          <hr>
          <v-layout row>
            <v-flex xs12>
              <v-btn type="submit" :disabled="!formIsValid" class="primary">Create Meetup</v-btn>
            </v-flex>
          </v-layout>

        </form>

      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>

import * as moment from 'moment'

export default {

  data () {
    return {
      title: '',
      location: '',
      date: null,
      time: null,
      description: '',
      imageUrl: ''
    }
  },

  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.description !== '' &&
        this.location !== '' &&
        this.date !== null &&
        this.time !== null &&
        this.imageUrl !== ''
    },

    dateTime () {
      if (this.date === null) {
        return moment().format()
      }
      let date = moment(this.date)
      let t = moment(this.time, 'hh:mmA')
      date.hours(t.hours())
      date.minutes(t.minutes())
      return date.format()
    }
  },

  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        imageUrl: this.imageUrl,
        date: moment(this.date + ' ' + this.time, 'YYYY-MM-DD hh:mmA')
      }
      this.$store.dispatch('createMeetup', meetupData)
    }
  }
}
</script>

