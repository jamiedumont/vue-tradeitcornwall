<template>
    <div v-show="show" transition="modal" class="login-screen">

      <div @click="close" class="cross">
        <img src="../assets/cross.svg" alt="Close">
      </div>

      <div class="logo">
        <img src="../assets/tic-logo--white.svg" alt="Trade It Cornwall">
      </div>

      <div class="avatar">
        <img src="../assets/avatar.png" alt="Jamie">
        <h4>Jamie</h4>
      </div>

      <div class="search-box">
        <input placeholder="Search Cornwall...">
        <span class="input-icon">
          <img class="input-icon-actual" src="../assets/search.svg" alt="Search">
        </span>
      </div>

      <div class="menu">

        <div class="o-media o-media--centre menu__item">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/sell-icon.svg" alt="Sell">
          </div>
          <div class="o-media__body">
            <span class="menu__text">Sell</span>
          </div>
        </div>

        <div class="o-media o-media--centre menu__item">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/message-icon.svg" alt="Messages">
          </div>
          <div class="o-media__body">
            <span class="menu__text">Messages</span>
          </div>
        </div>

        <div class="o-media o-media--centre menu__item menu__item--last">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/account-icon.svg" alt="Account">
          </div>
          <div class="o-media__body">
            <span class="menu__text">Account</span>
          </div>
        </div>

        <div class="o-media o-media--centre menu__item menu__item--detached">
          <div class="menu__icon-container o-media__img">
            <img class="menu__icon" src="../assets/account-icon.svg" alt="Account">
          </div>
          <div class="o-media__body">
            <span class="menu__text">Logout</span>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
  export default {
    // Options / Data
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      }
    },
    computed: {},
    methods: {
      close: function () {
        this.show = false
      }
    },
    // watch: {},
    // Options / DOM
    // el () {},
    // replace: true,
    // template: '',
    // Options / Lifecycle Hooks
    // init () {},
    // crated () {},
    // beforeCompile () {},
    // compiled () {},
    ready: function () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close()
        }
      })
    }
    // attached () {},
    // detached () {},
    // beforeDestroy () {},
    // destroyed () {},
    // Options / Assets
    // directives: {},
    // elementDirectives: {},
    // filters: {},
    // components: {},
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    // events: {},
    // mixins: [],
    // name: ''
  }
</script>

<style lang='scss' scoped>
@import "../scss/1_settings/settings.colours.scss";

  .login-screen {
    position: fixed;
    top: 0;
    width: 100vw;
    background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(../assets/cornwall_2.jpg);
    background-position: center;
    height: 100vh;
    background-repeat: none;
    background-size: cover;
  }
  .cross {
    width: 18px;
    position: absolute;
    top: 12px;
    right: 12px;
    img {
      width: 100%;
    }
  }
  .logo {
    max-width: 30vw;
    margin: 0 auto;
    padding-top: 5vh;
    img {
      width: 100%;
    }
  }
  .search-box {
    width: 60vw;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    background-color: $off-white;
    border-radius: 100px;
    input {
      margin: 0;
      border: none;
      border-radius: 100px;
      height: 32px;
      font-size: 12px;
      flex: 1;
    }
    input:focus {
      margin: 0;
      border: none;
    }
    .input-icon {
      padding-right: 10px;
      align-self: center;
    }
  }
  .avatar {
    max-width: 30vw;
    margin: 0 auto;
    padding-top: 2vh;
    img {
      width: 100%;
    }
    h4 {
      color: $off-white;
      margin: 10px auto;
    }
  }
  .menu {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }

  .menu__icon-container {
    width: 18px;
    img {
      margin: 0 auto;
    }
  }
  .menu__item {
    margin-left: 10vw;
    padding: 10px 0;
    border-top: 1px solid rgba(255,255,255,0.3);
    margin-bottom: 0;
    cursor: pointer;
  }

  .menu__item--last {
    border-bottom: 1px solid rgba(255,255,255,0.3);
  }

  .menu__item--detached {
    margin-top: 2em;
    border: none;
  }

    .menu__text {
      text-transform: uppercase;
      color: $off-white;
      font-size: 18px;
      font-weight: 700;
    }

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
