<template>
  <div id="dynamic-fade-demo" class="demo">
    Fade In:
    <input
      type="range"
      v-model="fadeInDuration"
      min="0"
      v-bind:max="maxFadeDuration"
    />
    Fade Out:
    <input
      type="range"
      v-model="fadeOutDuration"
      min="0"
      v-bind:max="maxFadeDuration"
    />
    <transition
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <p v-if="show">hello</p>
    </transition>
    <button
      v-if="stop"
      v-on:click="
        stop = false;
        show = false;
      "
    >
      Start animating
    </button>
    <button v-else v-on:click="stop = true">Stop it!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true,
    };
  },
  mounted: function () {
    this.show = false;
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0;
    },
    enter: function (el, done) {
      var vm = this;
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function () {
            done();
            // 여기서 애니메이션 효과를 줌.
            if (!vm.stop) vm.show = false;
          },
        }
      );
    },
    leave: function (el, done) {
      var vm = this;
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function () {
            done();
            vm.show = true;
          },
        }
      );
    },
  },
};
</script>

<style></style>
