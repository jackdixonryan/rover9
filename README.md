# rover9
Space Simulation Game for PWA development. 

![demo picture](https://raw.githubusercontent.com/jackdixonryan/rover9/master/src/assets/readmeImg.png)

I want to have a little fun and see if I can actually build a reasonably good click-and-wait game. Basically, for now, the idea is pretty simple: You are a the director of NASA and it's your responsibility to explore the vast reaches of space! for the first version, it's going to be pretty simple: 

The environment has 3 randomly selected unknowns--eg, intense solar radiation, asteroids, massive distance, and only by launching probes with the appropriate additions can you figure out what they are. So, say, a probe with solar reflectors might withstand the solar radiation, but get pounded with asteroids. 

As the game is developed, users will be able to research more, run manned missions, land in places, but for now let's keep it simple. 

- build a probe
- launch into space 
- gather data 
- return data
- relaunch
- until area is explored! 

# Technology Required 

- Vuejs for the PWA 
- Firestore for the database
- user authentication
- push notifications for android
- database for user modifications with good data structure
- timers !!! and expirations -- eg., probe flight takes 20 minutes, need to set a 20 minute timer and wait for probe to return data, so that needs to be stored somewhere. 
- javascript system of probabilities to generate reasonably varied game results. 