import {
  NEW_USER_EMAIL,
  USER_CREATION_EMAIL_FAILED,
  USER_LOGGED_OUT,
  USER_LOGIN
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
  // [USER_LOGIN_EMAIL] (state, currentUser) {
  //   state.user.loggedIn = true
  //   state.user.email = currentUser.email
  // },
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
  }
}

export default {
  state,
  mutations
}
