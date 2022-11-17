<template>
  <div class="landing-page">
    <LandingSectionsHeroSection />
    <LandingSectionsCategoriesSection />
    <LandingSectionsItemSection />
    <LandingSectionsDiscountSection />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  async asyncData({ $axios, store, $toast }) {
    await $axios.$get(`/sliders?limit=1000`).then((res) => {
      store.dispatch("panel/sliders/getAllDataFromApi", res);
    });
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>
