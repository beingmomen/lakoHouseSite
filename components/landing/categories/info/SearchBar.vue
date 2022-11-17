<template>
  <div class="ecommerce-searchbar mt-1">
    <b-row>
      <b-col cols="12">
        <b-input-group class="input-group-merge">
          <b-form-input
            v-model="search"
            :placeholder="$t('inputs.searchProduct')"
            class="search-product rounded-3"
          />
          <b-input-group-append is-text class="cursor-pointer">
            <search-icon
              @click="searchProd"
              size="1.5x"
              class="custom-class cursor-pointer"
            ></search-icon>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { SearchIcon } from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  data() {
    return {
      search: null,
    };
  },
  methods: {
    searchProd() {
      this.$store.commit(`${this.module}/search`, this.search);
      this.$emit("search");
    },
  },
  components: {
    SearchIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
