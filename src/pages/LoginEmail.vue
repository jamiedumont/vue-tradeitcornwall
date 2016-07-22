<template>
  <div class="login-screen">
    <div v-link="{ name: 'home'}" class="cross">
      <img src="../assets/cross.svg" alt="Close">
    </div>
    <div class="logo">
      <img src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
    </div>

    <div class="form">
      <input placeholder="Email..." v-model="email">
      <input type="password" placeholder="Password..." v-model="password">
    </div>

    <div class="buttons">
      <div v-link="{ name: 'home'}" @click="login(email,password)" class="button login">
        <h1>Login</h1>
      </div>
      <div v-link="{ name: 'login'}" class="button back">
        <h1>Back</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from 'src/vuex/actions'
export default {
  name: 'LoginEmail',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  vuex: {
    actions: {
      login
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../scss/1_settings/settings.colours.scss";

  .form {
    width: 90vw;
    margin: 3em auto;
  }
  .login {
    background-color: $primary-colour;
  }
  .back {
    background-color: $black;
    color: $off-white;
    h1 {
      font-weight: 400;
      font-size: 16px;
    }
  }
  .buttons {
    position: absolute;
    bottom: 0;
    width: 100vw;
  }
  .button {
    cursor: pointer;
    h1 {
      padding: 20px;
      text-align: center;
      margin: 0;
      letter-spacing: 0.7px;
    }
  }
  .login-screen {
    background: url(../assets/cornwall_1.jpg);
    background-position: center;
    height: 100vh;
    background-repeat: none;
    background-size: cover;
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
    max-width: 60vw;
    margin: 0 auto;
    padding-top: 10vh;
    img {
      width: 100%;
    }
  }
</style>
