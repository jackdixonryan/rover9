<template>
  <div>
    <div class="display"></div>
    <div class="modal">
      <div class="modal-body">
        <div id="left">
          <error-modal-animation height="100" width="100" name="error"/> 
        </div>
        <div id="right">
          <h3 style="color: lightskyblue">
            {{ title }}
          </h3>
          <p>{{ body }}</p>
          <button class="dismiss" @click="$emit('modalClosed')">Dismiss</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorModalAnimation from './ErrorModalAnimation.vue';

export default {
  components: { ErrorModalAnimation },
  props: {
    title: String,
    body: String,
  },
  data() {
    return {
      visible: true,
    }
  }
}
</script>

<style scoped>

  .display {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: .6;
    top: 0;
    left: 0;
  }

  .modal {
    position: fixed;
    top: 20em;
    width: 70%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 1em;
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    border: 1px lavender solid;
    z-index: 11;
  }

  .modal-body {
    color: white;
    width: 90%;
    margin: 0px;
    display: grid;
    grid-template-areas: "path text";
  }

  #left {
    grid-area: path;
    padding: 1em;
  }

  #right {
    grid-area: text;
    padding-left: 2em;
  }

  .dismiss {
    padding: .5em;
    border: 1px lightskyblue solid;
  }
</style>
