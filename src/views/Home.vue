<template>
  <div v-if="userDetails">
    <div v-if="newUser">
      <h1>Welcome, new user!</h1>
      <p>The first step of any successful space mission is to purchase a vessel. Click the Menu button at the top of the page to browse the selection of ships. </p>
    </div>
    <Capsules />
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
  }
}
</script>

<style>

</style>
