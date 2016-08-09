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
        <input :value="message" @input="updateTitle | debounce"><br/>

        <label>Price</label><br/>
        <input class="price-input" :value="price" @input="updatePrice | debounce"><br/>

        <label>Description</label><br/>
        <textarea style="height: 150px" :value="description" @input="updateDescription | debounce 500"></textarea>

        <category-select on-change="consoleCall" :categories.sync="categories"></category-select>



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
  import { addListing } from 'src/vuex/actions'

  export default {
    name: 'Sell',
    data: function () {
      return {
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
        addImages: true
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
        // const imagesToProcess = _.pluck(this.images, 'length')
        // console.log(imagesToProcess)
        _.each(this.images, function (image) {
          // const reader = new window.FileReader()
          // reader.onload = function (e) {
          //   // get loaded data and render thumbnail.
          //   const test = e.target.result
          //
          //   console.log(test)
          // }
          // const output = reader.readAsDataURL(image)
          // images.push(output)
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
