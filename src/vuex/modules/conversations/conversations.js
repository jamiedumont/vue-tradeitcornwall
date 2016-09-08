import {
  GET_USER_CONVS
} from '../../mutation-types'

const state = {
  convs: []
}

const mutations = {
  [GET_USER_CONVS] (state, convs) {
    state.convs = convs
  }
}

export default {
  state,
  mutations
}
