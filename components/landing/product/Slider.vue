<template>
  <section class="landing-section">
    <b-card-body class="product-style">
      <div class="mt-4 mb-2 text-center">
        <h4>Related Products</h4>
        <b-card-text>People also search for this items</b-card-text>
      </div>

      <!-- Swiper -->
      <VueSlickCarousel v-bind="settings">
        <div
          class="slick-card mt-2"
          v-for="(prod, i) in product.images"
          :key="i"
        >
          <img
            class="slick-img"
            :src="`${$config.NODE_URL_images}/products/${prod}`"
            alt=""
          />
          <!-- <h4 class="text-center text-black fw-bold mt-2">
                {{ prod.name }}
              </h4> -->
        </div>
      </VueSlickCarousel>
    </b-card-body>
  </section>
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
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
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
    product() {
      return this.$store.getters["landing/products/singleData"];
    },
  },
  components: {
    VueSlickCarousel,
  },
};
</script>

<style lang="scss" scoped>
</style>
