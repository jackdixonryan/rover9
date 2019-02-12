// Items Shop
<template>
  <div id="shop">
    <div id="main-navigation">
      <button class="main-button" id="ships">
        Ships
      </button>
      <button class="main-button" id="success">
        Success Mods
      </button>
      <button class="main-button" id="discovery">
        Discovery Mods
      </button>
    </div>
    <div>
      <div class="sub-menu animated fadeIn" v-show="ships">
        <button class="sub-button" @click="finalSelection=0">
          Probes
        </button>
        <button class="sub-button" @click="finalSelection=1">
          Capsules
        </button>
        <button class="sub-button" @click="finalSelection=2">
          Landers & Advanced Landers
        </button>
        <button class="sub-button" @click="finalSelection=3">
          Explorers
        </button>
        <button class="sub-button" @click="finalSelection=4">
          Pioneers
        </button>
        <button class="sub-button" @click="finalSelection=5">
          Sojourners
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      probes: [],
      modifications: [],
      ships: false,
      success: false,
      discovery: false,
      finalSelection: null,
    }
  },
  methods: {
    detectHover() {
      // selecting all menu buttons
      const menuButtons = document.getElementsByClassName('main-button');

      // iterating through them...
      for (let i = 0; i < menuButtons.length; i++) {
        // to add a mouseover event listener to deploy the drop menu.
        menuButtons[i].addEventListener('mouseover', (e) => {
          // setting the boolean for the dropdown equal to true.
          this[menuButtons[i].id] = true;

          // now that this is done, we grab the submenu that got mounted.
          setTimeout(() => {
            const dropdownMenu = document.getElementsByClassName('sub-menu')[0];

            console.log(dropdownMenu);

            // add an event listener to that dropdown menu. 
            dropdownMenu.addEventListener('mouseleave', (e) => {
              // that sets the bool to false when the cursor leaves the elem.
              this[menuButtons[i].id] = false;
            });
          }, 200);
        });
      }
    }
  },
  beforeMount() {
    firebase.firestore()
      .collection('probes')
      .get()
      .then(probes => {
        probes.forEach(probe => {
          this.probes.push(probe.data());
        });
      });
  },
  mounted() {
    this.detectHover();
  }
}
</script>

<style lang="scss" scoped>
  $easeOutBack: cubic-bezier(0.175, 0.885, 0.320, 1.275);
  $aqua: #00d7d4;
  $green: #00c341;

  #shop {
    padding: 1em;
    font-family: 'Rajdhani', sans-serif;
    height: 100vh;
  }

  #main-navigation {
    display: flex;
    border: 2px $aqua solid;
    color: white;
    padding: .5em;
    font-size: 1.5em;
    .main-button {
      flex: 1;
    }
  }

  .sub-menu {
    color: white;
    background-color: #05050b;
    border: 2px $aqua solid;
    border-top: 0px;
    width: 33%;
  }

  .sub-button {
    outline: none;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 1em;
    text-align: center;
    padding: 1em;
    font-size: 1.3em;
    display: block;
    position: relative;
    &:before, &:after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 0; right: 0;
      height: 2px;
      background-color: $aqua;
    }
    &:before {
      opacity: 0;
      transform: translateY(-8px);
      transition: transform 0s $easeOutBack, opacity 0s;
    }
    &:after {
      opacity: 0;
      transform: translateY(4px);
      transition: transform .2s $easeOutBack, opacity .2s;
    }
    &:hover, &:focus {
      &:before,
      &:after {
        opacity: 1;
        transform: translateY(0);
      }
      &:before {
        transition: transform .2s $easeOutBack, opacity .2s;
      }
      &:after {
        transition: transform 0s .2s $easeOutBack, opacity 0s .2s;
      }
    }
  }

</style>
