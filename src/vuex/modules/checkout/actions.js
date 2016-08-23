import firebase from 'src/data/Firebase'

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
