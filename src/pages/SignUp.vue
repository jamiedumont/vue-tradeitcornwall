<template>
  <div class="login-screen flex justify-center items-center">

    <!-- Change this to a "back" or "cancel" dialog -->
    <div v-link="{ name: 'home'}" class="w1 absolute top-1 right-1">
      <img class="w-100" src="../assets/cross.svg" alt="Close">
    </div>


    <div class="flex flex-column justify-between h-100 w-100 bg-black-70 center pa3 mw5-ns pa3-ns h-auto-ns">

      <div class="mt2 mb3 mw5 center">
        <img class="db center w-60" src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
      </div>

      <div class="">

        <h2 class="tc center f4 mb4 white">New Account</h2>

        <div class="mw5 center">
          <input placeholder="Email..." v-model="email">
          <input type="password" placeholder="Password..." v-model="password">
        </div>

        <button
          @click="newUser(email, password)"
          class="pointer f4 pa2 b mw5 w-100 bg-gold ba mb2 bw1 b--gold center dark-gray tc center db hover-bg-transparent hover-white"
        >
          Sign Up
        </button>


        <button
          v-link="{ name: 'login'}"
          class="pointer f6 pa2 db w-100 mw5 bg-silver ba mt2 mb3 mb0-ns bw1 b--silver center white tc hover-bg-transparent hover-white"
        >
          Back
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import { newUser } from 'src/vuex/modules/accounts/actions'

export default {
  name: 'SignUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  vuex: {
    actions: {
      newUser
    }
  }
}
</script>

<style lang='scss' scoped>
  .login-screen {
    background: url(http://www.purecornwall.co.uk/wp-content/uploads/2014/06/st-agnes.jpg);
    background-position: center;
    height: 100vh;
    background-repeat: none;
    background-size: cover;
  }
</style>
