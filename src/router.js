import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Buy from './pages/Buy'
import Sell from './pages/Sell'
import Uploading from './pages/Uploading'
import About from './pages/About'
import Checkout from './pages/Checkout'
import Inbox from './pages/Inbox'
import Item from './pages/Item'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LoginEmail from './pages/LoginEmail'
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
  '/buy/:itemUID': {
    name: 'item',
    component: Item
  },
  '/sell': {
    name: 'sell',
    component: Sell
  },
  '/sell/uploading': {
    name: 'uploading',
    component: Uploading
  },
  '/checkout': {
    name: 'checkout',
    component: Checkout
  },
  '/about': {
    name: 'about',
    component: About
  },
  '/inbox': {
    name: 'inbox',
    component: Inbox
  },
  '/signup': {
    name: 'signup',
    component: SignUp
  },
  '/login': {
    name: 'login',
    component: Login
  },
  '/login/email': {
    name: 'login-email',
    component: LoginEmail
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

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

export default router
