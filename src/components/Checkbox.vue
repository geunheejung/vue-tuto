<template>
  <input
    type="checkbox"
    :value="value"
    :checked="checked"
    @change="$emit('change')"
  />
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    // 다른 목적을 위해 'value' prop을 사용할 수 있다. v-model에 의해 주입되는.
    checked: Boolean,
    value: String,
  },
};
</script>

<style></style>
