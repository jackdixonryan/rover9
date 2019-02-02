<template>
  <div>
    <Shop />
  </div>
</template>

<script>
import firebase from "firebase";
import Shop from '../components/Shop';

export default {
  components: {
    Shop,
  },
  data() {
    return {
      userDetails: null,
    }
  },  
  computed: {
    user() {
      return this.$store.state.user;
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
