<template>
  <header-bar></header-bar>
  <div id="buy">

    <!-- <div class="algolia-filters">
      <div class="content">
        <h2>Query: {{query here}}</h2>
      </div>



    </div> -->

    <div class="algolia-container">
      <div id="search-input"></div>

      <div id="hits-container"></div>

      <div id="pagination-container"></div>
    </div>



    <!-- <div class="search-box">
      <input placeholder="Search Cornwall...">
      <span class="input-icon">
        <img class="input-icon-actual" src="../assets/search.svg" alt="Search">
      </span>
    </div>
    <p class="search-box__meta"><strong>280</strong> results found within <strong> 8km</strong></p> -->


    <div class="filter-btn">
      <span>Filters</span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import "../scss/1_settings/settings.colours.scss";

  .algolia-filters {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    top: 0;
    bottom: 0;
    z-index: 10;
    .content {
      z-index: 11;
      display: block;
      position: relative;
    }
  }
  #buy {
    padding-bottom: 60px;
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

  .algolia-container {
    width: 90vw;
    margin: 1em auto;
  }

</style>

<script>
import HeaderBar from 'src/components/HeaderBar'
import instantsearch from 'instantsearch.js'

export default {
  name: 'Buy',
  components: {
    HeaderBar
  },
  ready: function () {
    // `this` points to the vm instance
    const search = instantsearch({
      appId: '6VAJ69ISJV',
      apiKey: 'c6540d28ecc025d481367f17ae5cdb89',
      indexName: 'cornwall',
      urlSync: true
    })

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-input',
        placeholder: 'Search Cornwall...',
        poweredBy: true
      })
    )

    search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits-container',
        templates: {
          item: `<div class="result o-card">
            <div class="o-card__img">
              <img src="{{images.0}}" alt="{{title}}">
            </div>
            <div class="o-card__body">
              <div class="result__meta">
                <div class="meta__price">
                  <span>£{{price}}</span>
                </div>
                <span>Falmouth</span>
              </div>
              <span class="result__header"><a href="/buy/{{objectID}}">{{title}}</a></span>
              <div>{{description}}</div>
            </div>
          </div>`
        }
      })
    )

    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination-container',
        maxPages: 3,
        cssClasses: {
          root: 'is-pagination__root',
          item: 'is-pagination__item',
          link: 'is-pagination__link'
        }
      })
    )

    search.start()
  }
}
</script>
