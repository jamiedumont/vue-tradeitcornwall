<template>
  <div class="bg-gold">
    <div class="center flex items-center w-100 mw8 justify-between h3">
      <div class="h-75 pa1 pl3">
        <img v-link="{ path: '/' }" class="h-100 pointer" src="../assets/tic-logo.svg" alt="Trade It Cornwall">
      </div>


      <div class="h3">

        <!-- DESKTOP MENU -->
        <div class="dn flex-ns" v-if="loggedIn">
          <div v-link="{ name: 'buy'}" class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">
            <img class="search-icon" src="../assets/search.svg" alt="" />
          </div>
          <div v-link="{ name: 'sell'}" class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">
            <img class="sell-icon" src="../assets/sell-black.svg" alt="" />
          </div>
          <div v-link="{ name: 'inbox'}" class="pointer hover-bg-lighten dib h3 w3 flex items-center justify-center">

            <img class="message-icon" src="../assets/message-icon-black.svg" alt="" />
            <span class="message-icon-number ba br-100 b--black bg-red white h1 w1">{{ messages }}</span>

          </div>
          <div id="menu-example" class="pointer hover-bg-lighten dib h3 dt pr2">
            <h5 class="dtc v-mid f6 fw5 ph1">{{firstName}}</h5>
            <div class="dtc v-mid h3">
              <img
                class="br-100 ba b--white-80 fr ma1 h-50"
                :src="avatar"
                :alt="displayName"
              />
            </div>
          </div>
          <mdl-menu for="menu-example">
            <mdl-menu-item v-link="{ name: 'user-dashboard'}">Account</mdl-menu-item>
            <mdl-menu-item @click="headerSignOut">Log Out</mdl-menu-item>
          </mdl-menu>
        </div>

        <div v-else class="dt w3 h3 tc" v-link="{ name: 'login'}">
          <h5 class="dtc v-mid f6">Login</h5>
        </div>

        <!-- MOBILE MENU -->

        <div class="dn-ns">
          <div @click="showMenu = true" class="dt pr2" v-if="loggedIn">
            <h5 class="dtc v-mid f6 fw5 pr1">Menu</h5>
            <div class="dtc v-mid h3">
              <img
                class="br-100 ba b--white-80 fr ma1 h-50"
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
  import { signOut } from 'src/vuex/modules/accounts/actions'

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
      },
      actions: {
        signOut
      }
    },
    methods: {
      headerSignOut () {
        this.signOut()
      }
    },
    computed: {
      avatar () {
        // TODO: Replace this avatar with a locally served one.
        return this.photoURL ? this.photoURL : 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
      },
      firstName () {
        return this.displayName.split(' ')[0]
      }
    }
  }
</script>

<style>
  .search-icon {
    height: 25px;
  }
  .sell-icon {
    height: 35px;
    margin-top: -5px;
  }
  .message-icon {
    position: relative;
    left: 7px;
    height: 28px;
    margin-top: 5px;
  }
  .message-icon-number {
    position: relative;
    font-size: 0.6em;
    text-align: center;
    top: -12px;
    left: -4px;
  }
</style>
