import {
  GET_USER_CONVS
} from '../../mutation-types'

const state = {
  all: []
}

const mutations = {
  [GET_USER_CONVS] (state, convs) {
    state.all = convs
  }
}

export default {
  state,
  mutations
}
