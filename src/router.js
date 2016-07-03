import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './Home'
import Buy from './Buy'
import Sell from './Sell'
import About from './About'

Vue.use(VueRouter)
var router = new VueRouter({
  history: false
})

router.map({
  '/': {
    name: 'Home',
    component: Home
  },
  '/buy': {
    name: 'Buy',
    component: Buy
  },
  '/sell': {
    name: 'Sell',
    component: Sell
  },
  '/about': {
    name: 'About',
    component: About
  }
})

export default router
