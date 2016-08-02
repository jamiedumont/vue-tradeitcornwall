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
        <input v-model="title"><br/>

        <label>Price</label><br/>
        <input class="price-input" v-model="price"><br/>

        <label>Description</label><br/>
        <textarea style="height: 150px" v-model="description"></textarea>

        <category-select :categories.sync="categories"></category-select>

        <span v-if="type === 'item'">This listing will cost £2</span>
        <span v-if="type === 'vehicle'">This listing will cost £5</span>



        <span v-if="!addImages" @click="addImages = !addImages">Add More</span>

        <file-upload v-if="addImages"
          :multiple="true"
          :file-list.sync="fileList"
        ></file-upload>

        <!--  Image preview and sort control -->
        <!-- <div class="layout layout--33" v-sortable="{ draggable: '.box'}">
          <div class="layout__item box">
            <div class="content" style="background-image: url('http://www.topgear.com/sites/default/files/styles/16x9_640w/public/cars-road-test/image/2015/02/Large%20Image%20(optional)_96.jpg?itok=cMVM31YC');"></div>
          </div>
          <div class="layout__item box">
            <div class="content" style="background-image: url('http://cdn.pocket-lint.com/r/s/970x/assets/images/phpeufecs.jpg');"></div>
          </div>
          <div class="layout__item box">
            <div class="content" style="background-image: url('https://www.bmw.co.uk/dam/brandBM/marketGB/countryGB/newvehicles/3-series/touring/2015/Introduction/3-series-touring-design-top-stage.jpg.resource.1431610966917.jpg');"></div>
          </div>
          <div class="layout__item box">
            <div class="content" style="background-image: url('http://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/bmw320d.jpg?itok=OyJ3aTVM');"></div>
          </div>
          <div class="layout__item box">
            <div class="content" style="background-image: url('http://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/3series-spies-0759.jpg?itok=2oyaGevO');"></div>
          </div>
        </div> -->
      </div>

      <!-- <div class="layout__item">
        <h2>Advert Preview</h2>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <p>£ {{ price }}</p>
      </div> -->
    </div>

  </div>
</template>

<script>
  import HeaderBar from 'src/components/HeaderBar'
  import FileUpload from 'src/components/FileUpload'
  import CategorySelect from 'src/components/CategorySelect'
  import Sortable from 'vue-sortable'
  import Vue from 'vue'

  Vue.use(Sortable)

  export default {
    name: 'Sell',
    data: function () {
      return {
        fileList: [],
        images: [],
        title: '',
        description: '',
        price: '',
        type: 'item',
        location: {
          locality: '',
          postcode: ''
        },
        _geoloc: {
          lat: '',
          lng: ''
        },
        categories: {
          lvl0: '',
          lvl1: ''
        },
        addImages: true,
        stage: 1
      }
    },
    computed: {
      type () {
        if (this.categories.lvl0 === 'Vehicles') {
          return 'vehicle'
        }
        return 'item'
      }
    },
    components: {
      HeaderBar,
      CategorySelect,
      FileUpload
    }
  }
</script>

<style lang="scss">
@import "../scss/1_settings/settings.colours.scss";

.sortable-chosen {
  width: 110%;
  height: 110%;
  transform: rotate(5deg);
}
.box {
  position: relative;
  transition: all 0.2s;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
.box:before {
  content: "";
  display: block;
  padding-top: 100%;
}
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
