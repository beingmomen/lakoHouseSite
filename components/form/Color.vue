<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mb-1 custom-form">
    <LvColorpicker
      :label="label"
      v-model="getContent"
      :colors="list"
      clearable
    />
  </b-col>
</template>

<script>
import LvColorpicker from "lightvue/color-picker";
export default {
  props: {
    label: String,
    module: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    rule: {
      type: String,
      default: "required",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: String,
      default: "6",
    },
    md: {
      type: String,
      default: "6",
    },
    sm: {
      type: String,
      default: "12",
    },
  },
  computed: {
    getContent: {
      get: function () {
        return this.$store.getters[`${this.module}/${this.storeKey}`];
      },
      set(val) {
        this.$store.commit(`${this.module}/${this.storeKey}`, {
          key: this.storeKey,
          value: val,
        });
      },
    },
    list() {
      return this.$store.getters["global/colorsList"];
    },
  },
  components: {
    LvColorpicker: LvColorpicker,
  },
};
</script>

<style lang="scss" scoped>
</style>
