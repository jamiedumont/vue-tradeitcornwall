import firebase from 'src/data/Firebase'
import router from 'src/router'

import { uploadImages } from 'src/vuex/modules/uploads/actions'

export const setCurrentDate = function (store) {
  return new Promise(function (resolve, reject) {
    resolve(new Date())
  })
}

export const addListing = function (store) {
  // 0. Go to /sell/uploading view
  router.go({ path: '/sell/uploading' })
  // 1. Get a reference for the item from firebase
  const itemUID = firebase.database().ref().child('items').push().key
  // 2. Get the item to list from Vuex Store
  const item = store.state.newListing
  // 3. Append details to that item (userUID, dateListed, dateLastEdited, status)
  const userUID = store.state.accounts.user.uid
  // 4. Upload to firebase
  firebase.database().ref('items/' + itemUID).set({
    sellerUID: userUID,
    categories: item.categories,
    title: item.title,
    price: item.price,
    description: item.description,
    location: item.location,
    _geoloc: item._geoloc,
    type: item.type,
    status: 'pending-payment',
    viewed: 0,
    favourited: 0,
    convs: []
  })

  // Upload images
  const toUpload = item.imageRefs

  const imageEndpoint = firebase.storage().ref().child(`images/${userUID}/${itemUID}/`)

  uploadImages(store, imageEndpoint, toUpload).then(function (images) {
    firebase.database().ref(`items/${itemUID}`).update({
      images: images
    })
    router.go({ path: '/checkout' })
  })

  // Set relevant dates
  setCurrentDate(store).then(function (date) {
    console.log('dating')
    firebase.database().ref(`items/${itemUID}`).update({
      dateListed: date,
      dateLastEdited: date
    })
  })

  // 5. Add item ID to user account in Firebase
  firebase.database().ref(`users/${userUID}/items/${itemUID}`).set(true)

  // 6. Add item ID to checkout, along with cost
  const cost = item.type === 'vehicle' ? 500 : 200
  store.dispatch('ADD_TO_CHECKOUT', itemUID, cost)
  // 6. router.go('/checkout')
}

export const updateListing = function ({dispatch, state}) {

}

export const removeListing = function ({dispatch, state}) {

}
