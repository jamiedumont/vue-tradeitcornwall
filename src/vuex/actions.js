// An action will receive the store as the first argument.
// Since we are only interested in the dispatch (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature

import firebase from 'src/data/Auth'
import router from 'src/router'

export const newUser = function ({dispatch, state}, email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (result) {
      dispatch('NEW_USER_EMAIL', result.email)
      router.go({ path: '/' })
    })
    .catch(function (error) {
      // Handle Errors here.
      dispatch('USER_CREATION_EMAIL_FAILED', error.code)
    })
}

// TODO: Reference Firebase docs to see if the signInWithEmailAndPassword function also returns a 'result', and whether I can use a .then to check for route and redirect accordingly

export const login = function ({dispatch, state}, email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result) {
      // State mutation handled by authCheck in 'src/data/Auth'
      router.go({ path: '/' })
    })
    .catch(function (error) {
      // Handle Errors here.
      dispatch('USER_LOGIN_ERROR', error.code)
      dispatch('ALERT', error.code)
    })
}

export const ourCurrentUser = function ({dispatch, state}) {
  console.log(firebase.auth().currentUser)
}

export const signOut = function ({dispatch, state}) {
  firebase.auth().signOut()
    .then(function () {
      dispatch('USER_LOGGED_OUT')
    }, function (error) {
      console.error(error)
    })
}

export const oAuthLogin = function ({dispatch, state}, authProvider) {
  const getProvider = function (authProvider) {
    let authProviders = {
      'google': function () {
        return new firebase.auth.GoogleAuthProvider()
      },
      'facebook': function () {
        return new firebase.auth.FacebookAuthProvider()
      }
    }
    return authProviders[authProvider]()
  }
  const provider = getProvider(authProvider)
  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const token = result.credential.accessToken

    // State mutation handled by authCheck in 'src/data/Auth'
  }).catch(function (error) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.email
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential
    // ...
    console.log(errorCode, errorMessage, email, credential)
  })
}
