import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Buy from './pages/Buy'
import Sell from './pages/Sell'
import About from './pages/About'
import Inbox from './pages/Inbox'
import Menu from './pages/Menu'
import Login from './pages/Login'
import UserDashboard from './pages/UserDashboard'
import UserProfile from './pages/UserProfile'
import UserBilling from './pages/UserBilling'
import UserListings from './pages/UserListings'

Vue.use(VueRouter)

const router = new VueRouter({
  history: true
})

router.map({
  '/': {
    name: 'home',
    component: Home
  },
  '/buy': {
    name: 'buy',
    component: Buy
  },
  '/menu': {
    name: 'menu',
    component: Menu
  },
  '/sell': {
    name: 'sell',
    component: Sell
  },
  '/about': {
    name: 'about',
    component: About
  },
  '/inbox': {
    name: 'inbox',
    component: Inbox
  },
  '/login': {
    name: 'login',
    component: Login
  },
  '/account': {
    name: 'user-dashboard',
    component: UserDashboard
  },
  '/account/my-listings': {
    name: 'user-listings',
    component: UserListings
  },
  '/account/billing': {
    name: 'user-billing',
    component: UserBilling
  },
  '/account/profile': {
    name: 'user-profile',
    component: UserProfile
  }
})

export default router
