<template>
  <div id="background">
    <div id="main">
      <div id="probe-stats">
        ARES III
        12.4.25.6
        <div id="bars">
          <progress-circle color="#ffffff" :progress=".47" height="60" width="60" class="circle"/>
          <progress-circle color="#ffffff" :progress=".76" height="60" width="60" class="circle"></progress-circle>
          <progress-circle color="#ffffff" :progress=".25" height="60" width="60" class="circle"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import ProgressCircle from '../components/ProgressCircle';

export default {
  components: {
    ProgressCircle
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>

<style scoped>
  #background {
    background-color: black;
    height: 100vh;
    padding: 10px;
    font-family: "Raleway", sans-serif;
    color: white;
    font-size: 20px;
  }

  #main {
    background-color: #000428;
    padding: 1em;
    border: 3px gray solid;
    border-top: 10px gray solid;
  }

  #probe-stats {
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    height: 100%;
    padding: 1em;
  }

  #bars {
    display: flex;
  }

  .circle {
    flex: 1;
  }
</style>
