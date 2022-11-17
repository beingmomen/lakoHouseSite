import Vue from "vue";

const mixins = {
  data() {
    return {};
  },
  computed: {
    getAllCheckoutLocal() {
      return this.$store.getters["landing/checkout/checkoutDataLocal"];
    },
    getAllCheckout() {
      return this.$store.getters["landing/checkout/checkoutData"];
    },
  },

  methods: {},
};

Vue.mixin(mixins);
