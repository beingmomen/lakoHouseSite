
<template>
  <b-card-code class="border border-2" title="Repeating Forms">
    <div>
      <b-form ref="form" class="repeater-form">
        <!-- Row Loop -->
        <slot name="repeated"></slot>
      </b-form>
    </div>
    <div class="d-flex justify-content-between">
      <b-button variant="primary" @click="$emit('repeat')">
        <plus-icon size="1.5x" class="custom-class"></plus-icon>
        <span>Add New</span>
      </b-button>
      <b-button variant="success" @click="$emit('confirm')">
        <check-icon size="1.5x" class="custom-class"></check-icon>
        <span>Confirm</span>
      </b-button>
    </div>
  </b-card-code>
</template>
<script>
import BCardCode from "~/@core/components/b-card-code";
import { PlusIcon, CheckIcon } from "vue-feather-icons";

export default {
  components: {
    PlusIcon,
    CheckIcon,
    BCardCode,
  },
};
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: 0.35s height;
}
</style>
