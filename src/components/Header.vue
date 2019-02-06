<template>
  <div id="header">
    <h3 v-if="userDetails.username" class="flex-main-info">{{ userDetails.username }}</h3>
    <input v-else type="text" placeholder="Set your Username" id="username-update" class="flex-main-info" @keyup.enter="updateUsername" v-model="username" />
    <h3 class="flex-main-info">$ {{ userDetails.funding }}</h3>
    <h3 class="flex-main-info">0 Active Missions</h3>
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
  #header {
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    padding: 1em;
    border: 3px #E6E6FA	solid;
    border-top: 10px #E6E6FA solid;
    color: white;
    grid-area: banner;
    display: flex;
  }

  .flex-main-info {
    flex: 1;
    text-align: center;
  }
</style>
