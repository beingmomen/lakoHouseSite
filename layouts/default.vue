<template>
  <div
    v-if="loading"
    class="horizontal-layout horizontal-menu navbar-static footer-static"
  >
    <SettingsFonts />
    <LandingSettingsNavbar />
    <Nuxt />
    <LandingSettingsFooter />
  </div>
  <div
    class="card align-items-center justify-content-center"
    style="height: calc(100vh)"
    v-else
  >
    <lottie-player
      src="https://assets3.lottiefiles.com/packages/lf20_47pyyfcf.json"
      class="lottie-container"
      background="transparent"
      speed=".5"
      style="width: fit-content; height: 500px"
      loop
      autoplay
    ></lottie-player>
  </div>
</template>

<script>
export default {
  head() {
    return this.$nuxtI18nHead();
  },
  middleware: ["mode", "lang", "authentication"],
  name: "default",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/categories`).then((res) => {
      store.dispatch("landing/getAllCategories", res.data.dataPopulated);
    });
    await $axios
      .$get(`/products`, {
        params: {
          sort: "-discount",
          // discount: { $gte: 10 },
        },
      })
      .then((res) => {
        store.dispatch("landing/getTopProducts", res.data.data);
      });
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.loading = true;
    }, 2000);
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-ecommerce.scss";
@import "@core/scss/base/pages/app-ecommerce-details.scss";
</style>
