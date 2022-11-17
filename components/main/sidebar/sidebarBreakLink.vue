<template>
  <li class="navigation-header text-truncate">
    <span>{{ $t("sidebar.apps") }} &amp; {{ $t("sidebar.pages") }}</span>
    <more-horizontal-icon
      size="1.5x"
      class="custom-class"
    ></more-horizontal-icon>
  </li>
</template>

<script>
import { MoreHorizontalIcon } from "vue-feather-icons";
export default {
  components: {
    MoreHorizontalIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
