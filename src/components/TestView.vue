<template>
  <div key="test-view">
    <ul
      v-for="(item, index) in list"
      :key="`${item.value} - ${Math.random() * index}`"
    >
      <li>{{ item.value }}</li>

      <ul v-if="item.children">
        <li
          v-for="(subItem, index) in item.children"
          :key="`${subItem.value}-${Math.random() * index}`"
        >
          {{ subItem.value }}
          <template v-if="subItem.children">
            <test-item-view :list="subItem.children" />
          </template>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: "test-item-view",
  props: ["list"],
};
</script>

<style></style>
