<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mt-1 custom-form">
    <b-form-group>
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text>
          <slot name="icon"></slot>
        </b-input-group-prepend>
        <flat-pickr v-model="dateDefault" class="form-control" />
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
export default {
  props: {
    title: String,
    module: String,
    storeKey: String,
    required: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: String,
      default: "3",
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
        return this.$store.getters[`${this.module}/get${this.storeKey}`];
      },
      set(val) {
        this.$store.commit(`${this.module}/set${this.storeKey}`, {
          key: this.storeKey,
          value: val,
        });
      },
    },
  },
  components: {
    flatPickr,
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
