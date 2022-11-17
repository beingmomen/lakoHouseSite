<template>
  <div style="height: inherit">
    <!-- ECommerce Header -->
    <LandingCategoriesInfoHeader />

    <!-- Overlay -->
    <div class="body-content-overlay"></div>

    <!-- Searchbar -->
    <LandingCategoriesInfoSearchBar
      :module="module"
      @search="$emit('search')"
    />

    <!-- Prodcuts -->
    <LandingCategoriesInfoProducts
      v-if="productsOfCategories.length"
      :module="module"
    />

    <!-- Pagination -->
    <LandingCategoriesInfoPagination
      v-if="productsOfCategories.length"
      :module="module"
      @changePage="$emit('changePage')"
    />
    <div class="d-flex align-items-center justify-content-center" v-else>
      <lottie-player
        src="https://assets10.lottiefiles.com/packages/lf20_wnqlfojb.json"
        class="lottie-container"
        background="transparent"
        speed=".5"
        style="width: 500px; height: 500px"
        loop
        autoplay
      ></lottie-player>
    </div>

    <!-- Sidebar -->
    <div class="v-portal d-block d-lg-none">
      <LandingCategoriesInfoFilters
        :module="module"
        @changePriceRange="$emit('changePriceRange')"
        @filterByColor="$emit('filterByColor')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    module: String,
  },
};
</script>

<style lang="scss" scoped>
</style>
