<template>
  <div class="login-screen">
    <div class="cross">
      <img src="../assets/cross.svg" alt="Close">
    </div>
    <div class="logo">
      <img src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
    </div>

    <div class="buttons">
      <div class="button login">
        <h1>Login</h1>
      </div>
      <div class="button facebook">
        <h1>Login with Facebook</h1>
      </div>
      <div class="button signup">
        <h1>Create an account</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang='scss' scoped>
@import "../scss/1_settings/settings.colours.scss";
  .login {
    background-color: $primary-colour;
  }
  .facebook {
    background-color: $facebook-blue;
    color: $off-white;
    h1 {
      font-weight: 400;
      font-size: 16px;
    }
  }
  .signup {
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
    h1 {
      padding: 20px;
      text-align: center;
      margin: 0;
      letter-spacing: 0.7px;
    }
  }
  .login-screen {
    background: url(../assets/cornwall.jpg);
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
