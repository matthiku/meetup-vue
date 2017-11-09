<template>
  <v-container>
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
                    <v-btn type="submit" :disabled="!formIsValid" class="primary">Sign In</v-btn>
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
      console.log(signInData)
      this.$store.dispatch('signUserIn', signInData)
    }
  }
}
</script>

