import { _ } from 'underscore'

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
        // dispatch error along with reject
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
