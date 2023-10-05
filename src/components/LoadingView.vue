<template>
  <div>
    <span v-if="this.getContext.user.isAuth"> Done! </span>
    <span v-else> Loading... </span>
  </div>
</template>

<script>
export default {
  inject: ["getContext"],
};
</script>

<style></style>
