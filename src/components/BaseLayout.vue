<template>
  <div class="container">
    <header>
      <slot name="header">머릿글</slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer">바닥글</slot>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
