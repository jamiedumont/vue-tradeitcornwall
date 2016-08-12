import {
  NEW_USER_EMAIL,
  USER_CREATION_EMAIL_FAILED,
  USER_LOGGED_OUT,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  ALERT
} from '../../mutation-types'

import { userCreationError, emailLoginError } from 'src/data/FirebaseErrors'

// Initial state

const state = {
  user: {
    loggedIn: false
  },
  alert: {
    present: false
  }
}

// Mutations

const mutations = {
  [NEW_USER_EMAIL] (state, email) {
    console.log(`New user created with email (${email})`)
  },
  [USER_CREATION_EMAIL_FAILED] (state, errorCode) {
    console.log(userCreationError(errorCode))
  },
  [USER_LOGGED_OUT] (state) {
    state.user.loggedIn = false
    state.user.email = null
    state.user.emailVerified = null
    state.user.displayName = null
    state.user.photoURL = null
    state.user.uid = null
  },
  [USER_LOGIN] (state, res) {
    const user = {
      loggedIn: true,
      email: res.email || '',
      emailVerified: res.emailVerified || '',
      displayName: res.displayName || '',
      photoURL: res.photoURL || '',
      uid: res.uid || ''
    }
    state.user = user
  },
  [USER_LOGIN_ERROR] (state, errorCode) {
    console.log(emailLoginError(errorCode))
  },
  [ALERT] (state, msg) {
    state.alert.type = 'danger'
    state.alert.msg = msg
    state.alert.present = true
  }
}

export default {
  state,
  mutations
}
