import firebase from 'src/data/Firebase'
import { _ } from 'underscore'
import moment from 'moment'
import router from 'src/router'

export const addToCheckout = function (store, userUID, itemUID, item) {
  const cost = item.type === 'vehicle' ? 500 : 200
  const checkoutRef = firebase.database().ref(`users/${userUID}/checkout`)
  const itemCheckoutRef = checkoutRef.child(`items/${itemUID}`)
  itemCheckoutRef.set(item)
  itemCheckoutRef.update({
    cost: cost
  })
  updateTotal(store, userUID, cost)
  store.dispatch('ADD_TO_CHECKOUT', itemUID)
}

export const updateTotal = function (store, userUID, price) {
  const totalRef = firebase.database().ref(`users/${userUID}/checkout/total`)
  totalRef.once('value')
    .then(function (snapshot) {
      totalRef.set(snapshot.val() + price)
    })
}

export const updateCheckout = function (store, data) {
  store.dispatch('READ_CHECKOUT_DATA', data)
}

export const handlePaymentSuccess = function (store, res) {
  // Change route
  router.go({ path: 'checkout/thanks' })

  // Assemble data needed for functions
  // Pluck only the relevant fields from response object
  const chargeData = _.pick(res,
    'id',
    'amount',
    'created',
    'source'
  )

  // Pull the itemUIDs only from Vuex
  const itemUIDs = _.keys(store.state.checkout.items)

  const userUID = store.state.accounts.user.uid

  const dateExpires = parseInt( // Store as Int (not String)
    moment
      .unix(chargeData.created) // Parse date from timestamp
      .add(30, 'd')             // Add 30 days to it
      .format('X')              // Return it to timestamp
    )

  // console.log(chargeData, itemUIDs, userUID, dateExpires)

  makeItemLive(store, itemUIDs, chargeData.created, dateExpires)
  saveTransaction(store, chargeData, itemUIDs, userUID)
  clearCheckout(store, userUID)
}

export const clearCheckout = function (store, userUID) {
  const checkoutRef = firebase.database().ref(`/users/${userUID}/checkout`)

  checkoutRef.update({
    total: 0,
    items: []
  })
}

export const makeItemLive = function (
  store,        // Vuex store
  items,        // Array of itemUIDs
  dateListed,   // UNIX timestamp of moment listed
  dateExpires   // UNIX timestamp of moment it expires
) {
  _.each(items, function (item) {
    // Retrieve the location of the item's data in Firebase
    const itemRef = firebase.database().ref(`/items/${item}`)
    // Prepare the data
    const update = {
      dateListed,
      dateExpires,
      status: 'live'
    }
    return itemRef.update(update)
  })
}

export const saveTransaction = function (
  store,        // Vuex store
  chargeData,   // Object containing Stripe charge data
  items,        // Array of item UIDs
  userUID       // User UID
) {
  // Create data object
  const newTransaction = {
    stripeID: chargeData.id,
    userUID: userUID,
    date: chargeData.created,
    amount: chargeData.amount,
    items: items,
    card: {
      id: chargeData.source.id,
      brand: chargeData.source.brand,
      last4: chargeData.source.last4,
      postcode: chargeData.source.address_zip
    }
  }

  // Create a UID for this transaction
  const newTransactionKey = firebase.database().ref().child('transactions').push().key

  // Setup locations this data should be saved
  const updates = {}
  updates[`/transactions/${newTransactionKey}`] = newTransaction
  updates[`/users/${userUID}/transactions/${newTransactionKey}`] = newTransaction

  // Fire to Firebase ;)
  firebase.database().ref().update(updates)
}
