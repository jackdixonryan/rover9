<template>
  <div :id="name" :style="{height: `${height}px`, width: `${width}px`}" class="progress-circle"></div>
</template>

<script>
import Progress from 'progressbar.js';
export default {
  // we need these properties to render the progress bar.
  props: ['color', 'width', 'height', 'progress', 'name', 'trailColor'],

  // this returns an id with a hash. I'm going to explain because I found it funny. I was having difficulty setting display properties to multiple bars on the same page, and I realized it was because they were all targeting the same div for render. So, under this scheme, the id of the target div is passed to the object in the parent component under the property name. It MUST BE UNIQUE or you'll get render issues. 
  computed: {
    id() {
      return `#${this.name}`;
    },
    progressCircle() {
      return new Progress.Circle(this.id, {
        color: this.color,
        duration: 3000,
        easing: 'easeInOut',
        trailWidth: .8,
        trailColor:this.trailColor || "#87CEFA",
        strokeWidth: 8,
      });
    }
  },
  watch: {
    progress(val) {
      this.progressCircle.animate(val, {
        duration: 800
      });
      this.progressCircle.setText(`${Math.floor(val * 100)}%`);
    }
  },
  mounted() {
    // Some of our properties come from the parent, but the loader style will be roughly the same on every page, with the larger bar consuming a thin tail.
    this.progressCircle.setText(`${Math.floor(this.progress * 100)}%`);

    this.progressCircle.animate(this.progress);
  }
}
</script>

<style scoped>
</style>

