<template>
  <img
    v-if="dashboardMode"
    class="my-logo"
    src="/img/lako-svg.svg"
    alt="logo"
  />
  <img v-else class="my-logo" src="/img/lako-dark-svg.svg" alt="logo" />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
