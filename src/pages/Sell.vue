<template>
  <header-bar></header-bar>
  <div id="sell">
    <!-- This progress indicator will become a component  -->
    <!-- <h4 style="text-align: center;">Progress indicator here: {{ stage }}</h4> -->

    <!-- Each of the two layout items will be a component, both rendered (conditionally by this view) -->
    <div class="layout">
      <div class="layout__item med-force--40">
        <h3>Enter your listing below</h3>
        <label>Title</label><br/>
        <input v-model="listing.title"><br/>

        <label>Price</label><br/>
        <input class="price-input" v-model="listing.price"><br/>

        <label>Description</label><br/>
        <textarea style="height: 150px" v-model="listing.description"></textarea>

        <label>Type</label><br/>
        <input type="radio" id="item "value="item" v-model="listing.type">
        <label for="item">Item</label>
        <br>
        <input type="radio" id="vehicle" value="vehicle" v-model="listing.type">
        <label for="vehicle">Vehicle</label>
        <br>
        <span v-if="listing.type === 'item'">This listing will cost £2</span>
        <span v-if="listing.type === 'vehicle'">This listing will cost £5</span>

        <category-select :categories.sync="listing.categories"></category-select>

        <input type="file" name="img" multiple>
      </div>

      <!-- <div class="layout__item">
        <h2>Advert Preview</h2>
        <h2>{{ listing.title }}</h2>
        <p>{{ listing.description }}</p>
        <p>£ {{ listing.price }}</p>
      </div> -->
    </div>

  </div>
</template>

<script>
  import HeaderBar from 'src/components/HeaderBar'
  import CategorySelect from 'src/components/CategorySelect'

  export default {
    name: 'Sell',
    data: function () {
      return {
        listing: {
          title: '',
          description: '',
          price: '',
          categories: {
            lvl0: '',
            lvl1: ''
          }
        },
        stage: 1
      }
    },
    components: {
      HeaderBar,
      CategorySelect
    }
  }
</script>

<style lang="scss">
@import "../scss/1_settings/settings.colours.scss";

#sell {
  background-color: $off-white;
  padding: 30px;
  max-width: 400px;
  min-height: 900px;
  margin: 0 auto;
  text-align: center;
}

.login-icon {
  width: 50px;
  cursor: pointer;
}

.price-input {
  background-image: url(../assets/pound.svg);
  background-repeat: no-repeat;
  background-position: 3px;
  background-size: 20px 15px;
  background-color: white;
}

.login-buttons {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  h3 {
    margin: 0 30px;
  }
}

</style>
