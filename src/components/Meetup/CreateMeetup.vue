<template>
  <v-container>

    <v-layout row>
      <v-flex sm12 md6 offset-sm2>
        <h4 class="secondary--text">Create a new Meetup</h4>        
      </v-flex>
    </v-layout>


    <v-layout row>
      <v-flex sm12 md6 offset-sm2>

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
export default {
  data () {
    return {
      title: '',
      location: '',
      date: '',
      description: '',
      imageUrl: ''
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.description !== '' &&
        this.location !== '' &&
        this.imageUrl !== ''
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
        date: new Date(),
        id: 'asdfwert'
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('meetups')
    }
  }
}
</script>

