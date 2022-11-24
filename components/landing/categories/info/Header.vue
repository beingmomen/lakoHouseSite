<template>
  <section id="ecommerce-header">
    <div class="row">
      <div class="col-sm-12">
        <div class="ecommerce-header-items">
          <div class="result-toggler">
            <menu-icon
              size="1.5x"
              class="d-block d-lg-none custom-class cursor-pointer"
              @click="changeProductsFiltersShow(true)"
            ></menu-icon>
            <div class="search-results fs-5">
              {{ productsOfCategoriesTotalItems }}
              {{ $t("cards.resultsFound") }}
            </div>
          </div>
          <div class="view-options d-flex">
            <!-- Item View Radio Button Group  -->
            <b-form-radio-group
              v-model="itemView"
              class="me-3 list item-view-radio-group list-view-style"
              buttons
              size="sm"
              button-variant="outline-primary"
            >
              <b-form-radio value="list-view">
                <list-icon size="1.5x" class="custom-class"></list-icon>
              </b-form-radio>
              <b-form-radio value="grid-view">
                <grid-icon size="1.5x" class="custom-class"></grid-icon>
              </b-form-radio>
            </b-form-radio-group>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { MenuIcon, GridIcon, ListIcon } from "vue-feather-icons";
export default {
  data() {
    return {
      itemView: "grid-view",
    };
  },
  methods: {
    changeProductsFiltersShow(data) {
      this.$store.dispatch("toggleProductsFilters", data);
    },
  },
  components: {
    MenuIcon,
    GridIcon,
    ListIcon,
  },
  watch: {
    itemView(newValue, oldValue) {
      this.$store.commit("setProductStyle", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
