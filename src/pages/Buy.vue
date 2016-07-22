<template>
  <header-bar></header-bar>
  <div id="buy">

    <div class="search-box">
      <input placeholder="Search Cornwall...">
      <span class="input-icon">
        <img class="input-icon-actual" src="../assets/search.svg" alt="Search">
      </span>
    </div>
    <p class="search-box__meta"><strong>280</strong> results found within <strong> 8km</strong></p>

    <div class="result o-card">
      <div class="o-card__img">
        <img src="../assets/bmw.jpg" alt="BMW">
      </div>
      <div class="o-card__body">
        <div class="result__meta">
          <div class="meta__price">
            <span>£4600</span>
          </div>
            <span class="meta__distance">2km away</span>

        </div>
        <span class="result__header">2009 BMW 330 Touring</span>
      </div>
    </div>

      <div class="result o-card">
        <div class="o-card__img">
          <img src="../assets/bmw.jpg" alt="BMW">
        </div>
        <div class="o-card__body">
          <div class="result__meta">
            <div class="meta__price">
              <span>£4600</span>
            </div>
              <span class="meta__distance">2km away</span>

          </div>
          <span class="result__header">2009 BMW 330 Touring</span>
        </div>
      </div>

    <div class="filter-btn">
      <span>Filters</span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../scss/1_settings/settings.colours.scss";
  #buy {
    padding-bottom: 80px;
  }
  .result {
    background-color: white;
    width: 90vw;
    margin: 1em auto;
    text-align: center;
  }
  .result__header {
    font-size: 16px;
    font-weight: 700;
    display: block;
    margin: 0px auto;
    padding-bottom: 20px;
    width: 80%;
  }
  .result__meta {
    background-color: $primary-colour;
    color: white;
    position: relative;
    top: -20px;
    display: inline;
    text-align: center;
    padding: 8px 10px 8px 0px;
    margin: 0 auto;
    letter-spacing: 0.4px;
  }
  // .meta__price, .meta__distance {
  //   display: inline-block;
  // }
  .meta__price {
    background-color: $black;
    color: $primary-colour;
    min-height: 100%;
    display: inline-block;
    padding: 10px;
    margin-right: 10px;
    span {
      font-weight: 700;
    }
  }
  .search-box__meta {
    font-size: 12px;
    text-align: center;
    color: $light-grey;
    strong {
      color: $black;
    }
  }
  .search-box {
    width: 90vw;;
    margin: 20px auto 10px;
    display: flex;
    flex-direction: row;
    background-color: white;
    input {
      margin: 0;
      border: none;
      flex: 1;
      padding-left: 16px;
    }
    input:focus {
      margin: 0;
      border-bottom: 3px solid $primary-colour;
    }
    input:focus + .input-icon {
      border-bottom: 3px solid $primary-colour;
    }
    .input-icon {
      padding: 16px;
      align-self: center;
    }
  }

  .filter-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: $black;
    text-align: center;
    cursor: pointer;
    padding: 16px;
    span {
      font-size: 16px;
      color: white;
    }
  }

</style>

<script>
import HeaderBar from 'src/components/HeaderBar'
export default {
  name: 'Buy',
  components: {
    HeaderBar
  }
}
</script>
