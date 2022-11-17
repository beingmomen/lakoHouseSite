<template>
  <div>
    <eye-icon
      v-if="visibility == 'password'"
      size="1.5x"
      class="custom-class cursor-pointer"
    ></eye-icon>
    <eye-off-icon
      v-else
      size="1.5x"
      class="custom-class cursor-pointer"
    ></eye-off-icon>
  </div>
</template>

<script>
import { EyeIcon, EyeOffIcon } from "vue-feather-icons";

export default {
  props: ["visibility"],
  components: {
    EyeIcon,
    EyeOffIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
