<template>
  <li
    class="dropdown dropdown-submenu"
    :class="{
      show: isOpen,
    }"
    @mouseenter="() => updateGroupOpen(true)"
    @mouseleave="() => updateGroupOpen(false)"
  >
    <b-link
      class="dropdown-item dropdown-toggle"
      :class="dashDir == 'rtl' ? 'right-menu-icon-h' : ''"
      href="#"
      @click="() => updateGroupOpen(!isOpen)"
    >
      <slot name="icon"></slot>
      <span class="menu-title">title</span>
    </b-link>
    <ul ref="refChildDropdown" class="dropdown-menu">
      <li class="">
        <b-link class="dropdown-item">
          <circle-icon size="1.5x" class="custom-class me-2"></circle-icon>
          <span class="menu-title">title</span>
        </b-link>
      </li>
    </ul>
  </li>
</template>

<script>
import { CircleIcon } from "vue-feather-icons";
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    updateGroupOpen(val) {
      this.isOpen = val;
    },
  },
  components: {
    CircleIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
