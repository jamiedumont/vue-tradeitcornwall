// On load of /sell, create a data point that is the new items ID
const newItemUID = firebase.database().ref().child('items').push().key

// When uploading images, the URL structure is "/userUID/items/itemUID/filename.ext"
// An upload would then look like this...

const userUID = alsdjultasodugabmnsa7;
const itemUID = newItemUID;

const storageRef = firebase.storage().ref();

// forEach file in files

const uploadTask = storageRef.child(`${userUID}/items/${newItemUID}/${file.name}`).put(file);

uploadTask.on('state_changed', function (snapshot) {
  // Observe state change events such as progress, pause, and resume
  console.log(snapshot)
  // Pause the upload
  uploadTask.pause()

  // Resume the upload
  uploadTask.resume()

  // Cancel the upload
  uploadTask.cancel()
}, function (er) {
  // Handle errors
}, function () {
  const downloadURL = uploadTask.snapshot.downloadURL;
  console.log(uploadTask)
})

// each downloadURL then is stored in an Array which is synced to the listing
// object in the component state.
