import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAloSIXHBzC39AfzvabL5EbfHiGeVtPYA8',
  authDomain: 'tradeitcornwall.firebaseapp.com',
  databaseURL: 'https://tradeitcornwall.firebaseio.com',
  storageBucket: 'tradeitcornwall.appspot.com'
}

firebase.initializeApp(config)

export default {
  currentUser () {
    return firebase.auth().currentUser
  },
  newUser (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // [START_EXCLUDE]
      if (errorCode === 'auth/weak-password') {
        console.log('The password is too weak.')
      } else {
        console.log(errorMessage)
      }
      console.log(error)
    })
  }
}
