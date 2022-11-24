<template>
  <div class="horizontal-menu-wrapper">
    <div
      class="
        header-navbar
        mx-2
        rounded-3
        navbar-expand-sm navbar navbar-horizontal navbar-light navbar-shadow
        menu-border
        d-none d-xl-block
      "
    >
      <div
        class="
          navbar-container
          main-menu-content
          d-flex
          justify-content-between
          align-items-star
        "
      >
        <ul id="main-menu-navigation" class="nav navbar-nav">
          <slot name="items"></slot>
        </ul>
        <ul class="navbar-nav nav align-items-center flex-nowrap">
          <slot name="user"></slot>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
