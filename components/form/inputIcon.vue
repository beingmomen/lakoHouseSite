<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mb-1 custom-form">
    <b-form-group :label-class="{ 'label-required': required }" :label="label">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text style="height: 35px">
          <slot name="icon"></slot>
          <span v-if="phoneCode" style="margin-inline-start: 10px">
            ( {{ getPhoneCode }} )
          </span>
        </b-input-group-prepend>
        <b-form-input
          style="height: 35px"
          autocomplete="off"
          :placeholder="label"
          v-model="getContent"
          :disabled="disabled"
          :type="type"
        />
        <slot name="pass"></slot>
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    label: String,
    module: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false,
    },
    phoneCode: {
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
    getPhoneCode() {
      return this.$store.getters[`${this.module}/phoneCode`];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
