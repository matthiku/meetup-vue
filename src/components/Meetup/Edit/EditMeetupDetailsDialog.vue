<!-- 
  https://www.youtube.com/watch?v=zKRdwpMEaP8&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=20 
-->
<template>
  <v-dialog max-width="350px" persistant v-model="EditMeetupDetailsDialog">

    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                id="title"
                required
                v-model="editedTitle"
                label="Title">
              </v-text-field>
              <v-text-field
                name="location"
                id="location"
                required
                v-model="editedLocation"
                label="Location">
              </v-text-field>
              <v-text-field
                name="description"
                id="description"
                required
                multi-line
                v-model="editedDescription"
                label="Description">
              </v-text-field>

            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn 
                flat 
                class="blue--text darken-1" 
                @click.stop="EditMeetupDetailsDialog=false"
              >Close</v-btn>
              <v-btn 
                flat 
                class="blue--text darken-1"
                :disabled="formIsInvalid || formUnchanged"
                @click="saveData"
              >Save</v-btn>
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
        EditMeetupDetailsDialog: false,
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editedLocation: this.meetup.location
      }
    },

    computed: {
      formIsInvalid () {
        return this.editedTitle === '' ||
          this.editedDescription === '' ||
          this.editedLocation === ''
      },
      formUnchanged () {
        return this.editedTitle === this.meetup.title &&
          this.editedDescription === this.meetup.description &&
          this.editedLocation === this.meetup.location
      }
    },

    methods: {
      saveData () {
        if (this.formIsInvalid || this.formUnchanged) {
          return
        }
        const payload = {
          key: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription,
          location: this.editedLocation
        }
        this.$store.dispatch('updateMeetup', payload)
        this.EditMeetupDetailsDialog = false
      }
    }
  }
</script>
