<template>
  <div class="login-screen flex justify-center items-center">

    <!-- Change this to a "back" or "cancel" dialog -->
    <div v-link="{ name: 'home'}" class="w1 absolute top-1 right-1">
      <img class="w-100" src="../assets/cross.svg" alt="Close">
    </div>


    <div class="w-100 pa3 mw5-ns pa3-ns bg-black-70 center">

      <div class="ma4 mw5 center">
        <img class="db center w-60" src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
      </div>

      <div class="mt5">

        <button
          v-link="{ name: 'login-email'}"
          class="pointer f4 pa2 b w-100 mw5 bg-transparent ba ma2 bw1 b--gold center white tc center db hover-bg-gold hover-dark-gray"
        >
          Login
        </button>

        <button
          v-link="{ name: 'home'}"
          @click="oAuthLogin('facebook')"
          class="pointer f6 pa2 w-100 mw5 bg-transparent ba ma2 bw1 b--facebook center white tc center db hover-bg-facebook"
        >
          Login with Facebook
        </button>

        <button
          v-link="{ name: 'signup'}"
          class="pointer f6 pa2 db w-100 mw5 bg-transparent ba mt2 mb3 mb0-ns bw1 b--silver center white tc hover-bg-silver"
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
    background: url(../assets/cornwall.jpg);
    background-position: center;
    height: 100vh;
    background-repeat: none;
    background-size: cover;
  }
</style>
