<template>
  <div :id="name" :style="{height: `${height}px`, width: `${width}px`}"></div>
</template>

<script>
import ProgressBar from 'progressbar.js';
export default {
  // we need these properties to render the progress bar.
  props: ['width', 'height', 'name'],

  // this returns an id with a hash. I'm going to explain because I found it funny. I was having difficulty setting display properties to multiple bars on the same page, and I realized it was because they were all targeting the same div for render. So, under this scheme, the id of the target div is passed to the object in the parent component under the property name. It MUST BE UNIQUE or you'll get render issues. 
  computed: {
    id() {
      return `#${this.name}`
    }
  },
  mounted() {

    var Shape = ProgressBar.Shape;
    var utils = ProgressBar.utils;

    var Triangle = function Triangle(container, options) {
        this._pathTemplate = 'M 50,{center} L 100,{bottomCenter}' +
                            ' L 0,{bottomCenter} L 50,{center}';
        Shape.apply(this, arguments);
    };

    Triangle.prototype = new Shape();
    Triangle.prototype.constructor = Triangle;

    Triangle.prototype._pathString = function _pathString(opts) {
        return utils.render(this._pathTemplate, {
            center: opts.strokeWidth / 2,
            bottomCenter: 100 - opts.strokeWidth / 2
        });
    };

    Triangle.prototype._trailString = function _trailString(opts) {
        return this._pathString(opts);
    };
    
    const ErrorAlert = new Triangle(this.id, {
      color: "#ff0000",
      strokeWidth: 3,
      duration: 2000
    });
    ErrorAlert.setText("<h1 style='padding-top:25px'>!</h1>");
    ErrorAlert.animate(1);
  }
}
</script>

<style scoped>
</style>
