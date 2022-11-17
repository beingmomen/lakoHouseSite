<template>
  <li
    class="dropdown nav-item"
    :class="{
      show: isOpen,
    }"
    @mouseenter="() => updateGroupOpen(true)"
    @mouseleave="() => updateGroupOpen(false)"
  >
    <slot name="content"></slot>
  </li>
</template>

<script>
import { SettingsIcon } from "vue-feather-icons";
export default {
  props: {
    title: String,
    children: [Array, Object],
  },

  data() {
    return {
      isOpen: false,
    };
  },

  components: {
    SettingsIcon,
  },

  methods: {
    updateGroupOpen(val) {
      this.isOpen = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
