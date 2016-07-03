<template>
  <div id="header">
    <p>
    <!-- use v-link directive for navigation. -->
    <a v-link="{ path: '/' }">Home</a>
    <a v-link="{ path: '/buy' }">Buy</a>
    <a v-link="{ path: '/sell' }">Sell</a>
    <a v-link="{ path: '/about' }">About</a>
  </p>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
