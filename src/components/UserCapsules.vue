
<template>
  <div id="main" v-if="userData">
    <ErrorModal 
      :title="errorMessage.title" 
      :body="errorMessage.body"       
      @modalClosed="error = false" 
      class="animated fadeIn 3s" 
      v-if="error" 
    />

    <div class="outer-box">
      <div class="shade-box" id="capsules">
        <h3 class="header-3">Capsules</h3>
        <div v-for="capsule in userData.capsules" :key="capsule.name" class="capsule">
          <div>
            <h4 class="header-4">{{capsule.name}}</h4>
            <p class="subtitle">Discovery: {{ capsule.discoveryProbability * 100}}%</p>
            <p class="subtitle">Success: {{ capsule.successProbability * 100 }}%</p>
            <button class="btn">Modify</button>
            <button class="btn" style="margin-left: .75em;">Launch</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import ErrorModal from './ErrorModal.vue';
export default {
  components: {
    ErrorModal,
  },
  data() {
    return {
      userData: null,
      error: false,
      errorMessage: {
        title: null,
        body: null,
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
      console.log(this.user.uid);
      firebase.firestore()
        .collection('users')
        .doc(this.user.uid)
        .get()
        .then(resolves => {
          this.userData = resolves.data();
        })
        .catch(error => {
          this.error = true;
          this.errorMessage = {
            title: 'Database Error',
            body: error,
          }
        });
  }
}
</script>

<style scoped>
</style>