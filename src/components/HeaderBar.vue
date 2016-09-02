<template>
  <div class="pa1" id="header">
    <div class="center flex items-center w-100 mw8 justify-between pa2 h3">
      <img v-link="{ path: '/' }" class="header__logo" src="../assets/tic-logo.svg" alt="Trade It Cornwall">

      <div @click="showMenu = true" class="o-media o-media--reverse o-media--centre header-avatar" v-if="loggedIn">
        <div class="o-avatar o-avatar--small o-media__img">
            <img :src="avatar" :alt="displayName" />
        </div>
        <div class="o-media__body">
          <h5 class="f6">Menu</h5>
        </div>
      </div>

      <div v-else class="login-modal-trigger" v-link="{ name: 'login'}">
        <h5 class="lmt__header">Login</h5>
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
        photoURL: state => state.accounts.user.photoURL
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

<style lang="scss" scoped>
@import "../scss/1_settings/settings.colours.scss";

  .header-avatar {
    margin-bottom: 0;
    cursor: pointer;
    img {
      border: 1px solid $black;
    }
  }
  .header-avatar > .o-media__img {
    margin: 0 0 0 0.5em;
  }
  .login-buttons {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      margin: 0 30px;
    }
  }
  .modal-task {
    margin: 0 auto 20px;
    display: block;
    text-align: center;
    font-size: 0.8em;
    flex-basis: 100%;
    color: #333;
  }
  .login-icon {
    width: 50px;
    cursor: pointer;
  }
  #header {
    background-color: $primary-colour;
  }
  .header__logo {
    height: 100%;
    cursor: pointer;
  }
  .header__nav {
    h4 {
      margin-right: 10px;
      display: inline-block;
      cursor: pointer;
    }
    h4:hover {
      color: white;
    }
    h4:last-of-type {
      margin: 0;
    }
  }
  .login-modal-trigger {
    text-align: center;
    cursor: pointer;
  }
  .login-modal-trigger:hover {
    color: white;
  }
  .lmt__header {
    margin: 0;
    text-transform: uppercase;
  }
  .lmt__tip {
    margin: 5px 0;
    font-size: 0.6em;
    font-style: italic;
  }
</style>
