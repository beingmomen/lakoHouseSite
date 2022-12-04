<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-link :to="localePath('/')" class="brand-logo">
        <MainLogo style="width: 160px" />
      </b-link>

      <b-col lg="7" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img
            fluid
            :src="require(`@/assets/images/pages/${img}`)"
            alt="Register V2"
          />
        </div>
      </b-col>
      <b-col lg="5" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title
            title-tag="h2"
            class="font-weight-bold fs-3 fw-bold mb-1"
          >
            {{ welcome }}
          </b-card-title>
          <b-card-text class="mb-2 fs-4">
            {{ please }}
          </b-card-text>
          <b-form class="mt-2" @submit.prevent="addDataToDB">
            <b-row>
              <slot name="auth"></slot>
            </b-row>

            <div v-if="forget" class="d-flex justify-content-between">
              <b-link :to="localePath('/auth/forgot-password')">
                <small class="fs-5">{{ $t("inputs.forget") }}</small>
              </b-link>
            </div>
            <b-button
              :disabled="disabled"
              type="submit"
              class="mt-3 fs-4"
              variant="primary"
              block
            >
              {{ btn }}
            </b-button>
          </b-form>
          <p class="text-center mt-2">
            <span class="fs-4">{{ first }}</span>
            <b-link :to="localePath(url)">
              <span class="fs-4">&nbsp; {{ second }}</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    module: String,
    img: String,
    welcome: String,
    please: String,
    first: String,
    second: String,
    url: String,
    btn: String,
    forget: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    addDataToDB() {
      this.disabled = true;
      this.$store
        .dispatch(`${this.module}/submit`)
        .then(() => {
          this.disabled = false;
        })
        .catch(() => {
          this.disabled = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
