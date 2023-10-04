<template>
  <p>
    <span>{{ folder.name }}</span>
    <tree-folder-contents :children="folder.children" />
  </p>
</template>

<script>
import TreeFolderContents from "./tree-folder-contents.vue";
export default {
  name: "tree-folder",
  props: ["folder"],
  beforeCreate: function () {
    this.$options.components.TreeFolderContents = import(
      "./tree-folder-contents.vue"
    );
  },
  components: { TreeFolderContents },
};
</script>

<style></style>
