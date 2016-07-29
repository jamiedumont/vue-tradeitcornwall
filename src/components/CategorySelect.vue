<template>
  <div>
    <label>Category</label><br/>
    <select v-model="categories.lvl0">
      <option v-for="option in lvl0options" v-bind:value="option">
        {{ option }}
      </option>
    </select>

    <div v-if="categories.lvl0 !== ''">
    <label>Sub-category</label><br/>
    <select v-model="categories.lvl1">
      <option v-for="option in lvl1options" v-bind:value="option">
        {{ option }}
      </option>
    </select>
    </div>
  </div>
</template>

<script>
  export default {
    // Options / Data
    name: 'CategorySelect',
    data () {
      return {
        lvl0options: [ 'Sports', 'Home', 'Electronics', 'Vehicles', 'Clothing' ]
      }
    },
    props: [ 'categories' ],
    computed: {
      lvl1options: function () {
        const options = {
          'Sports Equipment': [
            'Surfboards',
            'Wetsuits',
            'Outdoor',
            'Gym & Fitness',
            'Other'
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
            'Gaming',
            'Home Entertainment',
            'Photography',
            'Mobiles',
            'Other'
          ],
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
            'Jewellery & Watches',
            'Other'
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
