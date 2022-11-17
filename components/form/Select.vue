<template>
  <b-col :lg="lg" :md="md" :sm="sm" class="mb-1 custom-form">
    <!-- class="mt-1" -->
    <b-form-group :label-class="{ 'label-required': required }" :label="label">
      <b-input-group class="input-group-merge">
        <b-input-group-prepend is-text class="h-35 w-13">
          <slot name="icon"></slot>
        </b-input-group-prepend>
        <v-select
          class="h-35 w-87"
          v-model="getContent"
          :reduce="(item) => (notId ? item : item.id)"
          :label="labelSelect"
          :dir="dashDir"
          :multiple="multiple"
          :clearable="clearable"
          :options="listKey ? getAutoList : allData"
          :disabled="disabled"
          :placeholder="placeHolder"
          @input="changeData($event)"
        >
          <!-- <template v-if="img" #option="{ name, flag }">
            <img
              style="width: 21px; height: 21px; margin-inline-end: 15.4px"
              :src="flag"
            />
            <span> {{ name }}</span>
          </template> -->
          <template v-if="img" #option="{ color }">
            <div class="d-flex justify-content-start">
              <div class="show-color" :style="{ backgroundColor: color }"></div>
              <span class="ms-4"> {{ color }}</span>
            </div>
          </template>
        </v-select>
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    storeKey: String,
    allData: Array,
    module: String,
    listKey: String,
    labelSelect: {
      type: String,
      default: "name",
    },
    placeHolder: {
      type: String,
      default: `Select`,
    },
    img: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    global: {
      type: Boolean,
      default: false,
    },
    change: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notId: {
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
  data() {
    return {};
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
    getAutoList() {
      if (this.global) {
        return this.$store.getters[`global/${this.listKey}`];
      } else {
        return this.$store.getters[`${this.module}/${this.listKey}`];
      }
    },
  },
  methods: {
    changeData(data) {
      if (this.change) {
        this.$store.dispatch(`${this.module}/${this.storeKey}Change`, data);
      }
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
