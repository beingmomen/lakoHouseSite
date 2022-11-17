<template>
  <li class="nav-item">
    <b-link class="nav-link">
      <moon-icon
        @click="toggleMode('dark')"
        v-if="dashboardMode"
        size="1.5x"
        class=""
      ></moon-icon>
      <sun-icon
        @click="toggleMode('light')"
        v-else
        size="1.5x"
        class=""
      ></sun-icon>
    </b-link>
  </li>
</template>

<script>
import { MoonIcon, SunIcon } from "vue-feather-icons";
export default {
  methods: {
    toggleMode(mode) {
      this.$store.dispatch("layoutMode", mode);
      this.$cookies.set("dashboard-mode", mode);
      if (mode == "dark") {
        document.body.classList.remove("light-layout");
        document.body.classList.add("dark-layout");
      } else {
        document.body.classList.remove("dark-layout");
        document.body.classList.add("light-layout");
      }
    },
  },
  components: {
    MoonIcon,
    SunIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
