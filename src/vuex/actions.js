// An action will receive the store as the first argument.
// Since we are only interested in the dispatch (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature

import firebase from 'src/data/Auth'
import router from 'src/router'
import { _ } from 'underscore'

export const saveListingInState = function ({dispatch, state}) {

}

export const setCurrentDate = function (store) {
  return new Promise(function (resolve, reject) {
    resolve(new Date())
  })
}

export const uploadImages = function (store, uri, images) {
  return new Promise(function (resolve, reject) {
    store.dispatch('TOTAL_IMAGES', images.length)
    const uploadedImages = []
    _.each(images, function (file) {
      const uploadTask = uri.child(file.name).put(file)

      uploadTask.on('state_changed', function (snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
        store.dispatch('UPDATE_UPLOAD_PROGRESS', progress)
      }, function (error) {
        console.log('Not going so well', error)
        // write and dispatch error
      }, function () {
        console.log('Complete')
        // write and dispatch success

        uploadedImages.push(uploadTask.snapshot.downloadURL)

        store.dispatch('NUMBER_IMAGES_COMPLETE', uploadedImages.length)

        if (uploadedImages.length === images.length) {
          resolve(uploadedImages)
        }
      })
    })
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
  const imageEndpoint = firebase.storage().ref().child(`images/${userUID}/${itemUID}/`)
  // 4. Upload to firebase
  firebase.database().ref('items/' + itemUID).set({
    sellerUID: userUID,
    categories: item.categories,
    title: item.title,
    price: item.price,
    description: item.description,
    location: {},
    _geoloc: {
      lat: '',
      lng: ''
    },
    type: item.type,
    status: 'pending-payment',
    viewed: 0,
    favourited: 0,
    convs: []
  })

  // Upload images
  const toUpload = item.imageRefs

  uploadImages(store, imageEndpoint, toUpload).then(function (images) {
    firebase.database().ref(`items/${itemUID}`).update({
      images: images
    })
  })

  // Set relevant dates
  setCurrentDate(store).then(function (date) {
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
  router.go({ path: '/checkout' })
}

export const updateListing = function ({dispatch, state}) {

}

export const removeListing = function ({dispatch, state}) {

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
