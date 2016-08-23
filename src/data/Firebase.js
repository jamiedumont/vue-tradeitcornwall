import firebase from 'firebase'
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
    checkoutWatcher(store)
  } else {
    // No user is signed in.
  }
})

export const checkoutWatcher = store => {
  const checkoutRef = firebase.database().ref(`/users/${store.state.accounts.user.uid}/checkout`)
  checkoutRef.on('value', function (snapshot) {
    const data = snapshot.val()

    if (data !== null) {
      store.dispatch('READ_CHECKOUT_DATA', data)
    }
  })
}
