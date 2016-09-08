import firebase from 'src/data/Firebase'
import store from 'src/vuex/store'
import { _ } from 'underscore'

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('USER_LOGIN', user)
    checkoutWatcher(user.uid)
    getBillingHistory(user.uid)
    getUsersItems(user.uid)
    getUsersConversations(user.uid)
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
      store.dispatch('UPDATE_CHECKOUT_DATA', data)
    }
  })
}

const getBillingHistory = (userUID) => {
  const transRef = firebase.database().ref(`/users/${userUID}/transactions`)
  transRef.on('value', (snapshot) => {
    const data = snapshot.val()

    if (data !== null) {
      store.dispatch('GET_BILLING_HISTORY', data)
    }
  })
}

const getUsersItems = (userUID) => {
  const itemsRef = firebase.database().ref(`/users/${userUID}/items`)
  itemsRef.on('value', (snapshot) => {
    const itemUIDs = _.keys(snapshot.val())
    const items = []

    _.each(itemUIDs, (item) => {
      firebase.database()
        .ref(`/items/${item}`)
        .once('value')
        .then(function (snapshot) {
          const itemObject = snapshot.val()

          if (itemObject !== null) {
            items.push(itemObject)
            if (items.length === itemUIDs.length) {
              store.dispatch('GET_USER_ITEMS', items)
            }
          }
        })
    })
  })
}

const getUsersConversations = (userUID) => {
  const convsRef = firebase.database().ref(`/users/${userUID}/convs`)
  convsRef.on('value', (snapshot) => {
    const convs = snapshot.val()
    store.dispatch('GET_USER_CONVS', convs)

    // for each conv.id, go get the last 10 messages and store them under convMessages
  })
}
