<template>
  <div>
    <p>We need you in the command room.</p>
    <input type="text" name="email" id="email" placeholder="Email" v-model="email"/>
    <input type="password" name="password" id="password" placeholder="Password" v-model="password"/>
    <button @click="signIn">Sign In</button>
    <span>Need an account? <router-link to="/signup">Sign Up</router-link></span>
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
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userSignedIn => {
          window.location.replace('/home')
        })
        .catch(error => {
          console.log({error});
        });
    }
  }
}
</script>

<style>

</style>
