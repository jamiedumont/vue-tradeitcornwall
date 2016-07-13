<template>
  <div id="home">
    <h1>Sign Up</h1>
    <input v-model="email">
    <input v-model="password">
    <button @click="newUser(email,password)" label="New user"></button>

    <h1>Log In</h1>
    <input v-model="loginEmail">
    <input v-model="loginPassword">
    <button @click="login(loginEmail,loginPassword)" label="Login"></button>

    <button @click="currentUser" label="Current User"></button>
    <button @click="signOut" label="Sign Out"></button>
  </div>
</template>

<script>
import Button from 'src/components/Button'
import { newUser, login, currentUser, signOut } from 'src/vuex/actions'

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
    Button
  },
  vuex: {
    actions: {
      newUser,
      login,
      currentUser,
      signOut
    }
  }
}
</script>

<style>

</style>
