import Vue from 'vue'
import Vuex from 'vuex'
import accounts from 'src/vuex/modules/accounts'

// Make Vue aware of Vuex
Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    accounts
  },
  strict: debug
})
