<template>
  <div>
    <div class="display"></div>
    <div class="modal">
      <div class="modal-body">
        <h3 style="color: lightskyblue">
          {{ title }}
        </h3>
        <p>{{ body }}</p>
        <button class="dismiss" @click="$emit('modalClosed')">Dismiss</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'body',
  ],
  data() {
    return {
      visible: true,
    }
  }
}
</script>

<style>

  .display {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: .6;
    z-index: 10000;
    top: 0;
    left: 0;
  }

  .modal {
    position: absolute;
    top: 20em;
    width: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 1em;
    background: #000428;
    background: -webkit-linear-gradient(#004e92, #000428); 
    background: linear-gradient(#004e92, #000428);
    border: 1px lavender solid;
    z-index: 2000;
  }

  .modal-body {
    color: white;
    width: 90%;
    margin: 0 auto;
    padding: 1em;
  }

  .dismiss {
    padding: .5em;
    border: 1px lightskyblue solid;
  }
</style>
