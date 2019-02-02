<template>
  <div>
    <p>We are ready for launch.</p>
    <input type="text" name="email" id="email" placeholder="Email" v-model="email"/>
    <input type="password" name="password" id="password" placeholder="Password" v-model="password"/>
    <button @click="signUp">Sign Up</button>
    <span>Already have an account? <router-link to="/login">Login</router-link></span>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(userCreated => {
          firebase.firestore() 
            .collection('users')
            .doc(userCreated.user.uid)
            .set({
              email: this.email,
              username: null,
              inventory: {},
            })
            .then(userDetailsAdded => {
              window.location.replace('/home');
            })
            .catch(error => {
              console.log(error);
            })
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
