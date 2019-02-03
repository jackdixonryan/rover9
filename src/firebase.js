// general utility functions 
import firebase from 'firebase';

const db = {
  // gets user details off user ID;
  getUser(userID) {
    return new Promise((resolve, reject) => {
      firebase.firestore()
        .collection('users')
        .doc(userID)
        .get()
        .then(userDetails => {
          resolve(userDetails.data());
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  commitUserToStore(vueInstance) {
    firebase.auth().onAuthStateChanged(userDetected => {
      vueInstance.$store.state.user = userDetected;
    })
  }
}