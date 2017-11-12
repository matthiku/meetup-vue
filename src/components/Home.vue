<template>
  <v-container>

    <!-- Alert Panel -->
    <v-layout row v-if="error">
      <v-flex sm12 md6 offset-sm2>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row wrap mb-3>

      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn class="info" large :to="{name: 'meetups'}">Explore Meetups</v-btn>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn class="info" large :to="{name: 'createMeetup'}">Organize Meetups</v-btn>
      </v-flex>

    </v-layout>


    <v-layout row wrap>

      <v-flex xs12 class="text-xs-center">
        <v-carousel v-if="!isLoading">
          <v-carousel-item 
            v-for="meetup in meetups" 
            :src="meetup.imageUrl" 
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
            >
              <div class="title">{{ meetup.title }}</div>
            </v-carousel-item>
        </v-carousel>
        <v-progress-circular 
          v-if="isLoading" 
          indeterminate 
          :width="7"
          :size="70"
          color="primary"
          ></v-progress-circular>
      </v-flex>

    </v-layout>

    <v-layout row wrap mt-3>
      <v-flex xs12 class="text-xs-center">
        <p>Join our outstanding meetups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>



<script>
export default {
  methods: {
    onLoadMeetup (id) {
      this.$router.push({name: 'meetup', params: {id}})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    isLoading () {
      return this.$store.getters.loading
    }
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    padding: 20px;
  }
  .carousel__item {
    cursor: pointer;
  }
</style>
