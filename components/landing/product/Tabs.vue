<template>
  <b-card-body class="details-tabs">
    <b-tabs content-class="mt-1">
      <b-tab class="fs-3" :title="$t('cards.dimensions')" lazy>
        <div class="dimensions-radio" v-if="product.dimensions.length">
          <b-form-radio
            v-for="(dim, i) in product.dimensions"
            :key="i"
            v-model="selected"
            plain
            name="some-radios3"
            :value="dim"
          >
            <p class="fw-bold">
              <!-- {{ $t("cards.dimension") }}: -->
              <span class="fw-normal d-flex">
                <div v-if="dashDir == 'rtl'" class="ms-3">
                  <p
                    v-for="(x, i) in dim.arabicDimension.split('\r\n')"
                    :key="i"
                  >
                    {{ x }}
                  </p>
                </div>
                <div v-else>
                  <p
                    v-for="(x, i) in dim.englishDimension.split('\r\n')"
                    :key="i"
                  >
                    {{ x }}
                  </p>
                </div>
                <span class="fw-bold ms-5">
                  {{ dashDir == "rtl" ? "⬅️ " : "➡️ " }} {{ dim.price }} E£
                </span>
              </span>
            </p>
          </b-form-radio>
        </div>
      </b-tab>

      <b-tab :title="$t('cards.description')" lazy>
        <section
          class="desc-section"
          v-if="dashDir == 'rtl'"
          v-html="product.arabicDescription"
        ></section>
        <section
          class="desc-section"
          v-if="dashDir == 'ltr'"
          v-html="product.englishDescription"
        ></section>
      </b-tab>
    </b-tabs>
  </b-card-body>
</template>

<script>
import LvRadioGroup from "lightvue/radio-group";

export default {
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    product() {
      const data = this.$store.getters["landing/products/singleData"];
      this.selected = data.dimensions[0];
      return data;
    },
  },
  components: {
    LvRadioGroup,
  },
  watch: {
    selected(newValue, oldValue) {
      this.$emit("selectedDimension", newValue);
      // console.warn("newValue", newValue);
    },
  },
};
</script>

<style lang="scss">
.desc-section {
  padding-inline-start: 60px;
}
.lv-demo_layout {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.details-tabs {
  li {
    a {
      font-size: 18px;
      font-weight: bold;
      &::after {
        display: none;
      }
    }
  }

  .dimensions-radio {
    padding-inline-start: 60px;
    .form-check {
      .form-check-input {
        margin-top: 13px;
      }
      .form-check-label {
        font-size: 16px;
      }
    }
  }
}
</style>
