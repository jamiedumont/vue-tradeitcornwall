import Vue from 'vue'
import Vuex from 'vuex'

// Make vue aware of Vuex
Vue.use(Vuex)

// Create an object to hold the initial state when
// the app starts up
const state = {
  // When the app starts, count is set to 0
  count: 0
}

const mutations = {
  // A mutation receives the current state as the first argument
  // You can make any modifications you want inside this function
  INCREMENT (state, amount) {
    state.count = state.count + amount
  },
  NEW_USER_EMAIL (state) {
    console.log('New user created with email & password')
  },
  USER_CREATION_EMAIL_FAILED (state) {
    console.error('New user creation with email & password failed!')
  },
  USER_LOGIN_EMAIL ({state}, email) {
    console.error(`User: ${email} logged in`)
  },
  USER_LOGGED_OUT (state) {
    console.error('User: logged out')
  }
}

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
  state,
  mutations
})
