<template>
  <div>
  <select v-model="categories.lvl0">
    <option v-for="option in lvl0options" v-bind:value="option">
      {{ option }}
    </option>
  </select>

  <select v-if="categories.lvl0 !== ''" v-model="categories.lvl1">
    <option v-for="option in lvl1options" v-bind:value="option">
      {{ option }}
    </option>
  </select>

  <h2>Selected: {{ categories.lvl0 }}: {{ categories.lvl1 }}</h2>
  </div>
</template>

<script>
  export default {
    // Options / Data
    name: 'CategorySelect',
    data () {
      return {
        lvl0options: [ 'Sports', 'Home', 'Electronics', 'Pets', 'Vehicles', 'Clothing' ]
      }
    },
    props: [ 'categories' ],
    computed: {
      lvl1options: function () {
        const options = {
          'Sports': [
            'Outdoor',
            'Running',
            'Watersports'
          ],
          'Home': [
            'Furniture',
            'Kitchen',
            'Bathroom',
            'Living',
            'Garden',
            'Garage',
            'Other'
          ],
          'Electronics': [
            'Computers & Tablets',
            'Consoles & Video games',
            'Music',
            'TV & Film',
            'Photography',
            'Mobile phones'
          ],
          'Pets': [],
          'Vehicles': [
            'Cars',
            'Motorbikes',
            'Boats',
            'Other'
          ],
          'Clothing': [
            'Womens',
            'Mens',
            'Childrens',
            'Jewellery & Watches'
          ]
        }
        return options[this.categories.lvl0] || []
      }
    },
    methods: {},
    watch: {
      'categories.lvl0': function () {
        this.categories.lvl1 = ''
      }
    }
    // Options / DOM
    // el () {},
    // replace: true,
    // template: '',
    // Options / Lifecycle Hooks
    // init () {},
    // crated () {},
    // beforeCompile () {},
    // compiled () {},
    // ready () {},
    // attached () {},
    // detached () {},
    // beforeDestroy () {},
    // destroyed () {},
    // Options / Assets
    // directives: {},
    // elementDirectives: {},
    // filters: {},
    // components: {},
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    // events: {},
    // mixins: [],
    // name: ''
  }
</script>

<style>

</style>
