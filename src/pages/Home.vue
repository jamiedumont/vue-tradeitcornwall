<template>
  <header-bar></header-bar>
  <div id="home">
    <input placeholder="What are you looking for?">

    <h1>Featured Listings</h1>

    <div class="o-media o-media--centre">
      <div class="o-media__img">
        <div style="height: 70px; width: 100px; background-color: #ddd;"></div>
      </div>
      <div class="o-media__body">
        <p style="font-size: 10px; text-align: left" class="o-media__title">2005 BMW 330ci Manual</p>
        <p style="font-style: italic; font-size: 11px; font-weight: 500; margin-top: 0; text-align: left">£5000</p>
      </div>
    </div>

    <div class="o-media o-media--centre">
      <div class="o-media__img">
        <div style="height: 70px; width: 100px; background-color: #ddd;"></div>
      </div>
      <div class="o-media__body">
        <p style="font-size: 10px; text-align: left" class="o-media__title">Channel Islands 5'10" Quad-fish</p>
        <p style="font-style: italic; font-size: 11px; font-weight: 500; margin-top: 0; text-align: left">£300</p>
      </div>
    </div>

    <div class="o-media o-media--centre">
      <div class="o-media__img">
        <div style="height: 70px; width: 100px; background-color: #ddd;"></div>
      </div>
      <div class="o-media__body">
        <p style="font-size: 10px; text-align: left" class="o-media__title">Rip-Curl Flashbomb 5/3</p>
        <p style="font-style: italic; font-size: 11px; font-weight: 500; margin-top: 0; text-align: left">£200</p>
      </div>
    </div>

    <div class="o-media o-media--centre">
      <div class="o-media__img">
        <div style="height: 70px; width: 100px; background-color: #ddd;"></div>
      </div>
      <div class="o-media__body">
        <p style="font-size: 10px; text-align: left" class="o-media__title">Pine Wardrobe</p>
        <p style="font-style: italic; font-size: 11px; font-weight: 500; margin-top: 0; text-align: left">£75</p>
      </div>
    </div>

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
    max-width: 400px;
    min-height: 900px;
    margin: 0 auto;
    text-align: center;
  }
</style>
