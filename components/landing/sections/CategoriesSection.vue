<template>
  <section v-if="getData.length" class="landing-section container">
    <h2 class="fw-bold section-head">{{ $t("cards.exOurCategories") }}</h2>

    <b-row class="mt-3 justify-content-center">
      <b-col
        class="mb-3"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(x, i) in getData"
        :key="i"
      >
        <div class="card">
          <b-link :to="localePath(`/categories/${x.slug}-${x._id}`)">
            <img
              class="card-img"
              :src="`${$config.NODE_URL_images}/categories/${x.image}`"
              alt=""
            />
          </b-link>
        </div>
        <h3 class="fw-bold text-center">
          {{ dashDir == "rtl" ? x.arabicName : x.englishName }}
        </h3>
      </b-col>
    </b-row>
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
export default {
  computed: {
    getData() {
      return this.$store.getters["landing/getCategories"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
