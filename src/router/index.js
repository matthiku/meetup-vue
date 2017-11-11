import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'createMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'meetup',
      component: Meetup,
      props: true,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
