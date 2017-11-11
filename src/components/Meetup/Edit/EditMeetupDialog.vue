<!-- 
  https://www.youtube.com/watch?v=zKRdwpMEaP8&list=PL55RiY5tL51qxUbODJG9cgrsVd7ZHbPrt&index=20 
-->
<template>
  <v-dialog max-width="350px" persistant v-model="EditMeetupDateDialog">

    <v-btn accent slot="activator" @click="setWhat('Date')">
      {{ meetup.date | date }}<v-icon right>edit</v-icon>
    </v-btn>

    <v-btn accent slot="activator" @click="setWhat('Time')">
      {{ meetup.date | time }}<v-icon right>edit</v-icon>
    </v-btn>

    <v-btn accent slot="activator" @click="setWhat('Location')">
      {{ meetup.location }}<v-icon right>edit</v-icon>
    </v-btn>

    <v-btn accent slot="activator" @click="setWhat('Description')">
      Edit Description
    </v-btn>

    <v-btn accent slot="activator" @click="setWhat('Title')">
      Edit Title
    </v-btn>

    <v-card>
      <v-container>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h3 class="headline mb-0">Edit Meetup - </h3>&nbsp; {{ what }} </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>

              <v-layout row mb-3 wrap class="text-xs-center">

                <v-flex v-if="what=='Date'" xs12>
                  <v-date-picker 
                    scrollable
                    v-model="editedDate"
                  ></v-date-picker>
                  <strong>{{ dateTime | date }}</strong>
                </v-flex>

                <v-flex v-if="what=='Time'" xs12>
                  <v-time-picker
                    v-model="editedTime"
                    scrollable
                  ></v-time-picker>
                  <strong>{{ dateTime | date }}</strong>
                </v-flex>

                <v-flex v-if="what=='Title'" xs12>              
                  <v-text-field
                    name="title"
                    id="title"
                    required
                    v-model="editedTitle"
                    @keyup.enter="onSaveChanges"
                    label="Title">
                  </v-text-field>
                </v-flex>

                <v-flex v-if="what=='Description'" xs12>
                  <v-text-field
                    name="description"
                    id="description"
                    required
                    multi-line
                    v-model="editedDescription"
                    label="Meetup Description">
                  </v-text-field>
                </v-flex>

                <v-flex v-if="what=='Location'" xs12>
                  <v-text-field
                    name="location"
                    id="location"
                    required
                    v-model="editedLocation"
                    @keyup.enter="onSaveChanges"
                    label="Location">
                  </v-text-field>
                </v-flex>

                <small>*indicates required field</small>
              </v-layout>

            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                flat 
                class="blue--text darken-1" 
                @click.stop="EditMeetupDateDialog=false"
              >Close</v-btn>
              <v-btn 
                flat 
                class="blue--text darken-1"
                @click="onSaveChanges"
              >Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import * as moment from 'moment'

  export default {

    props: ['meetup'],

    data () {
      return {
        what: '',
        EditMeetupDateDialog: false,
        editedDate: new Date(this.meetup.date),
        editedTime: new Date(this.meetup.date),
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editedLocation: this.meetup.location
      }
    },

    computed: {

      dateTime () {
        if (this.editedDate === null) {
          return moment().format()
        }
        let date = moment(this.editedDate)
        let t = moment(this.editedTime, 'hh:mmA')
        date.hours(t.hours())
        date.minutes(t.minutes())
        return date.format()
      }
    },

    methods: {
      setWhat (what) {
        this.what = what
      },

      onSaveChanges () {
        const payload = {
          id: this.meetup.id,
          date: this.dateTime,
          title: this.editedTitle,
          description: this.editedDescription,
          location: this.editedLocation
        }
        this.$store.dispatch('updateMeetup', payload)
        this.EditMeetupDateDialog = false
      }
    }
  }
</script>
