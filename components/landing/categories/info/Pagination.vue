<template>
  <section>
    <b-row>
      <b-col cols="12">
        <b-pagination
          v-model="page"
          :total-rows="productsOfCategoriesTotalItems"
          :per-page="perPage"
          first-number
          align="center"
          last-number
          prev-class="prev-item"
          next-class="next-item"
        >
          <template #prev-text>
            <chevron-left-icon
              size="1.5x"
              class="custom-class"
            ></chevron-left-icon>
          </template>
          <template #next-text>
            <chevron-right-icon
              size="1.5x"
              class="custom-class"
            ></chevron-right-icon>
          </template>
        </b-pagination>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  data() {
    return {
      page: 1,
      perPage: 9,
    };
  },
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  watch: {
    page(newValue, oldValue) {
      this.$store.commit(`${this.module}/page`, this.page);
      this.$emit("changePage");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
