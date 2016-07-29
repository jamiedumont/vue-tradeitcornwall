import {
  NEW_ITEM_UID_CREATED,
  UPDATE_NL_TITLE
} from '../mutation-types'

const state = {
  sellerUID: '',
  title: '',
  description: '',
  price: '',
  type: 'item',
  categories: {
    lvl0: '',
    lvl1: ''
  },
  images: [],
  location: {
    locality: '',
    postcode: ''
  },
  _geoloc: {
  },
  convs: [],
  favourited: 0,
  viewed: 0
}

const mutations = {
  [NEW_ITEM_UID_CREATED] (state, newUID) {
    state.UID = newUID
  },
  [UPDATE_NL_TITLE] (state, title) {
    state.title = title
  }
}

export default {
  state,
  mutations
}
