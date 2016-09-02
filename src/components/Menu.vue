<template>
    <div v-show="show" class="login-screen">

      <div @click="close" class="cross">
        <img src="../assets/cross.svg" alt="Close">
      </div>

      <div class="logo">
        <img src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
      </div>

      <div class="avatar">
        <div class="o-avatar o-avatar--large">
          <img v-if="photoURL" v-bind:src="photoURL" alt="{{ displayName }}">
          <img v-else src="../assets/avatar.png">
        </div>
        <span class="ma2 f6 db light-gray tc" v-if="displayName">{{ displayName }}</span>
        <span v-else>Please head to your profile and add your name</span>
      </div>

      <div class="search-box">
        <input class="i" v-model="searchValue" @keyup.enter="search" placeholder="Search Cornwall...">
        <span class="input-icon">
          <img class="input-icon-actual" src="../assets/search.svg" alt="Search">
        </span>
      </div>

      <div class="menu">

        <div v-link="{ name: 'sell'}" class="o-media o-media--centre menu__item">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/sell-icon.svg" alt="Sell">
          </div>
          <div class="o-media__body">
            <span class="menu__text tracked">Sell</span>
          </div>
        </div>

        <div class="o-media o-media--centre menu__item">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/message-icon.svg" alt="Messages">
          </div>
          <div class="o-media__body">
            <span class="menu__text tracked">Messages</span>
          </div>
        </div>

        <div class="o-media o-media--centre menu__item menu__item--last">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/account-icon.svg" alt="Account">
          </div>
          <div class="o-media__body">
            <span class="menu__text tracked">Account</span>
          </div>
        </div>

        <div @click="menuSignOut" class="o-media o-media--centre menu__item menu__item--detached">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/account-icon.svg" alt="Account">
          </div>
          <div class="o-media__body">
            <span class="menu__text">Logout</span>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
  import { signOut } from 'src/vuex/modules/accounts/actions'

  export default {
    name: 'Menu',
    data: function () {
      return {
        searchValue: ''
      }
    },
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      }
    },
    methods: {
      close: function () {
        this.show = false
      },
      menuSignOut: function () {
        this.close()
        this.signOut()
      },
      search: function () {
        const router = this.$route.router
        router.go({
          name: 'buy',
          query: { q: this.searchValue }
        })
      }
    },
    vuex: {
      actions: {
        signOut
      },
      getters: {
        displayName: state => state.accounts.user.displayName,
        photoURL: state => state.accounts.user.photoURL
      }
    },
    ready: function () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close()
        }
      })
    }
  }
</script>

<style lang='scss' scoped>
  @import "../scss/1_settings/settings.colours.scss";

  .full-width {
    width: 56px
  }
  .login-screen {
    position: fixed;
    top: 0;
    width: 100vw;
    background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(../assets/cornwall_2.jpg);
    background-position: center;
    height: 100vh;
    background-repeat: none;
    background-size: cover;
    z-index: 10;
  }
  .cross {
    width: 18px;
    position: absolute;
    top: 12px;
    right: 12px;
    img {
      width: 100%;
    }
  }
  .logo {
    max-width: 30vw;
    margin: 0 auto;
    padding-top: 5vh;
    img {
      width: 100%;
    }
  }
  .search-box {
    width: 60vw;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 100px;
    input {
      margin: 0;
      border: none;
      border-radius: 100px;
      height: 32px;
      font-size: 12px;
      flex: 1;
    }
    input:focus {
      margin: 0;
      border: none;
    }
    .input-icon {
      padding-right: 10px;
      align-self: center;
    }
  }
  .avatar {
    max-width: 40vw;
    margin: 0 auto;
    padding-top: 2vh;
    .o-avatar {
      margin: 0 auto;
    }
    h4 {
      color: $off-white;
      margin: 10px auto;
    }
  }
  .menu {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }

  .menu__icon-container {
    width: 18px;
    img {
      margin: 0 auto;
    }
  }
  .menu__item {
    margin-left: 10vw;
    padding: 10px 0;
    border-top: 1px solid rgba(255,255,255,0.3);
    margin-bottom: 0;
    cursor: pointer;
  }

  .menu__item--last {
    border-bottom: 1px solid rgba(255,255,255,0.3);
  }

  .menu__item--detached {
    margin-top: 2em;
    border: none;
  }

  .menu__text {
    text-transform: uppercase;
    color: $off-white;
    font-size: 18px;
    font-weight: 700;
  }

</style>
