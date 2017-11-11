<template>
  <v-container>

    <!-- Alert Panel -->
    <v-layout row v-if="error">
      <v-flex sm12 md6 offset-sm2>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <!-- Sign In Form -->
    <v-layout row wrap>
      <v-flex sm12 md6 offset-sm2>
        <v-card>
          <v-card-text>
            <v-container>
                <p v-if="!loading && user">Your id: {{ user.id }}</p>

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
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}

</script>

