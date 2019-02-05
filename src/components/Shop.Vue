<template>
  <div id="probes-menu">
    
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
