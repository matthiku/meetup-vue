<template>
  <v-app>

    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          key="item.title" 
          :to="{name: item.link}">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span">DevMeetup</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">        
        <v-btn :to="{name: item.link}" flat v-for="item in menuItems" key="item.title">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <main>
      <v-content>        
        <router-view></router-view>
      </v-content>
    </main>

  </v-app>
</template>

<style>
  .router-link-active {
    cursor: pointer;
  }
</style>



<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'supervisor_account', title: 'View Meetups', link: 'meetups'},
          {icon: 'room', title: 'Organize Meetups', link: 'createMeetup'},
          {icon: 'person', title: 'Profile', link: 'profile'},
          {icon: 'face', title: 'Sign up', link: 'signup'},
          {icon: 'lock_open', title: 'Sign in', link: 'signin'}
        ]
      }
    }
  }

</script>
