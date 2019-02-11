<template>
  <div id="header">
    <div id="inner">
      <h3 v-if="userDetails.username" class="flex-main-info">{{ userDetails.username }}</h3>
      <input v-else type="text" placeholder="Set your Username" id="username-update" class="flex-main-info" @keyup.enter="updateUsername" v-model="username" />
      <h3 class="flex-main-info">$ {{ userDetails.funding }}</h3>
      <h3 class="flex-main-info">0 Active Missions</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "userDetails" ],
  data() {
    return {
      username: "",
    }
  },
  methods: {
    updateUsername() { 
      // set local
      this.$set(this.userDetails, 'username', this.username);
      
      // set data.
      firebase.firestore()
        .collection('users')
        .doc(this.user.uid)
        .update({
          username: this.username
        })
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped>
  #inner {
    margin: 1em;
    background: #000428;
    background: -webkit-linear-gradient(to right, #004e92, #000428); 
    background: linear-gradient(to right,#004e92, #000428);
    padding: .5em;
    display: flex;
  }

  #header {
    background-color: #000428;
    border: 3px #E6E6FA	solid;
    border-top: 10px #E6E6FA solid;
    color: white;
    grid-area: banner;
    max-height: 75px;
  }

  .flex-main-info {
    flex: 1;
    text-align: center;
  }
</style>
