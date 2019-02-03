<template>
  <div>
    <!-- idea here is to create a scaled test env where everything happens instantaneously and locally for development testing and later deployment to a larger stage.  -->
    <div id="bar">
      <div id="health" :style="{ width: `${player.capsule.health}%`}"></div>
    </div>

    <button @click="launchCapsule">LAUNCH!</button>
    <button @click="repairCapsule">REPAIR!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      environment: {
        factors: [
          "asteroids",
          "solar radiation",
          "extreme gravity"
        ],
      },
      player: {
        capsule: {
          discoveryProbability: 0.4,
          successProbability: 0.2,
          health: 100,
          modifications: [],
          underRepair: false,
        },
        factorsKnown: [],
      },
      modifications: [
        "armor", 
        "reflective lens",
        "flexible alloys"
      ]
    }
  },
  methods: {
    launchCapsule() {
      if (this.player.capsule.health === 0 || this.player.capsule.underRepair) {
        alert('You have to repair your capsule before another launch.')
      } else {

        // this generates the mission outcome. 
        const discoRandom = Math.random();
        const successRandom = Math.random(); 
        
        if (discoRandom > this.player.capsule.discoveryProbability) {
          console.log('discovery failed.')
        } else {
          console.log('discovery succeeding.');
        }

        if (successRandom > this.player.capsule.successProbability) {
          console.log('no success');
          this.player.capsule.health -= 20;
          if (this.player.capsule.health <= 0) this.player.capsule.health = 0;
        } else {
          console.log('success!');
        }
      }
    },
    // instead of a while loop, these need to be recursive functions. 
    repairCapsule() {
      if (this.player.capsule.health === 100) {
        alert('We are ready to launch.');
      } else {
        this.doRepair();
      }
    },
    doRepair() {
      this.player.capsule.underRepair = true;
      if (this.player.capsule.health === 100) {
        alert('Repairs concluded! Ready to launch.');
        this.player.capsule.underRepair = false;
      } else if (this.player.capsule.health > 95) {
        console.log('repair noises...');
        this.player.capsule.health = 100;
        alert('Repairs concluded! Ready to launch.');
        this.player.capsule.underRepair = false;
      } else {
        console.log('repair noises...');
        this.player.capsule.health +=5;
        setTimeout(() => {
          this.doRepair();
        }, 2000);
      }
    }
  }
}
</script>

<style>
  #bar {
    height: 1em;
    width: 100%;
    border: 1px black solid;
  }

  #health {
    background-color: blue;
    border: 1px black solid;
    height: 1em;
  }
</style>
