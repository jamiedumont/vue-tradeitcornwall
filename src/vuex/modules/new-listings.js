import {
  UPDATE_NL_TITLE,
  UPDATE_NL_PRICE,
  UPDATE_NL_DESCRIPTION,
  UPDATE_NL_IMAGES,
  TOGGLE_UPLOADER,
  UPDATE_CATEGORY
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
  imageRefs: [],
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
    state.imageRefs = images
  },
  [TOGGLE_UPLOADER] (state) {
    state.uploadVisible = !state.uploadVisible
  },
  [UPDATE_CATEGORY] (state, level, value) {
    state.categories[level] = value
  }
}

export default {
  state,
  mutations
}
