<template>
  <div v-if="userDetails" id="splash">
    <div v-if="newUser" id="new-user">
      <div id="header">
        <h3 v-if="userDetails.username" class="flex-main-info">{{ userDetails.username }}</h3>
        <input v-else type="text" placeholder="Set your Username" id="username-update" class="flex-main-info" @keyup.enter="updateUsername" v-model="username" />
        <h3 class="flex-main-info">$ {{ userDetails.funding }}</h3>
        <h3 class="flex-main-info">0 Active Missions</h3>
      </div>
      <div id="tutorial-information">
        <p>Welcome to Mission Control. From this page, you will be able to view your mission stats, ship conditions, and much more. For now, start by purchasing your first probe.</p>
        <p>Probes come at different prices, so take care which ones you buy. Remember, probes can be modified in the future and you'll want to save some of your money to purchase useful upgrades as you explore.</p>
      </div>
      <Capsules id="capsules-buyer" @userNeedsUpdate="updateUser"/>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Capsules from '../components/Capsules';

export default {
  components: {
    Capsules,
  },
  data() {
    return {
      userDetails: null,
      username: '',
    }
  },  
  computed: {
    user() {
      return this.$store.state.user;
    },
    newUser() {
      if (this.userDetails) {
        if (Object.entries(this.userDetails.inventory).length === 0) {
          return true;
        } else return false;
      } else return null;
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
    updateUsername() { 
      // set local
      this.$set(this.userDetails, 'username', this.username);
      
      // set data.
      firebase.firestore()
        .collection('users')
        .doc(this.user.uid)
        .update({
          username: this.username
        })
        .catch(error => console.log(error));
    },
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
  }

  #new-user {
    font-family: 'Raleway', sans-serif;
    display: grid;
    grid-template-areas: "banner banner"
      "maintext capsules";
    grid-gap: 10px;
    padding: 10px;
  }

  #header {
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    padding: 1em;
    border: 3px #E6E6FA	solid;
    border-top: 10px #E6E6FA solid;
    color: white;
    grid-area: banner;
    display: flex;
  }

  .flex-main-info {
    flex: 1;
    text-align: center;
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
