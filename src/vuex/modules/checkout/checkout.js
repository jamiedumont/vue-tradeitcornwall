import {
  UPDATE_CHECKOUT_DATA
} from '../../mutation-types'

const state = {
  items: {}
}

const mutations = {
  [UPDATE_CHECKOUT_DATA] (state, data) {
    if (data === null) {
      state.items = {}
    } else {
      state.items = data.items
    }
  }
}

export default {
  state,
  mutations
}
