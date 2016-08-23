import { _ } from 'underscore'
import firebase from 'src/data/Firebase'
import router from 'src/router'

export const uploadImages = function (store, userUID, itemUID, images) {
  return new Promise(function (resolve, reject) {
    // If no images are passed to function, reject
    if (images.length === 0) {
      reject('NO_IMAGES', 'No images to upload')
    }

    store.dispatch('TOTAL_IMAGES', images.length)

    const uploadedImages = []

    const uri = firebase.storage().ref().child(`images/${userUID}/${itemUID}/`)

    _.each(images, function (file) {
      const uploadTask = uri.child(file.name).put(file)

      uploadTask.on('state_changed', function (snapshot) {
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        store.dispatch('UPDATE_UPLOAD_PROGRESS', progress)
      }, function (error) {
        console.log('Not going so well', error)
        // dispatch error along with reject
      }, function () {
        // write and dispatch success
        uploadedImages.push(uploadTask.snapshot.downloadURL)

        store.dispatch('NUMBER_IMAGES_COMPLETE', uploadedImages.length)

        if (uploadedImages.length === images.length) {
          addImagesToListing(store, itemUID, uploadedImages)
          resolve(uploadedImages)
        }
      })
    })
  })
}

export const addImagesToListing = function (store, itemUID, images) {
  // Add array of image URLS to listing
  firebase.database().ref(`items/${itemUID}`).update({
    images: images
  })
  // Move to checkout
  router.go({ path: '/checkout' })
  // Zero upload state in store
  store.dispatch('NUMBER_IMAGES_COMPLETE', 0)
  store.dispatch('UPDATE_UPLOAD_PROGRESS', 0)
  store.dispatch('TOTAL_IMAGES', 0)
}
