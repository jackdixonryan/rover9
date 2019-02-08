<template>
  <div>Hello</div>
</template>

<script>
import mechanics from '../mechanics';

export default {
  data() {
    return {
      capsule: {
        successProbability: 0.1,
        discoveryProbability: 0.1,
        modifications: [
          {
            name: 'retrothrusters',
            boosts: [1],
            hinders: []
          }
        ]
      },
      environment: {
        id: 1,
        data: {
          length: 10,
        }
      }
    }
  },
  mounted() {
    mechanics.mission(this.capsule, this.environment);
  }
}
</script>

<style>

</style>
