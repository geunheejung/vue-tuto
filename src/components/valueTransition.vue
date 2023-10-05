<template>
  <div>
    <input v-model.number="number" type="number" step="20" />
    <p>{{ animatedNumber }}</p>
    <input
      v-model="colorQuery"
      v-on:keyup.enter="updateColor"
      placeholder="Enter a color"
    />
    <button v-on:click="updateColor">Update</button>
    <p>Preview:</p>
    <span
      v-bind:style="{ backgroundColor: tweenedCSSColor }"
      class="example-7-color-preview"
    ></span>
    <p>{{ tweenedCSSColor }}</p>
  </div>
</template>

<script>
var Color = net.brehaut.Color;
export default {
  data() {
    return {
      number: 0,
      tweenedNumber: 0,
      colorQuery: "",
      color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
      },
      tweenedColor: {},
    };
  },
  created: function () {
    this.tweenedColor = Object.assign({}, this.color);
  },

  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
    tweenedCSSColor: function () {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha,
      }).toCSS();
    },
  },
  watch: {
    number(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
    },
    color: function () {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween(this.tweenedColor).to(this.color, 750).start();

      animate();
    },
  },
  methods: {
    updateColor: function () {
      this.color = new Color(this.colorQuery).toRGB();
      this.colorQuery = "";
    },
  },
};
</script>

<style>
.example-7-color-preview {
  display: inline-block;
  width: 50px;
  height: 50px;
}
</style>
