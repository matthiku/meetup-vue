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

              <form @submit.prevent="onSignIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn 
                      type="submit" 
                      class="primary"
                      :disabled="!formIsValid" 
                      :loading="loading"
                      @click="loader = 'loading'"
                      >Sign In
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>

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
      email: '',
      password: ''
    }
  },

  computed: {
    formIsValid () {
      return this.email !== '' &&
        this.password !== ''
    },
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
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },

  methods: {
    onSignIn () {
      if (!this.formIsValid) {
        return
      }
      const signInData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUserIn', signInData)
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}

</script>

