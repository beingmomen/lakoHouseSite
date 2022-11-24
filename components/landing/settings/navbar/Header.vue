<template>
  <div
    class="
      navbar
      header-navbar
      navbar-shadow
      align-items-center
      navbar-brand-center navbar-fixed navbar-light navbar-expand
    "
  >
    <div
      class="
        navbar-container
        d-flex
        content
        align-items-center
        justify-content-between
      "
      style="height: 80px"
    >
      <nuxt-link
        v-b-toggle.sidebar-1
        to=""
        class="nav-link modern-nav-toggle text-secondary d-xl-none"
      >
        <align-justify-icon size="1.5x" class="icon-style"></align-justify-icon>
      </nuxt-link>
      <div>
        <b-sidebar
          id="sidebar-1"
          shadow
          :right="dashDir == 'rtl'"
          no-header
          aria-label="Sidebar with custom footer"
          backdrop
        >
          <LandingSettingsSidebar />
        </b-sidebar>
      </div>
      <div class="navbar-header">
        <MainLogo style="width: 170px" />
      </div>
    </div>
  </div>
</template>

<script>
import { AlignJustifyIcon } from "vue-feather-icons";
export default {
  components: {
    AlignJustifyIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
