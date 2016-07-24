import firebase from 'firebase'
// import { authCheck } from '../vuex/actions'
import store from '../vuex/store'

const config = {
  apiKey: 'AIzaSyAloSIXHBzC39AfzvabL5EbfHiGeVtPYA8',
  authDomain: 'tradeitcornwall.firebaseapp.com',
  databaseURL: 'https://tradeitcornwall.firebaseio.com',
  storageBucket: 'tradeitcornwall.appspot.com'
}

firebase.initializeApp(config)

export default firebase

// authCheck()
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('USER_LOGIN', user)
  } else {
    // No user is signed in.
  }
})

// Firebase watches for changes at the correct message endpoint, when a change it detected, do something with it and dispatch
