<template>
  <section v-if="getData.length" class="landing-section container">
    <h2 class="fw-bold section-head">{{ $t("cards.exOurOffers") }}</h2>

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
