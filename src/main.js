// Import NPM dependancies
import Vue from 'vue'
import VueFire from 'vuefire'
import { sync } from 'vuex-router-sync'
import VueMdl from 'vue-mdl'

// Import App dependancies
import App from './App'
import store from 'src/vuex/store'
import router from './router'

// Import Vuex actions to perform on startup
import { getAuth } from 'src/vuex/modules/accounts/actions'
import { getUsersConversations } from 'src/vuex/modules/conversations/actions'

// Bind Vue to various addons
Vue.use(VueMdl)
Vue.use(VueFire)

// Bind Vuex and VueRouter
sync(store, router)

// Initialise startup.
// Checkout for user auth and login... [1]
// Then get relevant data needed (conversations)... [2]
// And start the app [3]
getAuth(store).then((userUID) => { // [1]
  if (userUID === 'no-user') {
    router.start(App, '#app')
  } else {
    const conversationState = getUsersConversations(store, userUID)

    Promise.all([conversationState]).then((values) => { // [2]
      router.start(App, '#app') // [3]
    })
  }
})
