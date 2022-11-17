<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mb-1 custom-form">
    <b-form-group :label-class="{ 'label-required': required }" :label="label">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <slot name="icon"></slot>
        </b-input-group-prepend>
        <b-form-input
          style="height: 35px"
          v-model="getContent"
          type="text"
          placeholder="YYYY-MM-DD"
          autocomplete="off"
          show-decade-nav
        />
        <b-input-group-append style="height: 35px">
          <b-form-datepicker
            v-model="getContent"
            show-decade-nav
            button-only
            right
            locale="en-US"
            aria-controls="example-input"
            @context="onContext"
          />
        </b-input-group-append>
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
  },
  methods: {
    onContext() {},
  },
};
</script>

<style lang="scss" scoped>
.required {
  position: relative;
  &::after {
    position: absolute;
    content: "*";
    font-size: 25px;
    bottom: -6px;
    left: -10px;
    color: #ea5455;
  }
}
</style>
