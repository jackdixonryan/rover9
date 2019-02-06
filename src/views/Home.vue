<template>
  <div v-if="userDetails" id="splash">

    <!-- This is for new users only. -->
    <div v-if="newUser" id="new-user">
      <Header :userDetails="userDetails" />
      <div id="tutorial-information">
        <p>Welcome to Mission Control. From this page, you will be able to view your mission stats, ship conditions, and much more. For now, start by purchasing your first probe.</p>
        <p>Probes come at different prices, so take care which ones you buy. Remember, probes can be modified in the future and you'll want to save some of your money to purchase useful upgrades as you explore.</p>
      </div>
      <Capsules id="capsules-buyer" @userNeedsUpdate="updateUser"/>
    </div>

    <!-- Returning players will be given this instead. -->
    <div v-else id="returning-user">
      <Header :userDetails="userDetails" />
      <user-capsules />
      <Missions :userDetails="userDetails"/>
      <rec-mods />
      <Recs />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

import Capsules from '../components/Capsules';
import Header from '../components/Header';

import UserCapsules from '../components/UserCapsules';
import Missions from '../components/Missions';
import Recs from '../components/Recs';
import RecMods from '../components/RecMods';

export default {
  components: {
    Capsules,
    Header,
    UserCapsules,
    Missions,
    Recs,
    RecMods,
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
    height: 100vh;
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
    height: 93vh;
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

</style>
