import {
  GET_USER_CONVS,
  STREAM_MESSAGES,
  SET_CURRENT_CONV
} from '../../mutation-types'

const state = {
  all: {},
  messages: {},
  otherUser: {},
  item: {}
}

const mutations = {
  [GET_USER_CONVS] (state, convs) {
    state.all = convs
  },
  [STREAM_MESSAGES] (state, messages) {
    state.messages = messages
  },
  [SET_CURRENT_CONV] (state, currentConv) {
    state.otherUser = currentConv.otherUser
    state.item = currentConv.item
  }
}

export default {
  state,
  mutations
}
