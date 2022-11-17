<template>
  <footer class="footer footer-light footer-static">
    <div class="mb-0 d-flex justify-content-between">
      <p>
        <span class="d-none d-sm-inline-block">{{ $t("footer.all") }}</span>
        <span class="d-block d-md-inline-block">
          {{ $t("footer.copyright") }}
          <nuxt-link to="" rel="noopener" target="_blank" class="ml-25">
            {{ $t("footer.link") }}
          </nuxt-link>
        </span>
      </p>
      <p>
        {{ $t("footer.end") }}
        <heart-icon size="1.5x" class="custom-class"></heart-icon>
      </p>
    </div>
    <!-- <p class="clearfix mb-0">
      <span class="d-none d-sm-inline-block">{{ $t("footer.all") }}</span>
      <span class="float-md-right d-block d-md-inline-block mt-25">
        {{ $t("footer.copyright") }}
        <nuxt-link to="" rel="noopener" target="_blank" class="ml-25">
          {{ $t("footer.link") }}
        </nuxt-link>
      </span>
      <span class="float-md-right d-none d-md-block">
        {{ $t("footer.end") }}
        <heart-icon size="1.5x" class="custom-class"></heart-icon>
      </span>
    </p> -->
  </footer>
</template>

<script>
import { HeartIcon } from "vue-feather-icons";

export default {
  components: {
    HeartIcon,
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 1199.98px) {
  .footer {
    margin-left: 0 !important;
  }
}
</style>
