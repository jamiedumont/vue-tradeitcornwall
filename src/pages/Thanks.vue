<template>
  <header-bar></header-bar>
  <div id="thanks">

    <div class="thanks-modal">
      <img class="thanks__logo" src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
      <h1>You're awesome!</h1>
      <p>Your payment has been successful, and your item(s) will be live on the site in a moment.</p>
      <p>Whilst you're waiting, why not see what's for sale near you?</p>

      <button v-link="{ path: '/buy' }"class="o-btn o-btn--large o-btn--ghost-white">Search marketplace</button><br/>
      <a class="thanks__link" href="mailto:jamie@tradeitcornwall.co.uk">Could this have been better? Tell us and we'll make it so!</a>

    </div>

  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'

export default {
  name: 'Thanks',
  components: {
    HeaderBar
  }
}
</script>

<style lang="scss">
  @import "../scss/1_settings/settings.colours.scss";
  #thanks {
    text-align: center;
    background: url("https://upload.wikimedia.org/wikipedia/commons/a/af/Land's_End,_Cornwall,_England.jpg") center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    // align-items: center;
    justify-content: center;
  }
  .thanks-modal {
    margin-top: 5vh;
    height: 80%;
    max-height: 400px;
    width: 80%;
    max-width: 400px;
    background-color: rgba(0,0,0,0.8);
    color: white;
    padding: 5vh;
    p {
      font-size: 12px;
      line-height: 1.5
    }
  }

  .thanks__logo {
    width: 60%;
    margin: 0 30px 30px;
  }

  .thanks__link {
    color: white;
    font-size: 9px;
    position: relative;
  }

  .thanks__link:hover {
    text-decoration: none;
    color: $primary-colour;
  }
</style>
