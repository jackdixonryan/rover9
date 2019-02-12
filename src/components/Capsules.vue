<template>
  <div class="outer-box" v-if="capsules.length > 0">
    <div class="shade-box">

    <ErrorModal 
      v-if="error" 
      title="Insufficient Funds" 
      body="You do not have enough money to purchase that item. Complete some missions to earn your funds back!" 
      @modalClosed="error = false" 
      class="error-modal animated fadeIn 3s"
    />

    <div v-if="shuttleSelected">
      <div class="gray-out" @click="shuttleSelected = null">
      </div>
      <div class="modal animated fadeIn 3s" >
        <button style="float: right; padding: .5em;" @click="shuttleSelected = null">x</button>
        <calculator :capsule="shuttleSelected" />
      </div>
    </div>

    <div class="capsule-info" v-for="capsule in capsules" :key="capsule.name">
      <div class="text-info">
        <h4>{{capsule.name}}</h4>
        <p style="max-width: 200px; padding: .25em .25em .25em 0em;">{{ capsule.description }}</p>
        <p>$ {{capsule.price}}</p>
        <button class="purchase" @click="buyCapsule(capsule)">Purchase</button>

        <button 
          class="purchase" 
          style="margin-left: .5em;"
          @click="shuttleSelected = capsule"
        >%</button>

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
  </div>
</template>

<script>
import firebase from 'firebase';

import ProgressCircle from './ProgressCircle';
import ErrorModal from './ErrorModal';
import Calculator from './Calculator';

export default {
  components: {
    ProgressCircle,
    ErrorModal,
    Calculator,
  },
  data() {
    return {
      capsules: [],
      error: false,
      shuttleSelected: null,
    }
  },
  methods: {
    buyCapsule(capsule) {

      const newBalance = this.$parent.userDetails.funding - capsule.price;

      if (newBalance < 0) {
        this.error="true";
      } else {

        firebase.firestore()
          .collection('users')
          .doc(this.$store.state.user.uid)
          .update({
            capsules: firebase.firestore.FieldValue.arrayUnion(capsule),
            funding: newBalance
          })
          .then(resolved => {
            console.log('request resolved.');
            this.$emit('userNeedsUpdate');
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    firebase.firestore()
      .collection('probes')
      .orderBy("price", "asc")
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
    margin-top: 1em;
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
