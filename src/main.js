import Vue from 'vue'
import VueMdl from 'vue-mdl'

import App from './App'
import router from './router'
import 'src/startup'

Vue.use(VueMdl)

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
