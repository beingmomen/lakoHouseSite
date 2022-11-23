<template>
  <!-- :class="{ 'sidebar-group-active active': isActive }" -->
  <li class="nav-item fs-4 sidebar-group-active">
    <b-link class="nav-link d-flex align-items-center" :to="localePath(route)">
      <slot name="icon"></slot>
      <span class="menu-title">{{ title }}</span>
    </b-link>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    route: String,
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  min-width: 130px;
}
</style>
