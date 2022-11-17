<template>
  <section v-if="getData.length" class="landing-section container">
    <h2 class="fw-bold section-head">{{ $t("cards.exOurOffers") }}</h2>

    <VueSlickCarousel
      v-if="getData.length"
      class="offers-style mt-3"
      v-bind="settings"
    >
      <div
        class="slick-card mt-2 position-relative"
        v-for="(offer, i) in getData"
        :key="i"
      >
        <b-badge
          v-if="offer.discount"
          variant="danger"
          class="position-absolute badge"
        >
          <span>{{ offer.discount }}</span>
          <percent-icon size="1x" class="custom-class"></percent-icon>
        </b-badge>
        <img
          class="slick-img w-100"
          :src="`${$config.NODE_URL_images}/products/${offer.imageCover}`"
          alt=""
        />
        <h4 class="text-center text-black fw-bold mt-2">{{ offer.name }}</h4>
      </div>
    </VueSlickCarousel>
  </section>

  <section v-else class="landing-section container">
    <h2 class="fw-bold section-head">{{ $t("cards.exOurCategories") }}</h2>
    <div class="d-flex align-items-center justify-content-start">
      <lottie-player
        v-for="x in 2"
        :key="x"
        src="https://assets2.lottiefiles.com/packages/lf20_fydpgJ.json"
        class="lottie-container w-100"
        background="transparent"
        speed="1"
        style="width: 500px; height: 500px"
        loop
        autoplay
      ></lottie-player>
    </div>
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
      return this.$store.getters["landing/getTopProducts"];
    },
  },
  components: {
    VueSlickCarousel,
    PercentIcon,
  },
};
</script>

<style lang="scss" scoped>
.badge {
  top: 20px;
  border-radius: 2px;
  &:dir(ltr) {
    left: 0px;
  }
  &:dir(rtl) {
    right: 0px;
  }
}
</style>
