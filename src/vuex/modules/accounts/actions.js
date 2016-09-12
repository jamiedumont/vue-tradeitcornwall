import firebase from 'src/data/Firebase'
import router from 'src/router'
import { each } from 'async'
import { _ } from 'underscore'

export const getAuth = ({dispatch, state}) => {
  return new Promise(function (resolve, reject) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch('USER_LOGIN', user)
        resolve(user.uid)
      }
      resolve('no-user')
    })
  })
}

export const getUsersItems = ({dispatch, state}) => {
  const userUID = state.accounts.user.uid
  const usersItemUIDs = new Promise(function (resolve, reject) {
    firebase.database()
      .ref(`/users/${userUID}/items`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val()
        resolve(_.keys(data))
      })
  })

  usersItemUIDs.then((items) => {
    const allItems = []
    each(items, function (item, callback) {
      firebase.database()
        .ref(`/items/${item}`)
        .once('value')
        .then(function (snapshot) {
          const newItem = snapshot.val()
          newItem.uid = item
          allItems.push(newItem)
          callback()
        })
    }, function (err) {
      if (err) {
        console.log('err', err)
      } else {
        dispatch('GET_USER_ITEMS', allItems)
      }
    })
  })
}

export const getBillingHistory = ({dispatch, state}) => {
  const userUID = state.accounts.user.uid
  return new Promise(function (resolve, reject) {
    firebase.database()
      .ref(`/users/${userUID}/transactions`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val()
        resolve(dispatch('GET_BILLING_HISTORY', data))
      })
  })
}

export const newUser = function ({dispatch, state}, email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (result) {
      // TODO: firebase create user in database
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

export const signOut = function ({dispatch, state}) {
  firebase.auth().signOut()
    .then(function () {
      dispatch('USER_LOGGED_OUT')
    }, function (error) {
      console.error(error)
    })
}

export const oAuthLogin = function ({dispatch, state}, authProvider) {
  // The getProvider function returns the correct Firebase auth based on the
  // specified authProvider
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
  // The provider is defined using the above 'getProvider' function
  const provider = getProvider(authProvider)
  // Firebase then initiates the login process
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
