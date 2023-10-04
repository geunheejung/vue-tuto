<template>
  <ul>
    <li v-for="child in children" :key="child.name">
      <tree-folder v-if="child.children" :folder="child" />
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree-folder-contents",
  props: ["children"],
};
</script>

<style></style>
