<template>
  <div>
    <h1>{{ }}</h1>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    user(val) {
      firebase.firestore()
        .collection('users')
        .doc(this.user.uid)
        .get()
        .then(res => )
    }
  }
  mounted() {
    
  }
}
</script>

<style>

</style>
