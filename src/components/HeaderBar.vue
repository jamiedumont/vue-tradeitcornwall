<template>
  <div class="bg-gold">
    <div class="center flex items-center w-100 mw8 justify-between h3">
      <div class="h-100 pv2 ph3">
        <img v-link="{ path: '/' }" class="h-100 pointer" src="../assets/tic-logo.svg" alt="Trade It Cornwall">
      </div>


      <div class="h3">

        <!-- DESKTOP MENU -->
        <div class="dn flex-ns">
          <div v-link="{ name: 'buy'}" class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">
            <span>Buy</span>
          </div>
          <div v-link="{ name: 'sell'}" class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">
            <span>Sell</span>
          </div>
          <div v-link="{ name: 'inbox'}" class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">
            <span>Messages</span>
          </div>
          <div class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">
            <span>Account</span>
          </div>
        </div>

        <!-- MOBILE MENU -->

        <div class="dn-ns">
          <div @click="showMenu = true" class="dt" v-if="loggedIn">
            <h5 class="dtc v-mid f6">Menu</h5>
            <div class="dtc v-mid w3 h3 pa2">
              <img
                class="br-100 ba b--black h-100"
                :src="avatar"
                :alt="displayName"
              />
            </div>
          </div>

          <div v-else class="dt w3 h3 tc" v-link="{ name: 'login'}">
            <h5 class="dtc v-mid f6">Login</h5>
          </div>
        </div>


      </div>


    </div>
  </div>

  <menu :show.sync="showMenu">
  </menu>

</template>

<script>
  import Menu from 'src/components/Menu'

  export default {
    name: 'HeaderBar',
    components: {
      Menu
    },
    data: function () {
      return {
        showMenu: false
      }
    },
    vuex: {
      getters: {
        loggedIn: state => state.accounts.user.loggedIn,
        displayName: state => state.accounts.user.displayName,
        email: state => state.accounts.user.email,
        photoURL: state => state.accounts.user.photoURL,
        messages: state => state.conversations.unreadCount
      }
    },
    computed: {
      avatar () {
        // TODO: Replace this avatar with a locally served one.
        return this.photoURL ? this.photoURL : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
      }
    }
  }
</script>

<style>

</style>
