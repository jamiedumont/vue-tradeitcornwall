// An action will receive the store as the first argument.
// Since we are only interested in the dispatch (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature

import firebase from 'src/data/Auth'

export const incrementCounter = function ({ dispatch, state }) {
  dispatch('INCREMENT', 1)
}

export const newUser = function ({dispatch, state}, email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // [START_EXCLUDE]
    if (errorCode === 'auth/weak-password') {
      console.log('The password is too weak.')
    } else {
      console.log(errorMessage)
    }
    dispatch('USER_CREATION_EMAIL_FAILED')
    console.log(error)
  })
  dispatch('NEW_USER_EMAIL')
}

export const login = function ({dispatch, state}, email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      console.error('Wrong password.')
    } else {
      console.error(errorMessage)
    }
    console.log(error)
  })
  dispatch('USER_LOGIN_EMAIL', email)
}

export const currentUser = function ({dispatch, state}) {
  console.log(firebase.auth().currentUser.email)
}

export const signOut = function ({dispatch, state}) {
  firebase.auth().signOut()
  dispatch('USER_LOGGED_OUT')
}
