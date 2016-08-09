import Vue from 'vue'
import Vuex from 'vuex'
import accounts from 'src/vuex/modules/accounts'
import listings from 'src/vuex/modules/listings'
import newListing from 'src/vuex/modules/new-listings'
import conversations from 'src/vuex/modules/conversations'
import checkout from 'src/vuex/modules/checkout'

// Make Vue aware of Vuex
Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    accounts,
    listings,
    conversations,
    newListing,
    checkout
  },
  strict: debug
})
