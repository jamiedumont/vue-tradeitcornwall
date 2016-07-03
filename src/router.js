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
    component: Home
  },
  '/buy': {
    component: Buy
  },
  '/sell': {
    component: Sell
  },
  '/about': {
    component: About
  }
})

export default router
