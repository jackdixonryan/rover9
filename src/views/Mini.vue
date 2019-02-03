<template>
  <div>
    <!-- idea here is to create a scaled test env where everything happens instantaneously and locally for development testing and later deployment to a larger stage.  -->
    <div id="bar">
      <div id="health" :style="{ width: `${player.capsule.health}%`}"></div>
    </div>

    <button @click="launchCapsule">LAUNCH!</button>
    <button @click="doRepair">REPAIR!</button>
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
    // this could be way cooler. Use the repairs logic to set some timers, create some progress clocks maybe, and figure out a new way to evaluate mission success/failure. Maybe generate probs per block of code instead of bulk for entire mission, or have mods affect damage taken.
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
    // recursive function for doing repairs on a capsule.
    doRepair() {
      // tells the program that the capsule cannot be launched as it is currently being repaired.
      this.player.capsule.underRepair = true;

      // if the capsule is fully repaired...
      if (this.player.capsule.health === 100) {

        // alert the player and set the repair bool to false.
        alert('Repairs concluded! Ready to launch.');
        this.player.capsule.underRepair = false;

      // case 2: the module is nearly repaired.
      } else if (this.player.capsule.health > 95) {
        // indicate that the repair is in progress.
        console.log('repair noises...');

        // auto-set capsule to 100% health to prevent from having incomplete repairs. 
        this.player.capsule.health = 100;

        // alert the player that repairs are done and set the repair bool to false. 
        alert('Repairs concluded! Ready to launch.');
        this.player.capsule.underRepair = false;

      // barring the capsule being repaired or nearly repaired...
      } else {
        // indicate that repairs are occurring.
        console.log('repair noises...');
        // increment the capsule's health by 5%;
        this.player.capsule.health +=5;

        // here's the meat: Set the 2 second timeout. This is a game, so the repairs have to take time, they can't happen immediately. 
        setTimeout(() => {
          // and recursively call this method, which will exit once the capsule is fully repaired. 
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
