<template>
  <div class="outer-box">
    <div class="shade-box">
      <h3 class="header-3">Active Missions</h3>
      <div v-if="!hasActives">
        <h4 class="header-4" style="letter-spacing: 1px;">You have no active missions at this time.</h4>
        <p class="subtitle">Browse our reccomendations below or visit the missions portal to select an available mission.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'userDetails' ],
  computed: {
    hasActives() {
      if (this.userDetails.activeMissions.length > 0) return true;
      else return false;
    }
  }
}
</script>

<style>

</style>
