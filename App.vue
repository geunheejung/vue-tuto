<template>
  <div>{{ greeting }}</div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      greeting: "hello",
    };
  },
});
</script>

<style></style>
