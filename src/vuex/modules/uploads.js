import {
  UPDATE_UPLOAD_PROGRESS,
  NUMBER_IMAGES_COMPLETE,
  TOTAL_IMAGES
} from '../mutation-types'

const state = {
  uploadProgess: '',
  totalUploads: '',
  uploadsComplete: ''
}

const mutations = {
  [UPDATE_UPLOAD_PROGRESS] (state, percentage) {
    state.uploadProgess = percentage
  },
  [NUMBER_IMAGES_COMPLETE] (state, number) {
    state.uploadsComplete = number
  },
  [TOTAL_IMAGES] (state, number) {
    state.totalUploads = number
  }
}

export default {
  state,
  mutations
}
