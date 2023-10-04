<template>
  <div>
    <input
      ref="input"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    updateValue: function (value) {
      var formattedValue = value
        // 공백을 제거합니다.
        .trim()
        // 소수 자릿수 2자리로 줄입니다
        .slice(
          0,
          value.indexOf(".") === -1 ? value.length : value.indexOf(".") + 3
        );
      // 값이 아직 정규화 되지 않은 경우
      // 이를 수동으로 재정의하여 조건을 충족시킵니다.
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
      }
      // 입력 이벤트를 통해 숫자 값을 내보냅니다.
      this.$emit("input", Number(formattedValue));
    },
  },
  mounted() {},
};
</script>

<style></style>
