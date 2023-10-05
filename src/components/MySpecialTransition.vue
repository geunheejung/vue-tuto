<template>
  <div>
    <transition
      name="very-special-transition"
      mode="out-in"
      v-on:before-enter="beforeEnter"
      v-on:after-enter="afterEnter"
    >
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    beforeEnter(el) {},
    afterEnter(el) {},
  },
};
</script>

<style></style>
