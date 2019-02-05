<template>
  <div id="progress-circle" :style="{height: `${height}px`, width: `${width}px`}"></div>
</template>

<script>
import Progress from 'progressbar.js';
export default {
  props: ['color', 'width', 'height', 'progress'],
  mounted() {
    const progressCircle = new Progress.Circle('#progress-circle', {
      color: this.color,
      duration: 3000,
      easing: 'easeInOut',
    });

    progressCircle.animate(this.progress);
  }
}
</script>

<style>
</style>
