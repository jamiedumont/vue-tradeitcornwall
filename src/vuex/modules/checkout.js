import {ADD_TO_CHECKOUT} from '../mutation-types'

const state = {
  listings: []
}

const mutations = {
  [ADD_TO_CHECKOUT] (state, listingUID, cost) {
    state.listings.push({
      uid: listingUID,
      cost
    })
  }
}

export default {
  state,
  mutations
}
