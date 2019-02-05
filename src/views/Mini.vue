<template>
  <div id="main">
  <div id="mission-control">
      <div class="information-area" id="bar-area">
        <div id="bar">
          <div id="health" :style="{ width: `${player.capsule.health}%`}"></div>
        </div>

        <div id="graph">
          <div class="tick" id="first"></div>
          <div v-for="point in graph" class="tick" :key="point"></div>
        </div>

        <h2>HULL INTEGRITY: {{player.capsule.health}}%</h2>
      </div>

      <div class="information-area" id="command">
        <button class="btn" @click="launchCapsule">LAUNCH!</button>
        <button class="btn" @click="doRepair">REPAIR!</button>
      </div>

      <div id="log" class="information-area">
        <h2>LOG</h2>
        <div class="notification" v-for="(notification, index) in notifications" :key="index">
          <p>{{notifications.length - index }}: {{ notification }}</p>
        </div>
      </div>
    <!-- idea here is to create a scaled test env where everything happens instantaneously and locally for development testing and later deployment to a larger stage.  -->
  </div>
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
      ],
      graph: [
        1, 2, 3, 4, 5, 6, 7, 8, 9
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

              new Notification("ROVER 9:", {
                body: 'Rover 9 was destroyed but it has something to report!'
              });

              // add the discovery to the player's known places. 
              this.player.factorsKnown.push(discovery);

            } else {
              this.notifications.unshift("The probe was too damaged to send any data.");

              const destroyedN = new Notification("ROVER 9 has been destroyed!", {
                body: "Click here to repair!"
              });

              destroyedN.addEventListener('click', (e) => {
                this.doRepair();
              });
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

        new Notification('ROVER 9:', {
          body: "Mission Success!"
        });

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

        const repairs = new Notification("ROVER 9:", {
          body: "Repairs are concluded! Prepare to launch!"
        });
        repairs.addEventListener('click', (e) => {
          this.launchCapsule();
        });

        this.player.capsule.underRepair = false;

      // case 2: the module is nearly repaired.
      } else if (this.player.capsule.health > 95) {
        // indicate that the repair is in progress.
        this.notifications.unshift('repair noises...');

        // auto-set capsule to 100% health to prevent from having incomplete repairs. 
        this.player.capsule.health = 100;

        // alert the player that repairs are done and set the repair bool to false. 
        this.notifications.unshift('Repairs concluded! Ready to launch.');

        const repairs = new Notification("ROVER 9:", {
          body: "Repairs are concluded! Click to launch!"
        });
        repairs.addEventListener('click', (e) => {
          this.launchCapsule();
        });

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
  },
  mounted() {
    Notification.requestPermission()
    new Notification("ROVER 9", {
      body: "You have permitted Rover 9 to send you notifications. Excelsior!"
    });
  }
}
</script>

<style scoped>
  #main {
    background-color: black;
    padding: 0px;
    margin: 0px;
    height: 100vh;
  }

  #mission-control {
    height: 100vh;
    padding: 1em;
    color: white; 
    text-align: center;
    font-family: "Raleway", sans-serif;
    display: grid;
    grid-template-areas: 'bar-area bar-area'
      'command log';
    grid-gap: .5em;
  }

  #bar {
    height: .5em;
    width: 90%;
    margin: 0 auto;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  #health {
    background-color: #4286f4;
    height: .5em;
  }

  .btn {
    height: 2em;
    width: 40%;
    margin: 2em;
    color: white;
  }

  #log {
    overflow: scroll;
    height: 34em;
    text-align: left;
    grid-area: log;
    width: 100%;
  }

  #command {
    grid-area: command;
  }

  #graph {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px white solid;
    margin-bottom: 2em;
  }

  .tick {
    height: .3em;
    display: inline-block;
    border-right: 1px white solid;
    width: 10%;
  }

  #first {
    border-left: 1px white solid;
  }

  .information-area {
    background: #000428;  /* fallback for old browsers */
    background: -webkit-linear-gradient(#004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(#004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border: 3px lightgray solid;
    border-top: 10px lightgray solid;
    padding: 1em;
  }

  #bar-area {
    grid-area: bar-area;
  }
</style>
