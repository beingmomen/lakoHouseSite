import Vue from "vue";

const mixins = {
  data() {
    return {
      passwordFieldType: "password",
    };
  },
  computed: {
    makeLayoutCollapsed() {
      return this.$store.getters["getLayoutCollapsed"];
    },
    toggleSidebar() {
      return this.$store.getters["getSidebar"];
    },
    dashboardMode() {
      return this.$store.getters["getMode"];
    },
    dashDir() {
      return this.$store.getters["getDashDir"];
    },
    productsFiltersShow() {
      return this.$store.getters["getProductsFilters"];
    },
  },

  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};

Vue.mixin(mixins);
