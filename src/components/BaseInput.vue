<template>
  <label>
    {{ label }}
    <!-- <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      v-on:focus.native="onFocus"
    /> -->
    <input v-bind="$attrs" v-bind:value="value" v-on="inputListeners" />
    <pre>
      {{ this.$listeners }}
    </pre>
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["label", "value"],
  computed: {
    inputListeners() {
      let vm = this;

      // 현재 적용된ㄹ ㅣ스너들.
      console.log("this.$listeners->", this.$listeners);

      return {
        // 부모 엘리먼트의 모든 리스너를 추가한다/
        ...this.$listeners,
        // 기존 리스너를 오버라이드하는 커스텀 리스너를 추가할 수 있다.
        // v-model과 동일하게 동작.
        input(event) {
          vm.$emit("input", event.target.value);
        },
        focus(event) {
          console.log("qq");
        },
      };
    },
  },
  methods: {
    onFocus(e) {
      // .native 접미사 붙을 시 트리거 되지 않음.
      console.log("base-input focus", e);
    },
  },
};
</script>

<style></style>
