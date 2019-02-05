<template>
  <div id="capsule-menu" v-if="capsules.length > 0">
    <div class="capsule-info" v-for="capsule in capsules" :key="capsule.name">
      <div class="text-info">
        <h4>{{capsule.name}}</h4>
        <p style="max-width: 200px; padding: .25em .25em .25em 0em;">{{ capsule.description }}</p>
        <p>$ {{capsule.price}}</p>
        <button class="purchase">Purchase</button>
      </div>
      <div class="probe-stats">
        <!-- important note here: passing a space into the id will break the render logic for the circle. You need to pass it a -->
        <div class="progress-circles">
          <div class="flex">
            <progress-circle 
              height="100"
              width="100" 
              color="#ffffff" :name="capsule.name.split(' ').join('-')" 
              :progress="capsule.discoveryProbability"
              class="progress"
            />
            <p class="stat-text">Discovery Probability</p>
          </div>
          <div class="flex">
            <progress-circle
              height="100"
              width="100"
              color="#ffffff"
              :name="capsule.name.split(' ').join('-') + '-success'"
              :progress="capsule.successProbability"
              class="progress"
            />
            <p class="stat-text">Success Probability</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import ProgressCircle from './ProgressCircle'

export default {
  components: {
    ProgressCircle,
  },
  data() {
    return {
      capsules: [],
    }
  },
  mounted() {
    firebase.firestore()
      .collection('probes')
      .get()
      .then(probesList => {
        probesList.forEach(probe => {
          this.capsules.push(probe.data());
        });
      });
  }
}
</script>

<style scoped>
  #capsule-menu {
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    padding: 1em;
    border: 3px gray solid;
    border-top: 10px gray solid;
    color: white;
    font-family: 'Raleway', sans-serif;
  }

  .capsule-info {
    border-top: 1px lightskyblue solid;
    padding: 1em;
    display: grid;
    grid-template-areas: "title stats stats stats";
    grid-row-gap: 1em;
  }

  .text-info {
    grid-area: title;
  }

  .probe-stats {
    width: 100%;
    grid-area: stats;
  }

  .progress-circles {
    display: flex;
  }

  .flex {
    flex: 1;
    text-align: center;
  }

  .progress {
    width: 100%;
    margin: 0 auto;
  }

  .stat-text {
    color: lightskyblue;
    letter-spacing: 1px;
    margin-top: .5em;
  }

  .purchase {
    border: 1px lightskyblue solid;
    padding: .5em;
  }

</style>
