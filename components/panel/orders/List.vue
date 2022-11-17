<template>
  <div class="list-view product-checkout mt-0">
    <div class="checkout-items text-start">
      <b-card
        v-for="product in singleOrder.products"
        :key="product.item._id"
        class="ecommerce-card"
        no-body
      >
        <!-- Product Image -->
        <div class="item-img">
          <b-link>
            <b-img
              :src="`${$config.NODE_URL_images}/products/${product.item.imageCover}`"
              :alt="`${product.item.name}-${product.item.id}`"
            />
          </b-link>
        </div>

        <!-- Product Details: Card Body -->
        <b-card-body>
          <div class="item-name">
            <h6 class="mb-0">
              <b-link class="text-body">
                {{ product.item.name }}
              </b-link>
            </h6>
            <span class="item-company">
              {{ $t("cards.by") }}
              <b-link class="company-name ms-2">Lako House</b-link></span
            >
          </div>
          <span class="text-success mb-1 text-danger">
            {{ product.item.store }}
          </span>
          <div class="item-quantity">
            <span class="quantity-title">{{ $t("cards.qty") }} : </span>
            <b-form-spinbutton
              :value="product.quantity"
              size="sm"
              class="ms-2 border-1 border"
              inline
              disabled
              @change="changeProductNumber($event, item)"
            />
          </div>
          <span class="delivery-date text-muted">
            {{ $t("cards.deliveryBy") }}
            {{ $moment().add(product.item.shippingDate, "day").format("llll") }}
          </span>
          <span class="text-success">
            {{ product.item.discount }} % {{ $t("cards.discount") }}
            {{ product.item.price }}
          </span>
        </b-card-body>

        <!-- Product Options/Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">
                {{
                  parseInt(
                    product.item.price -
                      (product.item.price * product.item.discount) / 100
                  )
                }}
                E£
              </h4>
              <p v-if="product.item.hasFreeShipping" class="card-text shipping">
                <b-badge pill variant="light-success"> Free Shipping </b-badge>
              </p>
            </div>
          </div>
          <b-button
            variant="light"
            class="mt-1 remove-wishlist"
            @click="removeProductFromCartClick(item)"
          >
            <x-icon size="1x" class="custom-class me-2"></x-icon>
            <span>{{ $t("buttons.remove") }}</span>
          </b-button>
          <b-button
            variant="primary"
            class="btn-cart move-cart"
            @click="toggleProductInWishlist(item)"
          >
            <heart-icon size="1x" class="custom-class me-2"></heart-icon>
            <span class="text-nowrap">{{ $t("buttons.wishlist") }}</span>
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
    singleOrder() {
      return this.$store.getters[`${this.module}/singleOrder`];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
