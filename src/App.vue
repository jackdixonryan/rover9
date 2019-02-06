<template>
  <div>
    <router-view /> 
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
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
</style>

