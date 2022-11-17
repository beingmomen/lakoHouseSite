<template>
  <div class="pb-1">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "errors",
  middleware: ["mode", "lang", "authentication"],
};
</script>

<style lang="scss">
</style>
