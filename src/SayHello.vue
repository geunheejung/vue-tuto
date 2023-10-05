<template functional>
  <div v-bind="data.attrs">
    Hello
    <slot />
  </div>
</template>

<script>
export default {
  created() {
    debugger;
  },
};
</script>

<style></style>
