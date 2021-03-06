import Vue from 'vue'
import Vuex from 'vuex'
import accounts from 'src/vuex/modules/accounts/accounts'
import newListing from 'src/vuex/modules/new-listings/new-listings'
import checkout from 'src/vuex/modules/checkout/checkout'
import uploads from 'src/vuex/modules/uploads/uploads'
import conversations from 'src/vuex/modules/conversations/conversations'

// Make Vue aware of Vuex
Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    accounts,
    newListing,
    checkout,
    uploads,
    conversations
  },
  strict: debug
})
