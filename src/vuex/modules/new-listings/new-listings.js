import {
  UPDATE_NL_TITLE,
  UPDATE_NL_PRICE,
  UPDATE_NL_DESCRIPTION,
  UPDATE_NL_IMAGES,
  TOGGLE_UPLOADER,
  UPDATE_CATEGORY,
  UPDATE_GEO,
  UPDATE_LOCATION
} from '../../mutation-types'

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
  location: '',
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
    if (level === 'lvl0' && value === 'Vehicles') {
      state.type = 'vehicle'
    } else {
      state.type = 'item'
    }
  },
  [UPDATE_GEO] (state, pos) {
    state._geoloc = pos
  },
  [UPDATE_LOCATION] (state, loc) {
    state.location = loc
  }
}

export default {
  state,
  mutations
}
