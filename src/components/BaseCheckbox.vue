<template>
  <div>
    <input
      type="checkbox"
      id="check"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />

    <label for="check">동의</label>
  </div>
</template>

<script>
export default {
  model: {
    prop: "checked", // prop으로 내려오는 checked를 value로 지정하고
    event: "change", // event는 change 이벤트?
  },
  props: {
    checked: Boolean,
  },
};
</script>

<style></style>
