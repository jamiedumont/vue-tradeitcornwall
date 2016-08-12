<template>
  <header-bar></header-bar>
  <div id="sell">

    <div class="layout">
      <div class="layout__item med-force--40">
        <h3>Enter your listing below</h3>
        <label>Title</label><br/>
        <input :value="message" @input="updateTitle | debounce"><br/>

        <label>Price</label><br/>
        <input class="price-input" :value="price" @input="updatePrice | debounce"><br/>

        <label>Description</label><br/>
        <textarea style="height: 150px" :value="description" @input="updateDescription | debounce 500"></textarea>

        <category-select :categories.sync="categories"></category-select>



        <file-upload v-if="uploadVisible"
          :multiple="true"
          :auto-submit="true"

        ></file-upload>

         <!-- Image preview and sort control -->
        <div v-if="images.length > 0" class="layout layout--50">
          <div v-for="image in previewImages" class="layout__item box">
            <div class="content" :style="{ 'background-image': 'url(' + image + ')' }">
              <!-- <img :src="image" alt=""> -->
            </div>

          </div>
        </div>

        <button label="Change Images" v-if="!uploadVisible" @click="toggleUploader"></button>

        <label>Location</label><br/>
        <input type="text" v-model="tempLocation">
        <button @click="findLocation" label="Find location">

        <p v-if="type === 'item'">This listing will cost £2</p>
        <p v-if="type === 'vehicle'">This listing will cost £5</p>

        <button @click="addListing" label="Add to checkout"></button>

      </div>

    </div>

  </div>
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
        type: 'item',
        tempLocation: '',
        location: '',
        _geoloc: {
          lat: '',
          lng: ''
        },
        categories: {
          lvl0: '',
          lvl1: ''
        },
        addImages: true
      }
    },
    methods: {
      findLocation () {
        if (this.tempLocation === '') {
          return
        }
        this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.tempLocation}`).then(function (location) {
          const locationjson = JSON.parse(location.body)
          console.log(locationjson.results[0])
          const pos = locationjson.results[0].geometry.location
          const locale = locationjson.results[0].formatted_address
          this.updateGeo(pos)
          this.updateLocation(locale)
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
      },
      '_geoloc': function (val, old) {
        this.updateGeo(val)
        console.log('Test')
      },
      'location': function (val, old) {
        this.updateLocation(val)
      }
    },
    vuex: {
      getters: {
        title: state => state.newListing.title,
        description: state => state.newListing.description,
        price: state => state.newListing.price,
        type: state => state.newListing.type,
        images: state => state.newListing.imageRefs,
        uploadVisible: state => state.newListing.uploadVisible
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
