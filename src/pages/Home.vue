<template>
  <header-bar></header-bar>
  <div id="home">

  </div>
</template>

<script>
  import HeaderBar from 'src/components/HeaderBar'

  export default {
    name: 'Home',
    components: {
      HeaderBar
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
