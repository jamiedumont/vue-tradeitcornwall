<template>
  <header-bar></header-bar>
  <div class="mw8 ph4-ns center bg-white vh-100">
    <h1 class="ma4 b dib f4">Your Account</h1>

    <a v-link="{ name: 'user-billing'}">Billing History</a>
  </div>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar'
export default {
  name: 'UserDashboard',
  components: {
    HeaderBar
  }
}
</script>

<style>

</style>
