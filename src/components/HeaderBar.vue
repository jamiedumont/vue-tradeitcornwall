<template>
  <div id="header">
    <div class="header__nav">
      <!-- use v-link directive for navigation. -->
      <h4 v-link="{ path: '/buy' }">Buy</h4>
      <h4 v-link="{ path: '/sell' }">Sell</h4>
      <h4 v-link="{ path: '/about' }">About</h4>
    </div>

    <img v-link="{ path: '/' }" class="header__logo" src="../assets/tic-logo.svg" alt="Trade It Cornwall">

    <div class="login-modal-trigger"@click="showModal = true">
      <h4 class="lmt__header">Login</h4>
      <span class="lmt__tip">or Sign Up</span>
    </div>
  </div>



  <modal :show.sync="showModal">
    <h3 slot="header">Login</h3>
    <div slot="body">
      <span class="modal-task">Use an account you already have...</span>
      <div class="login-buttons">
        <img class="login-icon" @click="showModal = false, oAuthLogin('facebook')" src="../assets/facebook.svg" alt="Login with Facebook" />
        <h3>OR</h3>
        <img class="login-icon" @click="showModal = false, oAuthLogin('google')" src="../assets/google-plus.svg" alt="Login with Google" />
      </div>
    </div>
  </modal>

</template>

<script>
import Button from 'src/components/Button'
import Modal from 'src/components/Modal'
import { oAuthLogin } from 'src/vuex/actions'

export default {
  components: {
    Button,
    Modal
  },
  data: function () {
    return {
      showModal: false
    }
  },
  vuex: {
    actions: {
      oAuthLogin
    }
  }
}
</script>

<style lang="scss" scoped>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
  }
  .header__logo {
    width: 150px;
    cursor: pointer;
  }
  .header__nav {
    h4 {
      margin-right: 10px;
      display: inline-block;
      cursor: pointer;
    }
    h4:hover {
      color: #E2B644;;
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
    color: #E2B644;;
  }
  .lmt__header {
    margin: 0;
  }
  .lmt__tip {
    margin: 5px 0;
    font-size: 0.6em;
    font-style: italic;
  }
</style>
