<template>
  <div class="" :class="dashboardMode ? 'items-bg' : 'items-bg-dark'">
    <section v-if="getData.length" class="landing-section container mb-0 py-4">
      <h2 class="fw-bold section-head">{{ $t("cards.exOurItems") }}</h2>

      <b-tabs
        v-if="getData.length"
        class="mt-3 section-tabs-style"
        content-class="mt-1"
      >
        <b-tab
          v-for="category in getData"
          :key="category._id"
          :title="category.name"
          lazy
        >
          <VueSlickCarousel
            v-if="category.products.length"
            class=""
            v-bind="settings"
          >
            <div
              class="slick-card mt-2"
              v-for="(prod, i) in category.products"
              :key="i"
            >
              <img
                class="slick-img"
                :src="`${$config.NODE_URL_images}/products/${prod.imageCover}`"
                alt=""
              />
              <h4 class="text-center text-black fw-bold mt-2">
                {{ prod.name }}
              </h4>
            </div>
          </VueSlickCarousel>
        </b-tab>
      </b-tabs>
    </section>
    <section v-else class="landing-section container mb-0 py-4">
      <h2 class="fw-bold section-head">{{ $t("cards.exOurItems") }}</h2>
      <div class="d-flex align-items-center justify-content-start">
        <lottie-player
          src="https://assets7.lottiefiles.com/packages/lf20_iscsV9.json"
          class="lottie-container w-100"
          background="transparent"
          speed="1"
          style="width: 500px; height: 500px"
          loop
          autoplay
        ></lottie-player>
      </div>
    </section>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      settings: {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    getData() {
      return this.$store.getters["landing/getCategories"];
    },
  },
  components: {
    VueSlickCarousel,
  },
};
</script>

<style lang="scss" scoped>
</style>
