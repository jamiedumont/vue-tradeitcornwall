import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAloSIXHBzC39AfzvabL5EbfHiGeVtPYA8',
  authDomain: 'tradeitcornwall.firebaseapp.com',
  databaseURL: 'https://tradeitcornwall.firebaseio.com',
  storageBucket: 'tradeitcornwall.appspot.com'
}

firebase.initializeApp(config)

export default firebase

export const currentUser = firebase.auth().currentUser

// Firebase watches for changes at the correct message endpoint, when a change it detected, do something with it and dispatch
