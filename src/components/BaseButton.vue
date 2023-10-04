<template>
  <button :class="['base-button', theme]">
    <slot name="content"> 버튼 </slot>
  </button>
</template>

<script>
export default {
  props: ["theme"],
};
</script>

<style></style>
