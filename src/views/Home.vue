<template>
  <div v-if="userDetails" id="splash">

    <!-- This is for new users only. -->
    <div v-if="newUser" id="new-user">
      <Header :userDetails="userDetails" />
      <div id="tutorial-information">
        <p>Welcome to Mission Control. From this page, you will be able to view your mission stats, ship conditions, and much more. For now, start by purchasing your first probe.</p>
        <p>Probes come at different prices, so take care which ones you buy. Remember, probes can be modified in the future and you'll want to save some of your money to purchase useful upgrades as you explore.</p>
        <p class="subtitle">Important info</p>
        <h3 class="header-3">Before you buy:</h3>
        <ul>
          <li>
            <h4 class="header-4">
              Discovery Probability
            </h4>
            <p>Discovery probability is calculated one time on either mission success or mission failure, so the rate is considered static.</p>
          </li>
          <li>
            <h4 class="header-4">
              Success Probability
            </h4>
            <p style="line-height: 1.5;">
              Success probability works differently. It is the capsule's likelihood of surviving <strong>one month</strong> of the total mission. This means that shuttles have a much lower chance of surviving long missions than they do of short ones. We recommend you try the <strong id="inset-button">%</strong> buttons to open the calculator and view each capsules aptitude for different missions lengths.
            </p>
          </li>
        </ul>
      </div>
      <Capsules id="capsules-buyer" @userNeedsUpdate="updateUser"/>
    </div>

    <!-- Returning players will be given this instead. -->
    <div v-else id="returning-user">
      <the-header :userDetails="userDetails" />
      <home-capsules />
      <home-active-missions :userDetails="userDetails"/>
      <home-recommended-modules />
      <home-recommended-missions />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

import Capsules from '../components/Capsules';
import TheHeader from '../components/TheHeader';

import HomeCapsules from '../components/HomeCapsules';
import HomeActiveMissions from '../components/HomeActiveMissions';
import HomeRecommendedMissions from '../components/HomeRecommendedMissions';
import HomeRecommendedModules from '../components/HomeRecommendedModules';

export default {
  components: {
    Capsules,
    TheHeader,
    HomeCapsules,
    HomeActiveMissions,
    HomeRecommendedMissions,
    HomeRecommendedModules,
  },
  data() {
    return {
      userDetails: null,
    }
  },  
  computed: {
    user() {
      return this.$store.state.user;
    },
    // using the purchase of a probe to determine whether someone is new to the game. 
    newUser() {
      if (this.userDetails) {
        if (this.userDetails.capsules.length === 0) {
          return true;
        } else return false;
      }
    }
  },
  watch: {
    user(val) {
      console.log(val.uid);
      firebase.firestore()
        .collection('users')
        .doc(val.uid)
        .get()
        .then(userDetails => {
          this.userDetails = userDetails.data();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    // only fires when the user buys a probe from the store because their balance has to reflect the update.
    updateUser() {
      firebase.firestore()
        .collection('users')
        .doc(this.user.uid)
        .get()
        .then(newDetails => {
          this.userDetails = newDetails.data();
        })
        .catch(error => {console.log(error)});
    }
  }
}
</script>

<style scoped>

  #splash {
    background-color: black;
    font-family: 'Raleway', sans-serif; 
    height: 100%;
  }

  #new-user {
    display: grid;
    grid-template-areas: "banner banner"
      "maintext capsules";
    grid-gap: 10px;
    padding: 10px;
  }

  #returning-user {
    display: grid;
    grid-template-areas: 
    "banner banner"
    "capsules actives" 
    "mods missions";
    grid-gap: 10px;
    padding: 10px;
    height: 100%;
  }

  #tutorial-information {
    grid-area: maintext;
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    padding: 1em;
    border: 3px #E6E6FA solid;
    border-top: 10px #E6E6FA solid;
    color: white;
  }

  #capsules-buyer {
    grid-area: capsules;
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    padding: 1em;
    border: 3px #E6E6FA	solid;
    border-top: 10px #E6E6FA solid;
    color: white;
  }

  strong {
    color: red;
  }

  #inset-button {
    color: white;
    border: 1px lightskyblue solid; 
    padding: .2em;
    margin: .1em;
  }

</style>
