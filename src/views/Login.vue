<template>
  <div id="login-splash">
    <div id="login-box">
      <div id="login-header">
        <h2>login</h2>
        <div class="sparkline"></div>
      </div>

        <div id="email-area">
          <h3 class="subheader">email</h3>
          <input type="text" name="email" id="email" v-model="email"/>
        </div>

        <div id="password-area">
          <h3 class="subheader">password</h3>
          <input type="password" name="password" id="password" v-model="password"/>
        </div>

        <div id="go">
          <button @click="signIn" class="button">Sign In</button>
          <p>Need an account? <router-link class="link" to="/signup">Sign Up</router-link></p>
        </div>

    </div>
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
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
  /* This portion of the page will have a different base style from the rest of it. */
  #login-splash {
    background-color:  #303030;
    position: absolute;
    width: 100%;
    height: 102vh;
    z-index: 50;
  }

  #login-box {
    padding: 1em;
    font-family: "Rajdhani", sans-serif;
    letter-spacing: 2px;
    display: grid;
    grid-template-areas: 
      "heading email-area"
      "heading password-area"
      "heading go";
    margin: 0 auto;
    margin-top: 20em;
    width: 80%;
  }

  #login-header {
    color: white;
    grid-area: heading;
    transform: rotate(-90deg);
    text-align: right;
    h2 {
      font-size: 3em;
    }
    height: 2em;
    width: 20em;
  }

  #email-area {
    grid-area: email-area;
    margin-bottom: 2em;
    position: relative;
    bottom: 10em;
    right: 4em;
  }

  #password-area {
    grid-area: password-area;
    position: relative;
    bottom: 8em;
    right: 4em;
  }

  #go {
    position: relative;
    bottom: 4em;
    right: 5em;
    grid-area: go;
    color: white;
    p {
      font-size: 20px;
      display: inline;
      margin-left: .5em;
      .link {
        color: cyan;
        text-decoration: none;
      }
    }
  }

  .subheader {
    color: cyan;
    font-size: 4em;
  }

  .sparkline {
    width: 100%;
    background-color: white;
    height: 1px;
    position: absolute;
  }

  input {
    font-size: 3em;
    color: white;
    outline: none;
    width: 120%;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #303030 inset;
    box-shadow: 0 0 0px 1000px #303030 inset;
  }

  .button {
    padding: 1em;
    margin: 0em 0em 1em 0em;
    font-size: 20px;
    border: 1px cyan solid;
  }
</style>
