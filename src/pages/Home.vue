<template>
  <div id="home">
    <h1>Home</h1>
    <button label="Test"></button>
    <p>The count is {{ counterValue }} </p>
    <increment></increment>
  </div>
</template>

<script>
import Button from 'src/components/Button'
import { getCount } from 'src/vuex/getters'
import Increment from 'src/components/Increment'

export default {
  name: 'Home',
  components: {
    Button,
    Increment
  },
  vuex: {
    getters: {
      // note that you're passing the function itself, and not the value 'getCount()'
      counterValue: getCount
    }
  }
}
</script>

<style>

</style>
