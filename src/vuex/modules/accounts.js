import {
  NEW_USER_EMAIL,
  USER_CREATION_EMAIL_FAILED,
  USER_LOGIN_EMAIL,
  USER_LOGGED_OUT,
  USER_LOGIN_AUTH
} from '../mutation-types'

// initial state

const state = {
  user: {
    loggedIn: false
  }
}

// mutations
const mutations = {
  [NEW_USER_EMAIL] (state, email) {
    console.log(`New user created with email (${email}) & password`)
  },
  [USER_CREATION_EMAIL_FAILED] (state) {
    console.error('New user creation with email & password failed!')
  },
  [USER_LOGIN_EMAIL] (state, currentUser) {
    state.user.loggedIn = true
    state.user.email = currentUser.email
  },
  [USER_LOGGED_OUT] (state) {
    state.user.loggedIn = false
    state.user.email = null
    state.user.emailVerified = null
    state.user.displayName = null
    state.user.photoURL = null
    state.user.uid = null
  },
  [USER_LOGIN_AUTH] (state, res) {
    state.user.loggedIn = true
    state.user.email = res.email
    state.user.emailVerified = res.emailVerified
    state.user.displayName = res.displayName
    state.user.photoURL = res.photoURL
    state.user.uid = res.uid
  }
}

export default {
  state,
  mutations
}
