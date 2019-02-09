// Here's where we'll store all of the broad game mechanics so as not to clog the front end. This is where a lot of the application's engine will lie ( the bits that aren't db based ), and I'd like to keep it separate from the firebase timers or other logic structures. 

const mechanics = {
  // this is the core of the missions logic. It requires knowledge about the probe and the environment. 

  //The environment passed to this method MUST HAVE AN ID ATTACHED TO IT
  mission(capsule, environment) {
    console.log('welcome.')

    // setting two variables to calculate what the probe is capable of. The base failure is the probability that the probe will fail on any time pulse.
    const baseFailure = this.calculateProbability('failureProbability', capsule, environment);

    // base discovery is the opposite--just a raw chance of discovery. 
    const baseDiscovery = this.calculateProbability('discoveryProbability', capsule, environment);

    // again, remember here that the env is going to be an object formatted as such: {
    //    id: id, data: data
    // }

    // get the length of the mission--in months, each month translates to 1 minute.
    const missionLength = environment.data.length;
    console.log(baseFailure);
    
    // this is the probability that the mission will fail in any given month.

    let counter = 0;
    let missionFailed = false;

    const runMission = () => {
      setTimeout(() => {
        console.log("Mission in month: " + (counter + 1));
        counter++;
        
        if (Math.random() < baseFailure) {
          console.log('Mission just failed!');
          missionFailed = true;
        }

        if (counter < missionLength && !missionFailed) {
          runMission();
        } else if (counter === missionLength) {
          console.log('Mission Successful!')
        } else {
          if (Math.random() < baseDiscovery) {
            console.log('you discovered something! but the mission failed.');
          } else {
            console.log('you failed and nothing was uncovered.');
          }
        }
      }, 1000);
    } 
    runMission();   
  },
  // the engine needs to be able to read the contents of the capsules's base plus or minus it's various modifications. It will pay to be cautious with this method as it applies to both discovery and success.
  calculateProbability(probabilityType, capsule, environment) {
    // call it .4, the basic chance of failure built into the capsule. 
    let baseProbability = capsule[probabilityType];
    
    capsule.modifications.map(modification => {
      // for now, lets assume that every mod gives you a 3% bump in either direction.

      // if the mod is beneficial, it will reduce the chance of failure by 3%.
      if (modification.boosts.includes(environment.id)) {
        baseProbability -= .03
        // if the mod is detrimental, it will increase the chance of failure by three percent. 
      } else if (modification.hinders.includes(environment.id)) {
        baseProbability -= .03;
      }

      // max/mins the probability factors to prevent bleeding over.
      if (baseProbability > 1) baseProbability = 1;
      if (baseProbability < 0) baseProbability = 0;
    });

    return baseProbability;

  }, 
}

export default mechanics; 
