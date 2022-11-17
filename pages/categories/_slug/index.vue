<template>
  <div class="landing-page">
    <div class="app-content content ecommerce-application">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper clearfix">
        <div
          class="content-detached"
          :class="dashDir == 'ltr' ? 'content-right' : 'content-left'"
        >
          <div class="content-wrapper">
            <div class="content-body">
              <LandingCategoriesCardsSection
                :module="module"
                @changePage="searchByQuery"
                @changePriceRange="searchByQuery"
                @search="searchByQuery"
              />
            </div>
          </div>
        </div>
        <LandingCategoriesInfoFilters
          class="all-height-filter"
          :module="module"
          @changePriceRange="searchByQuery"
          @filterByColor="searchByQuery"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "slug",
  async asyncData({ $axios, store, params }) {
    const id = params.slug.split("-").at(-1);
    const slug = params.slug.split("-");
    if (store.$auth.user) {
      await $axios.$get(`/users/${store.$auth.user._id}/carts`).then((res) => {
        store.dispatch("landing/checkout/getAllProductsInCheckout", res);
      });
    }
    await $axios
      .$get(`/categories/${id}/products`, {
        params: {
          limit: 9,
          sort: "-createdAt",
        },
      })
      .then((res) => {
        store.dispatch("landing/products/getAllDataFromApi", res);
      });
    await $axios
      .$get(`/categories/${id}/products`, {
        params: {
          limit: 1,
          sort: "-price",
        },
      })
      .then((res) => {
        store.dispatch("landing/products/getTopProductPrice", res);
      });
    return {
      id,
      slug,
    };
  },
  data() {
    return {
      module: "landing/products",
    };
  },
  methods: {
    searchByQuery() {
      this.$store.dispatch(`${this.module}/getDataByQuery`, this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
