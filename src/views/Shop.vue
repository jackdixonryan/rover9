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
        <button class="sub-button" @click="finalSelection=4">
          Explorers
        </button>
        <button class="sub-button" @click="finalSelection=5">
          Pioneers
        </button>
        <button class="sub-button" @click="finalSelection=6">
          Sojourners
        </button>
      </div>
    </div>

    <div id="display-ships" v-if="displayShips">
      <div class="display-ship-result" v-for="ship in displayShips" :key="ship.price">
        <div class="dont-even-sweat-it-bruh">
          <h3 class="display-ship-name">{{ ship.name }}</h3>
          <div class="display-ship-flexbox">
            <div class="progress-container">
              <progress-circle 
                trailColor="#00d7d4"
                color="#ffffff"
                width="1em"
                height="1em"
                :name="ship.name.split(' ').join('')"
                :progress="ship.successProbability"
                class="display-ship-success-probability"
              />
            </div>
            <p class="display-ship-description">{{ ship.description }}</p>
            <div class="progress-container">
              <progress-circle 
                trailColor="#00d7d4"
                color="#ffffff"
                width="1em"
                height="1em"
                :name="`${ship.name.split(' ').join('')}-discovery`"
                :progress="ship.discoveryProbability"
                class="display-ship-success-probability"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';

import ProgressCircle from '../components/ProgressCircle.vue';

export default {
  components: { ProgressCircle },
  data() {
    return {
      allShips: [],
      modifications: [],
      ships: false,
      success: false,
      discovery: false,
      finalSelection: null,
      displayShips: null
    }
  },
  watch: {
    // watches the all ships value to generate data on page bootup.
    allShips(val) {
      this.displayShips = this.allShips.filter(ship => ship.type === 1);
    },
    finalSelection(val) {
      this.displayShips = this.allShips.filter(ship => ship.type === val);
      if (val === 2) {
        this.allShips.map(ship => {
          if (ship.type === 3) {
            this.displayShips.push(ship);
          }
        })
      }
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
      .orderBy('successProbability')
      .get()
      .then(probes => {
        probes.forEach(probe => {
          this.allShips.push(probe.data());
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
    height: 100%;
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
    position: fixed;
    z-index: 20;
  }

  // dropbown menu button along with the styling for that little underline effect.
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

  #display-ships {
    margin-bottom: 4em;
  }

  /* governs list styles */
  .display-ship-result {
    width: 100%;
    margin-top: 4em;
    /* position: relative;
    &:before,
    &:after,
    & > :first-child:before,
    & > :first-child:after {
      position: absolue;
      content: ' ';
      border-color: $aqua;
      border-style: solid;
      height: 80px;
      width: 80px;
    }
    &:before {
      top: 0;
      left: 0;
      border-width: 3px 0 0 3px;
    }
    &:after {
      top: 0; 
      right: 0;
      border-width: 3px 3px 0 0;
    }
    & > :first-child:before {
      bottom: 0;
      right: 0;
      border-width: 0 3px 3px 0;
    } 
    & > :first-child:after {
      bottom: 0;
      left: 0;
      border-width: 0 0 3px 3px;
    } */
  }

  .display-ship-flexbox {
    display: flex;
  }

  .display-ship-name {
    color: white;
    font-size: 3em;
    text-align: center;
  }

  .display-ship-description {
    color: white;
    font-size: 1.5em;
    flex: 1;
    text-align: center;
  }

  .progress-container {
    flex: 1;
  }

  .display-ship-success-probability {
    height: 10em;
    width: 10em;
    margin: 0 auto;
  }

</style>
