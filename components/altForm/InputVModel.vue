<template>
  <b-col lg="3" md="6" sm="12" class="mb-1 custom-form">
    <b-form-group>
      <label :class="required ? 'required' : ''"> {{ label }}</label>
      <!-- <b-form-input :value="value" @input="handleInput($event.target.value)" /> -->
      <input
        type="text"
        class="form-control"
        :value="value"
        @input="handleInput($event.target.value)"
      />
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.warn("required :::", this.required);
  },
  data() {
    return {};
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
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
