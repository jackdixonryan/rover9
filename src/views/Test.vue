<template>
  <calculator />
</template>

<script>
import mechanics from '../mechanics';
import Calculator from '../components/Calculator';
// What if the capsule stored not an overall chance of failure but a chance of failure for each time pulse? 

export default {
  components: {
    Calculator
  },
  data() {
    return {
      capsule: {
        failureProbability: 0.1,
        discoveryProbability: 0.5,
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
  async mounted() {
    // const mission = await mechanics.mission(this.capsule, this.environment) !== undefined;
    // console.log(mission)
  }
}
</script>

<style>

</style>
