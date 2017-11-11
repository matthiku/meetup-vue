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

          <!-- TITLE input field -->
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

          <!-- LOCATION input field -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="location"
                v-model="location"
                id="location"
                required
                label="Location">
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- IMAGE upload -->
          <v-layout row>
            <v-flex xs12>
              <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
              <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
            <!-- IMAGE preview -->
            <v-flex xs12>
              <img :src="imageUrl" height="150px" alt="<image preview>">
            </v-flex>
          </v-layout>

          <!-- DESCRIPTION input field -->
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
      imageUrl: '',
      image: null
    }
  },

  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.description !== '' &&
        this.location !== '' &&
        this.date !== null &&
        this.time !== null &&
        this.imageUrl !== '' &&
        this.image !== null
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

    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      // get list of files selected with the upload button
      // see https://www.youtube.com/watch?v=J2Wp4_XRsWc&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=19
      const files = event.target.files
      // use only the first file
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid image file!')
      }
      // read the file into a Javascript object
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },

    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        image: this.image,
        date: moment(this.date + ' ' + this.time, 'YYYY-MM-DD hh:mmA')
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push({name: 'meetups'})
    }
  }
}
</script>

