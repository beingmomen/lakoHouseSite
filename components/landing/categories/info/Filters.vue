<template>
  <div class="sidebar-detached text-start sidebar-left">
    <div class="sidebar">
      <div class="sidebar-shop" :class="{ show: productsFiltersShow }">
        <b-row>
          <b-col cols="12">
            <!-- <h6 class="filter-heading d-none d-lg-block">Filters</h6> -->
          </b-col>
        </b-row>

        <!-- Filters' Card -->
        <b-card>
          <div class="categories">
            <h6 class="filter-title fs-4 fw-bold mt-0">
              {{ $t("sidebar.categories") }}
            </h6>
            <p v-for="cat in getAllCategories" :key="cat._id">
              <b-link
                :to="localePath(`/categories/${cat.slug}-${cat._id}`)"
                class="text-secondary fs-5 ms-3"
                >{{ cat.name }}</b-link
              >
            </p>
          </div>

          <!-- Price Slider -->
          <div class="price-slider">
            <h6 class="filter-title fs-4 fw-bold">{{ $t("cards.price") }}</h6>
            <vue-slider
              v-model="priceRange"
              :min="0"
              :max="getTopProductPrice"
              :direction="dashDir"
              :disabled="!getTopProductPrice"
              @drag-end="changePriceRange"
            />

            <b-button
              variant="primary"
              class="mt-2 fs-5"
              @click="resetPriceRange"
            >
              {{ $t("buttons.reset") }}
            </b-button>
          </div>

          <!-- Categories -->
          <div class="product-colors">
            <h6 class="filter-title fs-4 fw-bold">{{ $t("cards.colors") }}</h6>
            <b-form-radio-group
              v-model="color"
              class="
                colors-radio-group
                mb-1
                d-fle
                flex-wrap
                justify-content-between
              "
              stacked
            >
              <b-form-radio
                v-for="(x, i) in colors"
                class="mb-1"
                :key="i"
                :value="x._id"
              >
                <p
                  class="show-color mb-0 ms-3"
                  :style="{ backgroundColor: x.color }"
                ></p>
              </b-form-radio>
            </b-form-radio-group>

            <b-button variant="primary" class="mt-2 fs-5" @click="resetColor">
              {{ $t("buttons.reset") }}
            </b-button>
          </div>
        </b-card>
      </div>
    </div>

    <div
      class="body-content-overlay"
      :class="{ show: productsFiltersShow }"
      @click="changeProductsFiltersShow(false)"
    ></div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

export default {
  props: {
    module: String,
  },
  data() {
    return {
      priceRange: 0,
      color: null,
    };
  },
  computed: {
    getTopProductPrice() {
      let value = this.$store.getters["landing/products/getTopProductPrice"];
      return value;
    },
    colors() {
      return this.$store.getters["global/colorsList"];
    },
  },
  methods: {
    changeProductsFiltersShow(data) {
      this.$store.dispatch("toggleProductsFilters", data);
    },
    changePriceRange() {
      this.$store.commit(`${this.module}/priceRange`, this.priceRange);
      this.$emit("changePriceRange");
    },
    resetPriceRange() {
      this.priceRange = 0;
      this.changePriceRange();
    },
    resetColor() {
      this.color = null;
    },
  },
  components: {
    VueSlider,
  },
  watch: {
    color(newValue, oldValue) {
      this.$store.commit(`${this.module}/color`, newValue);
      this.$emit("filterByColor");
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  .nuxt-link-exact-active {
    color: #7367f0 !important;
  }
}
</style>
