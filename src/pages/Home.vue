<template>
  <header-bar></header-bar>
  <div id="home">
    <!-- <h1>Sign Up</h1>
    <input v-model="email">
    <input v-model="password">
    <button @click="newUser(email,password)" label="New user"></button>

    <h1>Log In</h1>
    <input v-model="loginEmail">
    <input v-model="loginPassword">
    <button @click="login(loginEmail,loginPassword)" label="Login"></button>

    <button @click="ourCurrentUser" label="Current User"></button>
    <button @click="signOut" label="Sign Out"></button> -->
  </div>
</template>

<script>
import Button from 'src/components/Button'

import { newUser, login, ourCurrentUser, signOut } from 'src/vuex/actions'
import HeaderBar from 'src/components/HeaderBar'

export default {
  name: 'Home',
  data: function () {
    return {
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: ''
    }
  },
  components: {
    Button,
    HeaderBar
  },
  vuex: {
    actions: {
      newUser,
      login,
      ourCurrentUser,
      signOut
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../scss/1_settings/settings.colours.scss";

  #home {
    background-color: $off-white;
    padding: 30px;
    margin: 0 auto;
    text-align: center;
  }
</style>
