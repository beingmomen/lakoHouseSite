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
          :key="category._id + 'cat'"
          :title="dashDir == 'rtl' ? category.arabicName : category.englishName"
          lazy
        >
          <VueSlickCarousel
            v-if="category.products.length"
            class=""
            :rtl="dashDir == 'rtl' ? true : false"
            v-bind="settings"
          >
            <div
              class="slick-card card mt-2"
              v-for="(prod, i) in category.products"
              :key="i"
            >
              <b-link
                :to="
                  localePath(
                    `/categories/${category.slug}-${category._id}/product/${prod.slug}-${prod._id}`
                  )
                "
                class="w-100 h-100 d-block"
              >
                <div class="img-cont">
                  <img
                    class="slick-img card-img h-100"
                    :src="`${$config.NODE_URL_images}/products/${prod.imageCover}`"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <h4 class="text-center text-black fw-bold mt-1">
                  {{ dashDir == "rtl" ? prod.arabicName : prod.englishName }}
                </h4>
              </b-link>
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
.slick-card {
  height: 273px;
  cursor: pointer;
  .img-cont {
    overflow: hidden;
    height: 210px;
  }
}
</style>
