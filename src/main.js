import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'

const config = {
  apiKey: 'AIzaSyAloSIXHBzC39AfzvabL5EbfHiGeVtPYA8',
  authDomain: 'tradeitcornwall.firebaseapp.com',
  databaseURL: 'https://tradeitcornwall.firebaseio.com',
  storageBucket: 'tradeitcornwall.appspot.com'
}
firebase.initializeApp(config)

firebase.database().ref('users/').set({
  username: 'Jamie',
  email: 'test@test.com'
})

import App from './App'
import router from './router'

Vue.use(VueFire)

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
