<template>
  <ul>
    <slot name="slotName" v-for="item in items" :text="item.text">
      <!-- 대체 컨텐츠 -->
    </slot>
  </ul>
</template>

<script>
export default {
  props: ["items"],
};
</script>

<style></style>
