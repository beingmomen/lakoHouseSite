import Vue from "vue";

const mixins = {
  data() {
    return {};
  },
  computed: {
    getAllCategories() {
      return this.$store.getters["landing/getCategories"];
    },
    productsOfCategories() {
      return this.$store.getters["landing/products/getAllData"];
    },
    productsOfCategoriesTotalItems() {
      return this.$store.getters["landing/products/getTotalItems"];
    },
  },

  methods: {},
};

Vue.mixin(mixins);
