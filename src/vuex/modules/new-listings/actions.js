import firebase from 'src/data/Firebase'
import router from 'src/router'

import { uploadImages } from 'src/vuex/modules/uploads/actions'
import { addToCheckout } from 'src/vuex/modules/checkout/actions'

export const setCurrentDate = function (store, itemUID) {
  firebase.database().ref(`items/${itemUID}`).update({
    dateListed: new Date(),
    dateLastEdited: new Date()
  })
}

function type (store) {
  if (store.state.newListing.categories.lvl0 === 'Vehicles') {
    return 'vehicle'
  }
  return 'item'
}

export const addListing = function (store) {
  // 0. Go to /sell/uploading view
  // TODO: This is a mutation to state, and should be handled in a dispatch
  router.go({ path: '/sell/uploading' })
  // 1. Get a reference for the item from firebase
  const itemUID = firebase.database().ref().child('items').push().key
  // 2. Get the item to list from Vuex Store
  const item = store.state.newListing
  // 3. Append details to that item (userUID, dateListed, dateLastEdited, status)
  const userUID = store.state.accounts.user.uid

  const newItem = {
    sellerUID: userUID,
    categories: item.categories,
    title: item.title,
    price: item.price,
    description: item.description,
    location: item.location,
    _geoloc: item._geoloc,
    type: type(store),
    status: 'pending-payment',
    viewed: 0,
    favourited: 0,
    convs: []
  }
  // 4. Upload to firebase
  firebase.database().ref('items/' + itemUID).set(newItem)

  // Upload images
  const toUpload = item.imageRefs

  uploadImages(store, userUID, itemUID, toUpload)

  // 5. Add item ID to user account in Firebase
  firebase.database().ref(`users/${userUID}/items/${itemUID}`).set(true)

  // 6. Add item ID to checkout, along with cost
  addToCheckout(store, userUID, itemUID, newItem)
  // 6. router.go('/checkout')
}

export const updateListing = function ({dispatch, state}) {

}

export const removeListing = function ({dispatch, state}) {

}
