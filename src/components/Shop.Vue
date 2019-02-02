<template>
  <div>
    <button color="success" @click="menu ? menu = false : menu = true">Open Menu</button>
    <div v-if="probes.length > 0 && menu">
      <div class="list-item" v-for="probe in probes" :key="probe.name">
        <h3>{{ probe.name }}</h3>
        <p>{{ probe.description }}</p>
        <h5>DISCOVERY: {{ probe.discoveryProbability }}</h5>
        <h5>SUCCESS: {{ probe.successProbability }} </h5>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      probes: [],
      menu: false,
    }
  },
  mounted() {
    firebase.firestore()
      .collection('probes')
      .get()
      .then(probeCollection => {
        probeCollection.forEach(probe => {
          this.probes.push(probe.data());
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style>
  .list-item {
    border: 1px black solid;
    text-align: center;
    padding: 1em;
    line-height: 2;
  }
</style>
