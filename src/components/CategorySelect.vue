<style lang="scss">
  @import "../scss/1_settings/settings.colours.scss";

  .getmdl-select {
    input {
      border: none;
      margin: none;
    }
    input:focus {
      border: none;
      margin: none;
    }
  }

  .is-dirty .mdl-textfield__label {
    color: $light-grey !important;
  }

  .is-focused {
    .mdl-textfield__label {
      color: $primary-colour !important;
    }
    .mdl-textfield__label::after {
      background-color: $primary-colour !important;
    }
    .mdl-icon-toggle__label {
      color: $primary-colour !important;
    }
  }


</style>

<template>
  <div>
    <!-- <label>Category</label><br/> -->

    <mdl-select label="Category" id="category" :value.sync="categories.lvl0" :options="lvl0options"></mdl-select>

    <div v-if="categories.lvl0 !== ''">
      <mdl-select label="Sub-category" id="sub-category" :value.sync="categories.lvl1" :options="lvl1options"></mdl-select>
    </div>

      <!-- <select v-model="categories.lvl0">
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
    </div> -->
  </div>
</template>

<script>
  // import { MdlSelect } from 'vue-mdl'
  export default {
    // Options / Data
    name: 'CategorySelect',
    data () {
      return {
        lvl0options: [ 'Sports Equipment', 'Home', 'Electronics', 'Vehicles', 'Clothing' ]
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
    },
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
    components: {
      // MdlSelect
    }
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    // events: {},
    // mixins: [],
    // name: ''
  }
</script>
