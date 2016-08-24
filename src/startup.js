import firebase from 'src/data/Firebase'
import store from 'src/vuex/store'

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('USER_LOGIN', user)
    checkoutWatcher(user.uid)
  } else {
    // No user is signed in
    // Do nothing
  }
})

const checkoutWatcher = (userUID) => {
  console.log(userUID)
  const checkoutRef = firebase.database().ref(`/users/${userUID}/checkout`)
  checkoutRef.on('value', function (snapshot) {
    const data = snapshot.val()

    if (data !== null) {
      store.dispatch('READ_CHECKOUT_DATA', data)
    }
  })
}
