<template>
  <div class="list-view product-checkout mt-0">
    <!-- Products List -->
    <LandingCheckoutStepCartProducts :module="module" />

    <!-- Checkout Options -->
    <div class="checkout-options text-start">
      <b-card>
        <label class="section-label mb-1" v-text="$t('cards.options')"></label>
        <b-input-group class="input-group-merge coupons">
          <b-form-input :placeholder="$t('inputs.coupons')" />
          <b-input-group-append is-text>
            <span
              id="input-coupons"
              class="input-group-text text-primary cursor-pointer"
              v-text="$t('buttons.apply')"
            >
            </span>
          </b-input-group-append>
        </b-input-group>
        <hr />
        <div class="price-details">
          <h6 class="price-title" v-text="$t('cards.priceDetails')"></h6>
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title" v-text="$t('cards.subtotal')"></div>
              <div class="detail-amt">{{ subTotalPrice }} E£</div>
            </li>
            <li class="price-detail">
              <div
                class="detail-title"
                v-text="$t('cards.deliveryCharges')"
              ></div>
              <div
                class="detail-amt discount-amt text-success"
                v-text="$t('cards.free')"
              ></div>
            </li>
          </ul>
          <hr />
          <ul class="list-unstyled">
            <li class="price-detail">
              <div
                class="detail-title detail-total"
                v-text="$t('cards.total')"
              ></div>
              <div class="detail-amt font-weight-bolder">
                {{ totalPrice }} E£
              </div>
            </li>
          </ul>
          <b-button variant="primary" block @click="$emit('next-step')">
            {{ $t("buttons.placeOrder") }}
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    module: String,
  },
  computed: {
    subTotalPrice() {
      return this.$store.getters[`${this.module}/subTotalPrice`];
    },
    totalPrice() {
      return this.$store.getters[`${this.module}/totalPrice`];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
