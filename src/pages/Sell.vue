<template>
  <header-bar></header-bar>
  <div id="sell" class="mw8 center tc">

    <div class="layout layout--100 pb5">
      <div class="layout__item med-force--50 lrg-force--33 pa3">

        <h2 class="f6 bg-dark-gray pa2 white ttu mb3">Listing Details</h2>

        <label>Title</label><br/>
        <input placeholder="Your title...":value="message" @input="updateTitle | debounce"><br/>

        <category-select :categories.sync="categories"></category-select>

        <label>Price</label><br/>
        <input placeholder="300" class="price-input" :value="price" @input="updatePrice | debounce"><br/>

        <label>Description</label><br/>
        <textarea placeholder="A few words to descripe what it is that you're selling..." style="height: 150px" :value="description" @input="updateDescription | debounce 500"></textarea>

        <label>Location<span v-if="location"> saved as: <strong>{{location}}</strong></span></label><br/>
        <input placeholder="Postcode, City or Town..." type="text" v-model="tempLocation">
        <button class="o-btn o-btn--ghost pa2 mt1 mb3"@click="findLocation" label="Find location"></button>

        <div class="images">

          <file-upload v-if="uploadVisible"
          :multiple="true"
          :auto-submit="true"
          ></file-upload>

          <button
          v-if="!uploadVisible"
          class="o-btn o-btn--ghost mb3"
          label="Change Images"
          @click="toggleUploader">
          </button>

        <!-- Image preview -->
        <div class="dn-ns">
          <div v-if="images.length > 0 && !uploadVisible" class="layout layout--50">
            <div v-for="image in previewImages" class="layout__item box">
              <div class="content" :style="{ 'background-image': 'url(' + image + ')' }">
              </div>
            </div>
          </div>
        </div>

      </div> <!-- End .images -->

    </div> <!-- END .layout__item -->

    <div class="dn db-ns layout__item med-force--50 lrg-force--66 pa3">
      <div class="bg-white h-100">
        <h2 class="f6 bg-dark-gray pa2 white ttu">Advert preview</h2>

        <div class="mb3">
          <div class="mw7 center">
            <div v-for="image in previewImages">
              <img :src="image" alt="" style="max-height: 32rem"/>
            </div>

          </div>
        </div>
        <div class="layout">
          <div class="layout__item">
            <h3 class="f4 ma1">{{title}}</h3>
            <p class="f6 i silver ma1 mb3">{{categories.lvl0}} - {{categories.lvl1}}</p>
            <div class="flex w-75 mw5 center">
              <div class="f6 gold pa2 ph3 bg-black">£{{price}}</div>
              <div class="f6 black-80 tc pa2 bg-gold w-100">{{location}}</div>
            </div>
            <div class="w-80 f6 dark-gray mw6 center ma3">{{description}}</div>
          </div>
        </div>

        <div class="pa3 fixed bg-dark-gray bottom-0 left-0 right-0 center static-ns w4-ns">
          <span class="white b">ENQUIRE</span>
        </div>
      </div>


    </div>
  </div> <!-- END .layout -->

  <div @click="submitItem" class="b pa3 white add-listing">
    <span>Add to checkout</span>
    <span class="f6 silver normal" v-if="type === 'item'">- £2.00</span>
    <span class="f6 silver normal" v-if="type === 'vehicle'">- £5.00</span>
  </div>

</div> <!-- END #sell -->

</template>

<script>
  import HeaderBar from 'src/components/HeaderBar'
  import FileUpload from 'src/components/FileUpload'
  import CategorySelect from 'src/components/CategorySelect'
  import Button from 'src/components/Button'
  import { _ } from 'underscore'
  import { addListing } from 'src/vuex/modules/new-listings/actions'

  export default {
    name: 'Sell',
    data: function () {
      return {
        tempLocation: '',
        categories: {
          lvl0: '',
          lvl1: ''
        },
        addImages: true
      }
    },
    methods: {
      submitItem () {
        if (this.title === '') {
          return window.alert('Please enter a title')
        }
        if (this.description === '') {
          return window.alert('Please enter a description')
        }
        if (this.price === '') {
          return window.alert('Please enter a price')
        }
        if (this.categories.lvl0 === '') {
          return window.alert('Please select a category')
        }
        if (this.categories.lvl1 === '') {
          return window.alert('Please select a sub-category')
        }
        if (this.location === '') {
          return window.alert('Please enter a location')
        }
        if (this.previewImages.length === 0) {
          return window.alert('Please add some images')
        }
        return this.addListing()
      },
      findLocation () {
        if (this.tempLocation === '') {
          return
        }
        this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.tempLocation}`).then(function (location) {
          const locationjson = JSON.parse(location.body)

          // Get the lat/lng
          const pos = locationjson.results[0].geometry.location

          // Get the address components
          const address = locationjson.results[0].address_components

          // Get a human readable, concise location from address
          const locality = _.find(address, function (comp) {
            const correctItem = _.find(comp.types, function (type) {
              return type === 'locality'
            })
            return correctItem !== undefined
          })

          this.updateGeo(pos)
          this.updateLocation(locality.long_name)
          this.tempLocation = ''
        }, function (err) {
          console.log(err)
        })
      }
    },
    watch: {
      'categories.lvl0': function (val, old) {
        this.updateCategory('lvl0', val)
      },
      'categories.lvl1': function (val, old) {
        this.updateCategory('lvl1', val)
      }
    },
    vuex: {
      getters: {
        title: state => state.newListing.title,
        description: state => state.newListing.description,
        price: state => state.newListing.price,
        // type: state => state.newListing.type,
        images: state => state.newListing.imageRefs,
        uploadVisible: state => state.newListing.uploadVisible,
        location: state => state.newListing.location
      },
      actions: {
        updateTitle: ({dispatch}, e) => {
          dispatch('UPDATE_NL_TITLE', e.target.value)
        },
        updatePrice: ({dispatch}, e) => {
          dispatch('UPDATE_NL_PRICE', e.target.value)
        },
        updateDescription: ({dispatch}, e) => {
          dispatch('UPDATE_NL_DESCRIPTION', e.target.value)
        },
        toggleUploader: ({dispatch}) => {
          dispatch('TOGGLE_UPLOADER')
        },
        updateCategory: ({dispatch}, level, value) => {
          dispatch('UPDATE_CATEGORY', level, value)
        },
        updateGeo: ({dispatch}, value) => {
          dispatch('UPDATE_GEO', value)
        },
        updateLocation: ({dispatch}, value) => {
          dispatch('UPDATE_LOCATION', value)
        },
        addListing
      }
    },
    computed: {
      type () {
        if (this.categories.lvl0 === 'Vehicles') {
          return 'vehicle'
        }
        return 'item'
      },
      previewImages () {
        const images = []
        _.each(this.images, function (image) {
          images.push(window.URL.createObjectURL(image))
        })
        return images
      }
    },
    components: {
      HeaderBar,
      CategorySelect,
      FileUpload,
      Button
    }
  }
</script>

<style lang="scss">
@import "../scss/1_settings/settings.colours.scss";
@import "../scss/1_settings/settings.globals.scss";

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
    background-position: center center;
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

.add-listing {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $base-spacing-unit;
  background-color: $black;
}

</style>
