<template>
  <section class="landing-section container">
    <b-card-body class="product-style">
      <div class="mt-4 mb-2 text-center">
        <h2 class="h1">{{ $t("cards.related") }}</h2>
      </div>

      <VueSlickCarousel
        v-if="getData.length"
        class="offers-style mt-3"
        :rtl="dashDir == 'rtl' ? true : false"
        v-bind="settings"
      >
        <div
          class="slick-card card mt-2 position-relative"
          v-for="(offer, i) in getData"
          :key="i"
        >
          <b-link
            :to="
              localePath(
                `/categories/${offer.category.slug}-${offer.category._id}/product/${offer.slug}-${offer._id}`
              )
            "
            class="w-100 h-100 d-block"
          >
            <b-badge
              v-if="offer.discount"
              variant="danger"
              class="position-absolute badge"
            >
              <span>{{ offer.discount }}</span>
              <percent-icon size="1x" class="custom-class"></percent-icon>
            </b-badge>
            <div class="img-cont">
              <img
                class="slick-img card-img h-100"
                :src="`${$config.NODE_URL_images}/products/${offer.imageCover}`"
                loading="lazy"
                alt=""
              />
            </div>
            <h4 class="text-center text-black fw-bold mt-2">
              {{ dashDir == "rtl" ? offer.arabicName : offer.englishName }}
            </h4>
          </b-link>
        </div>
      </VueSlickCarousel>
    </b-card-body>
  </section>
</template>

<script>
import { PercentIcon } from "vue-feather-icons";
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
    getData() {
      return this.$store.getters["landing/products/related"];
    },
  },
  components: {
    VueSlickCarousel,
    PercentIcon,
  },
};
</script>

<style lang="scss" scoped>
.slick-card {
  height: 273px;
  cursor: pointer;
  .img-cont {
    overflow: hidden;
    height: 210px;
  }
}
.badge {
  top: 20px;
  border-radius: 2px;
  z-index: 1;
  &:dir(ltr) {
    left: 0px;
  }
  &:dir(rtl) {
    right: 0px;
    left: unset;
  }
}
</style>
