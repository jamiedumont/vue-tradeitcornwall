import {
  GET_USER_CONVS,
  STREAM_MESSAGES,
  SET_CURRENT_CONV,
  UPDATE_UNREAD_COUNT
} from '../../mutation-types'

const state = {
  all: {},
  currentConv: {},
  unreadCount: 0,
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
    state.currentConv = currentConv.conv
    state.otherUser = currentConv.otherUser
    state.item = currentConv.item
  },
  [UPDATE_UNREAD_COUNT] (state, count) {
    state.unreadCount = count
  }
}

export default {
  state,
  mutations
}
