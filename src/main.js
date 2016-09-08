import Vue from 'vue'
import VueFire from 'vuefire'
import { sync } from 'vuex-router-sync'
import VueMdl from 'vue-mdl'

import App from './App'
import store from 'src/vuex/store'
import router from './router'
// import 'src/startup'
import { getAuth } from 'src/vuex/modules/accounts/actions'
import { getUsersConversations } from 'src/vuex/modules/conversations/actions'

Vue.use(VueMdl)
Vue.use(VueFire)

sync(store, router)
getAuth(store).then((userUID) => {
  console.log(userUID)
  getUsersConversations(store, userUID).then(function () {
    router.start(App, '#app')
  })
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
