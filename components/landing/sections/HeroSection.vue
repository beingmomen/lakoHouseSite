<template>
  <section v-if="images.length" class="landing-section position-relative">
    <VueSlickCarousel class="vue-slick-carousel-style" v-bind="settings">
      <img
        v-for="slide in images"
        :key="slide._id"
        class="w-100 h-100"
        :src="`${$config.NODE_URL_images}/sliders/${slide.imageCover}`"
        alt="one"
      />
    </VueSlickCarousel>
    <div class="overlay-section"></div>
  </section>
  <section v-else class="landing-section position-relative">
    <div class="d-flex align-items-center justify-content-start">
      <lottie-player
        src="https://assets8.lottiefiles.com/private_files/lf30_d63aevte.json"
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
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      settings: {
        arrows: false,
        dots: true,
        autoplay: true,
      },
    };
  },
  computed: {
    images() {
      return this.$store.getters[`panel/sliders/getAllData`];
    },
  },
  components: {
    VueSlickCarousel,
  },
};
</script>

<style lang="scss" scoped>
// .overlay-section {
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background: rgb(0, 0, 0);
//   background: linear-gradient(
//     0deg,
//     rgba(0, 0, 0, 0.2987570028011205) 0%,
//     rgba(0, 0, 0, 0.5088410364145659) 47%,
//     rgba(0, 0, 0, 0.5368522408963585) 100%
//   );
// }
</style>
