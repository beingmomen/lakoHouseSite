<template>
  <b-col :sm="sm" :md="md" :lg="lg" class="mt-1 custom-form">
    <b-form-group :class="{ 'custome-search-input': dashDir == 'rtl' }">
      <label v-if="title != 'hid'">{{ title }}</label>
      <b-input-group size="sm">
        <b-form-input
          id="filterInput"
          class="filter-input"
          v-model="search"
          type="search"
          :placeholder="$t('inputs.search')"
        />
        <b-input-group-append>
          <b-button :disabled="!search" @click="clear">
            {{ $t("buttons.clear") }}
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "hid",
    },
    storeKey: String,
    module: String,
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
  data() {
    return {
      search: null,
    };
  },
  methods: {
    clear() {
      this.search = null;
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
};
</script>

<style lang="scss" scoped>
</style>
