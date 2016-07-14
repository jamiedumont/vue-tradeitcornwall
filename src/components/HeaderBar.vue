<template>
  <div id="header">
    <p>
    <!-- use v-link directive for navigation. -->
    <a v-link="{ path: '/' }">Home</a>
    <a v-link="{ path: '/buy' }">Buy</a>
    <a v-link="{ path: '/sell' }">Sell</a>
    <a v-link="{ path: '/about' }">About</a>
  </p>
  </div>

  <h4 class="login-modal-trigger"@click="showModal = true">Login</h4>

  <modal :show.sync="showModal">
    <h3 slot="header">Login</h3>
    <div slot="body">
      <button @click="showModal = false, oAuthLogin('google')" label="Google Login"></button>
      <button @click="showModal = false, oAuthLogin('facebook')" label="Facebook Login"></button>
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

<style>
  .login-modal-trigger {
    position: absolute;
    right: 30px;
    top: 30px;
  }
</style>
