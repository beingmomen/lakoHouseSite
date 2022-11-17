<template>
  <div class="landing-page">
    <div class="app-content content ecommerce-application">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-body" v-if="$auth.loggedIn">
          <form-wizard
            v-if="getAllCheckout.length"
            ref="refFormWizard"
            color="#7367F0"
            :title="null"
            :subtitle="null"
            finish-button-text="Submit"
            back-button-text="Previous"
            hide-buttons
            class="checkout-form-wizard steps-transparent"
          >
            <!-- account detail tab -->
            <tab-content
              :title="$t('cards.cart')"
              icon="feather icon-shopping-cart"
            >
              <LandingCheckoutStepCart
                :module="module"
                @next-step="formWizardNextStep"
              />
            </tab-content>

            <!-- address -->
            <tab-content :title="$t('cards.address')" icon="feather icon-home">
              <LandingCheckoutStepAddress
                :module="module"
                @next-step="formWizardNextStep"
              />
            </tab-content>
          </form-wizard>

          <div class="d-flex align-items-center justify-content-center" v-else>
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_iszpuyas.json"
              class="lottie-container"
              background="transparent"
              speed=".5"
              style="width: 500px; height: 500px"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div class="content-body" v-else>
          <form-wizard
            v-if="getAllCheckoutLocal.length"
            ref="refFormWizard"
            color="#7367F0"
            :title="null"
            :subtitle="null"
            finish-button-text="Submit"
            back-button-text="Previous"
            hide-buttons
            class="checkout-form-wizard steps-transparent"
          >
            <!-- account detail tab -->
            <tab-content title="Cart" icon="feather icon-shopping-cart">
              <LandingCheckoutStepCart
                :module="module"
                @next-step="formWizardNextStep"
              />
            </tab-content>

            <!-- address -->
            <tab-content title="Address" icon="feather icon-home">
              <LandingCheckoutStepAddress
                :module="module"
                @next-step="formWizardNextStep"
              />
            </tab-content>
          </form-wizard>

          <div class="d-flex align-items-center justify-content-center" v-else>
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_iszpuyas.json"
              class="lottie-container"
              background="transparent"
              speed=".5"
              style="width: 500px; height: 500px"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
require("/@core/assets/fonts/feather/iconfont.css");
import { FormWizard, TabContent } from "vue-form-wizard";
export default {
  name: "checkout",
  async asyncData({ $axios, store, params }) {
    store.dispatch("landing/checkout/getAllProductsInCheckoutLocal");

    if (store.$auth.user) {
      const id = store.$auth.user._id;
      await $axios.$get(`/users/${id}/carts`).then((res) => {
        store.dispatch("landing/checkout/getAllProductsInCheckout", res);
      });
    }
    return {};
  },
  async mounted() {
    await this.$axios
      .$get(`https://api.countrystatecity.in/v1/countries`, {
        headers: {
          "X-CSCAPI-KEY":
            "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
        },
      })
      .then((res) => {
        this.$store.dispatch("global/updateCountriesList", res);
      });
  },
  data() {
    return {
      module: "landing/checkout",
    };
  },
  methods: {
    formWizardNextStep() {
      this.$refs.refFormWizard.nextTab();
    },
  },
  components: {
    FormWizard,
    TabContent,
  },
};
</script>

<style lang="scss" >
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/base/pages/app-ecommerce.scss";
@import "vue-form-wizard/dist/vue-form-wizard.min.css";
</style>
