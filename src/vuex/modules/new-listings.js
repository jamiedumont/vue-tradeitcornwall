import {
  UPDATE_NL_TITLE,
  UPDATE_NL_PRICE,
  UPDATE_NL_DESCRIPTION,
  UPDATE_NL_IMAGES,
  TOGGLE_UPLOADER
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
  uploadVisible: true,
  favourited: 0,
  viewed: 0
}

const mutations = {
  [UPDATE_NL_TITLE] (state, title) {
    state.title = title
  },
  [UPDATE_NL_PRICE] (state, price) {
    state.price = price
  },
  [UPDATE_NL_DESCRIPTION] (state, description) {
    state.description = description
  },
  [UPDATE_NL_IMAGES] (state, images) {
    state.images = images
  },
  [TOGGLE_UPLOADER] (state) {
    state.uploadVisible = !state.uploadVisible
  }
}

export default {
  state,
  mutations
}
