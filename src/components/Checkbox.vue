<template>
  <div>
    <h1>체크박스 {{ isChecked ? "확인" : "미확인" }}</h1>
    <input
      type="checkbox"
      :value="value"
      :checked="checked"
      @change="handleChange"
    />
  </div>
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
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    handleChange() {
      this.isChecked = !this.isChecked;
      this.$emit("change");
    },
  },
};
</script>

<style></style>
