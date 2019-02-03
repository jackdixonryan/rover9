<template>
  <div id="mission-control">
    <div id="screen">
      <h3>Rover 9 Mission Control</h3>
      <div id="bar">
        <div id="health" :style="{ width: `${player.capsule.health}%`}"></div>
      </div>
      <h2>HEALTH: {{player.capsule.health}}%</h2>
      <button class="btn" @click="launchCapsule">LAUNCH!</button>
      <button class="btn" @click="doRepair">REPAIR!</button>
      <h2>LOG:</h2>
      <div id="log">
        <div class="notification" v-for="(notification, index) in notifications" :key="index">
          <p>{{notifications.length - index }}: {{ notification }}</p>
        </div>
      </div>
    </div>
    <!-- idea here is to create a scaled test env where everything happens instantaneously and locally for development testing and later deployment to a larger stage.  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
      cycle: 0,
      environment: {
        factors: [
          "asteroids",
          "solar radiation",
          "extreme gravity"
        ],
        distance: 10
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
      // if the capsule is out of health or under repair, prevent launch from continuing to / run. 
      if (this.player.capsule.health === 0 || this.player.capsule.underRepair) {
        this.notifications.unshift('You have to repair your capsule before another launch.');
        // if the capsule is functional and you have yet to arrive at your destination.
      } else if (this.cycle < this.environment.distance){
        this.cycle++;
        // this is the chance that runs against your success chance to return whether you've taken damage. 
        const dmgChance = Math.random();

        // if the damageChance is higher than the probability of success, cause some damage to the probe.
        if (dmgChance > this.player.capsule.successProbability) {
          this.notifications.unshift("The probe is reporting damages!");
          this.player.capsule.health -= 20;

          // if the probe has been destroyed by this damage...
          if (this.player.capsule.health <= 0) {
            this.notifications.unshift("We've been destroyed!");
            this.player.capsule.health = 0;
            this.cycle = 0;

            // calculate the probability that the probe discovered something about it's environment before going down.
            const discProb = Math.random();
            if (discProb <= this.player.capsule.discoveryProbability) {

              //figure out which undiscovered element we found...
              const discovery = this.environment.factors[Math.floor(Math.random() * this.environment.factors.length)];

              // tell the user what they ought to know. 
              this.notifications.unshift(`The probe sent one last transmission! We have discovered that the area has ${discovery}!`);

              // add the discovery to the player's known places. 
              this.player.factorsKnown.push(discovery);

            } else {
              this.notifications.unshift("The probe was too damaged to send any data.");
            }
          }

        } else {
          this.notifications.unshift("All systems reporting nominal.")
        }

        setTimeout(() => {
          this.launchCapsule();
        }, 2000);
      // if mission has achieved success.
      } else {
        this.notifications.unshift("We made it sir! We've reached our destination!");
        this.cycle = 0;
      }
    },
    // recursive function for doing repairs on a capsule.
    doRepair() {
      // tells the program that the capsule cannot be launched as it is currently being repaired.
      this.player.capsule.underRepair = true;

      // if the capsule is fully repaired...
      if (this.player.capsule.health === 100) {

        // alert the player and set the repair bool to false.
        this.notifications.unshift('Repairs concluded! Ready to launch.');
        this.player.capsule.underRepair = false;

      // case 2: the module is nearly repaired.
      } else if (this.player.capsule.health > 95) {
        // indicate that the repair is in progress.
        this.notifications.unshift('repair noises...');

        // auto-set capsule to 100% health to prevent from having incomplete repairs. 
        this.player.capsule.health = 100;

        // alert the player that repairs are done and set the repair bool to false. 
        this.notifications.unshift('Repairs concluded! Ready to launch.');
        this.player.capsule.underRepair = false;

      // barring the capsule being repaired or nearly repaired...
      } else {
        // indicate that repairs are occurring.
        this.notifications.unshift('repair noises...');
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
  #mission-control {
    width: 80%;
    margin: 0 auto;
    background-color: brown;
    height: 35em;
    padding: 1em;
    border-radius: 5%;
    margin-top: 10em;
    border: 1px black solid;
  }

  #screen {
    background-color: black;
    border-radius: 5%;
    width: 90%;
    margin: 0 auto;
    height: 100%;
    padding: 1em;
    color: white;
    text-align: center;
  }

  #bar {
    height: 5em;
    width: 90%;
    margin: 0 auto;
    border: 1px black solid;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  #health {
    background-color: blue;
    border: 1px black solid;
    height: 5em;
  }

  .btn {
    height: 2em;
    width: 40%;
    margin: 2em;
    border: 1px blue solid;
    color: white;
    border-radius: 5%;
  }

  #log {
    overflow: scroll;
    height: 14em;
    width: 100%;
    border: 1px white solid;
    border-radius: 5%;
    text-align: left;
  }
</style>
