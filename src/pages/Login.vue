<template>
  <div class="login-screen flex justify-center items-center">

    <!-- Change this to a "back" or "cancel" dialog -->
    <div v-link="{ name: 'home'}" class="w1 absolute top-1 right-1">
      <img class="w-100" src="../assets/cross.svg" alt="Close">
    </div>


    <div class="flex flex-column justify-between vh-100 w-100 bg-black-70 center pa3 mw5-ns pa3-ns h-auto-ns">

      <div class="ma4 mw5 center">
        <img class="db center w-60" src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
      </div>

      <div>

        <button
          v-link="{ name: 'login-email'}"
          class="pointer f4 pa2 b mw5 w-100 bg-gold ba ma2 bw1 b--gold center dark-gray tc center db hover-bg-transparent hover-white"
        >
          Login
        </button>

        <button
          v-link="{ name: 'home'}"
          @click="oAuthLogin('facebook')"
          class="pointer f6 pa2 w-100 mw5 bg-facebook ba ma2 bw1 b--facebook center white tc center db hover-bg-transparent"
        >
          Login with Facebook
        </button>

        <button
          v-link="{ name: 'signup'}"
          class="pointer f6 pa2 db w-100 mw5 bg-silver ba mt2 mb3 mb0-ns bw1 b--silver center dark-gray tc hover-bg-transparent hover-white"
        >
          Create an account
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { oAuthLogin } from 'src/vuex/modules/accounts/actions'
export default {
  name: 'Login',
  vuex: {
    actions: {
      oAuthLogin
    }
  }
}
</script>

<style lang='scss' scoped>
  .login-screen {
    background: url(http://www.purecornwall.co.uk/wp-content/uploads/2014/06/st-agnes.jpg);
    background-position: center;
    min-height: 100vh;
    height: 100%;
    background-repeat: none;
    background-size: cover;
  }
</style>
