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
        cssClasses: {
          root: 'layout layout--100 @med-layout--50 @lrg-layout--33',
          item: 'layout__item pa3'
        },
        templates: {
          item:
            `<article class="br2 dark-gray bg-white w-100 center">
              <img src="{{images.0}}" class="db w-100 br2 br--top" alt="{{title}}">
              <div class="tc pa3 pt0">
                <div class="flex relative top--1">
                  <div class="f6 gold pa2 ph3 bg-black">£{{price}}</div>
                  <div class="f6 black-80 tc pa2 bg-gold w-100">{{location}}</div>
                </div>
                <h2><a class="black-80" href="/buy/{{objectID}}">{{title}}</a></h2>
                <div class="f6 dark-gray">{{description}}</div>
                <a class="ma2 dib" href="/buy/{{objectID}}">
                  <button class="center o-btn o-btn--ghost">More details</button>
                </a>
              </div>
            </article>`
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
