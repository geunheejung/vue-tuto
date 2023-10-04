<template>
  <a v-bind:href="url" class="nav-link">
    <slot></slot>
  </a>
</template>
<script>
export default {
  props: {
    url: String,
  },
};
</script>
