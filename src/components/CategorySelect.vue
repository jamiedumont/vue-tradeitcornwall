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

  .mdl-textfield {
    width: 100%;
  }


</style>

<template>
  <div>

    <mdl-select label="Category" id="category" :value.sync="categories.lvl0" :options="lvl0options"></mdl-select>

    <div v-if="categories.lvl0 !== ''">
      <mdl-select label="Sub-category" id="sub-category" :value.sync="categories.lvl1" :options="lvl1options"></mdl-select>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'CategorySelect',
    data () {
      return {
        lvl0options: [ 'Sports Equipment', 'Home', 'Electronics', 'Vehicles', 'Clothing' ]
      }
    },
    props: [ 'categories', 'onChange' ],
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
  }
</script>
