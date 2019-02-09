<template>
  <div id="main" class="shade-box">
    <div id="title">
      <h1>Probability Calculator</h1>
    </div>

    <div id="success">
      <h3 class="header-3">Success Probability</h3>
      <input 
        type="number" 
        name="prob" 
        id="prob" 
        v-model="successProbability" 
        class="primary-input"
        max="100"
        min="0"
        step=".05"
      />
      <span class="percentage">%</span>
    </div>

    <div id="length">
      <h3 class="header-3">Mission Length</h3>
      <input 
        type="number" 
        name="length" 
        id="length" 
        v-model="missionLength" class="primary-input" 
      />
      <span class="percentage">Months</span>
    </div>

    <div id="results">
      <h3 class="header-3">Mission Success Probability</h3>
      <progress-circle
        name="mission-success-probability"
        color="#ffffff"
        height=".5em"
        width=".5em"
        :progress="missionProbability / 100"
        class="small-circle"
      />
    </div>

  </div>
</template>

<script>

import ProgressCircle from "./ProgressCircle.vue";
// probability calculator, to be pluggable on any page and context (which is to say, DO NOT make any of its styling specific.)
export default {
  components: {
    ProgressCircle,
  },
  data() {
    return {
      successProbability: 90,
      missionLength: 12,
    }
  },
  // takes two props, the capsule and the env, which allows it to calculate probability of success.
  computed: {
    // the central crux: calcs the prob of mission success. Very simple calculation that sits at the xroads fo the project.
    missionProbability() {
      // failure probability will come in as a raw percentage--eg, 5%;
      // mission length in months 

      // convert % to a float.
      const toFloat = parseFloat(this.successProbability) / 100;

      const missionFailure = Math.pow(toFloat, parseInt(this.missionLength));

      const backToPercent = missionFailure * 100;

      return Math.floor(backToPercent);
    }
  }
}
</script>

<style lang="scss" scoped>

  .primary-input {
    padding: .5em;
    margin: 1em 0 1em 0;
    outline: none;
    color: white;
    font-size: 2em;
    width: 5em;
  }

  .percentage {
    font-size: 2em;
    color: white;
  }

  #main {
    width: 70;
    margin: 0 auto;
    margin-top: 2em;
    display: grid;
    grid-template-areas: 
      "title title"
      "success length"
      "results results";
  }

  .small-circle {
    height: 10em;
    width: 10em;
    margin: 0 auto;
    margin-top: 1em;
  }

  #title {
    grid-area: title;
  }

  #success {
    grid-area: success;
  }

  #length {
    grid-area: length;
  }

  #results {
    grid-area: results;
  }

  #results, #length, #success {
    text-align: center;
    :first-child {
      text-align: left;
    }
  }


</style>
