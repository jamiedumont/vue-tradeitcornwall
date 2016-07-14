<template>
  <div id="sell">
    <!-- This progress indicator will become a component  -->
    <h4 style="text-align: center;">Progress indicator here: {{ stage }}</h4>

    <!-- Each of the two layout items will be a component, both rendered (conditionally by this view) -->
    <div class="layout">
      <div style="padding-right: 40px" class="layout__item med-force--40">
        <h3>Enter your listing below</h3>
        <label>Title</label><br/>
        <input v-model="listing.title"><br/>

        <label>Price</label><br/>
        <input class="price-input" v-model="listing.price"><br/>

        <label>Description</label><br/>
        <textarea style="height: 150px" v-model="listing.description"></textarea>
      </div>

      <div class="layout__item">
        <h2>Advert Preview</h2>
        <h2>{{ listing.title }}</h2>
        <p>{{ listing.description }}</p>
        <p>£ {{ listing.price }}</p>
      </div>
    </div>

    <!-- The bottom bar will be a component -->
    <button class="o-btn">Back</button>
    <button class="o-btn">Next</button>

  </div>
</template>

<script>
export default {
  name: 'Sell',
  data: function () {
    return {
      listing: {
        title: '',
        description: '',
        price: ''
      },
      stage: 1
    }
  }
}
</script>

<style lang="scss">
@import "../scss/1_settings/settings.colours.scss";

.price-input {
  background: url(../assets/pound.svg);
  background-repeat: no-repeat;
  background-position: 3px;
  background-size: 20px 15px;
}

</style>
