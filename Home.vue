<template>
  <div id="app">
    <navigation-link url="/profile"> Your Profile </navigation-link>
  </div>
</template>

<script>
import NavigationLink from "./src/components/NavigationLink.vue";
export default {
  name: "Home",
  components: {
    NavigationLink,
  },
};
</script>
