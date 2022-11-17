<template>
  <li class="navigation-header text-truncate text-start mx-2">
    <span>{{ title }}</span>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: `Apps &amp; Pages`,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
