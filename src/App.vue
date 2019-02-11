<template>
  <div id="page-main">
    <router-view /> 
    <!-- <Footer /> -->
  </div>
</template>

<script>
import firebase from 'firebase';
import Footer from './components/Footer'

export default {
  components: { Footer, },
  name: 'App',
  data () {
    return {
      userID: null,
    }
  },
  mounted() {
    // using the auth state change to register the user. This is more elegant than what happened last time. And it should work for every auth state. 
    firebase.auth()
      .onAuthStateChanged(userDetected => {
        this.$store.commit('setUser', userDetected);
      });
  }
}
</script>

<style>
  /* These are for the modals. DO NOT TOUCH ANYTHING IN THIS FILE TREE THAT HAS Z-INDEX ATTACHED tO IT IN ANY WAY FOR HERE THERE BE MONSTERS. */

  .progress, .progress-circle {
    position: relative;
    z-index: 0;
  }

  .error-modal {
    position: relative;
    z-index: 10;
  }

  .shade-box {
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    padding: 1em;
    /* border: 3px #E6E6FA solid;
    border-top: 10px #E6E6FA solid; */
    color: white;
    font-family: 'Raleway', sans-serif;
    letter-spacing: 1px;
  }

  .outer-box {
    background-color: #000428;
    padding: 1em;
    border: 1px lavender solid;
    border-top: 5px lavender solid;
  }

  .header-3 {
    padding: 1em 0 1em 0;
    border-bottom: 1px lightskyblue solid;
  }

  .header-4 {
    padding: 1em 0 .5em 0;
  }

  .subtitle {
    margin: 0;
    color: lightskyblue;
  }

  .btn {
    padding: .75em;
    margin: 1em 0 0 0;;
    border: 1px lightskyblue solid;
  }

  #page-main {
    background-color: black;
    width: 100%;
  }
</style>

