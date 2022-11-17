<template>
  <footer>
    <LandingSectionsMessageSection />
    <div :class="dashboardMode ? 'footer-bg' : 'footer-bg-dark'">
      <div class="container py-2">
        <p class="fs-3 mb-0 text-center footer-text">
          &copy; Copyright 2022 | All Rights Reserved | Lakohouse
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-text {
  @media (max-width: 540px) {
    font-size: 18px !important;
  }
}
</style>
