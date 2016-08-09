import {ADD_TO_CHECKOUT} from '../mutation-types'

const state = {
  listings: []
}

const mutations = {
  [ADD_TO_CHECKOUT] (state, newListing) {
    state.listings.push(newListing)
  }
}

export default {
  state,
  mutations
}
