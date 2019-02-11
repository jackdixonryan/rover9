<template>
  <div id="background">
      <!-- <div id="probe-stats">
        <div id="banner" style="width: 100%; border-bottom: 1px #87CEFA solid;">
          <p style="color: #87CEFA; font-size: 12px; margin: 5px;">02/05/2019</p>
        </div>
        <div id="title">
          <h3>ARES III</h3>
          <h4>Mission Status</h4>
        </div>
        <div id="bars">
          <div class="circle">
            <progress-circle color="#ffffff" :progress=".47" height="100" width="100" name="health" class="bar"/>
            <p class="bar-label">Hull Integrity</p>
          </div>
          <div class="circle">
            <progress-circle color="#ffffff" :progress=".75" height="100" width="100" name="discChance" class="bar"/>
            <p class="bar-label">Discovery Chance</p>
          </div>
          <div class="circle">
            <progress-circle color="#ffffff" :progress=".25" height="100" width="100" name="success" class="bar"/>
            <p class="bar-label">Success Chance</p>
          </div>
        </div>
      </div> -->
    <user-capsules :user="user"/>
  </div>
</template>

<script>
import firebase from 'firebase';
// import ProgressCircle from '../components/ProgressCircle';
import UserCapsules from '../components/UserCapsules';

export default {
  components: {
    UserCapsules,
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
    border: 3px #E6E6FA solid;
    border-top: 10px #E6E6FA solid; 
  }

  #probe-stats {
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    height: 100%;
    padding: 1em;
    display: grid;
    grid-template-areas: "banner banner banner banner"
      "title bars bars bars";
    grid-row-gap: 1em;
  }

  #title {
    display: inline;
    font-weight: 800;
    letter-spacing: 2px;
  }

  #bars {
    display: flex;
    padding: 1em;
    grid-area: bars;
  }

  .circle {
    flex: 1;
    text-align: center;
    font-size: 15px;
  }

  .bar {
    width: 90%;
    margin: 0 auto;
  }

  .bar-label {
    margin-top: .75em;
    color: #87CEFA;
  }

  #banner {
    grid-area: banner;
    padding: 0px;
  }
</style>
