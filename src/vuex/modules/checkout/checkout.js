import {
  ADD_TO_CHECKOUT,
  READ_CHECKOUT_DATA,
  ERROR_READ_CHECKOUT_DATA
} from '../../mutation-types'

const state = {
  items: {},
  total: 0
}

const mutations = {
  [ADD_TO_CHECKOUT] (state, listingUID) {
    console.log(listingUID)
  },
  [READ_CHECKOUT_DATA] (state, data) {
    state.items = data.items
    state.total = data.total
  },
  [ERROR_READ_CHECKOUT_DATA] (state, err) {
    console.log(err)
  }
}

export default {
  state,
  mutations
}
