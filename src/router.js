import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Buy from './pages/Buy'
import Sell from './pages/Sell'
import About from './pages/About'

Vue.use(VueRouter)
var router = new VueRouter({
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
  '/sell': {
    name: 'sell',
    component: Sell
  },
  '/about': {
    name: 'about',
    component: About
  }
})

export default router
