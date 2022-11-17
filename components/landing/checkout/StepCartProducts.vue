<template>
  <div class="checkout-items text-start" v-if="$auth.loggedIn">
    <b-card
      v-for="item in getAllCheckout"
      :key="item._id"
      class="ecommerce-card"
      no-body
    >
      <!-- Product Image -->
      <div class="item-img">
        <b-link>
          <b-img
            :src="`${$config.NODE_URL_images}/products/${item.product.imageCover}`"
            :alt="`${item.product.name}-${item.product.id}`"
          />
        </b-link>
      </div>

      <!-- Product Details: Card Body -->
      <b-card-body>
        <div class="item-name">
          <h6 class="mb-0">
            <b-link class="text-body">
              {{ item.product.name }}
            </b-link>
          </h6>
          <span class="item-company">
            {{ $t("cards.by") }}
            <b-link class="company-name ms-2">Lako House</b-link></span
          >
        </div>
        <span class="text-success mb-1 text-danger">
          {{ item.product.store }}
        </span>
        <div class="item-quantity">
          <span class="quantity-title">{{ $t("cards.qty") }} : </span>
          <b-form-spinbutton
            :value="item.productNumber"
            size="sm"
            class="ms-2 border-1 border"
            inline
            @change="changeProductNumber($event, item)"
          />
        </div>
        <span class="delivery-date text-muted">
          {{ $t("cards.deliveryBy") }}
          {{ $moment().add(item.product.shippingDate, "day").format("llll") }}
        </span>
        <span class="text-success">
          {{ item.product.discount }} % {{ $t("cards.discount") }}
          {{ item.product.price }}
        </span>
      </b-card-body>

      <!-- Product Options/Actions -->
      <div class="item-options text-center">
        <div class="item-wrapper">
          <div class="item-cost">
            <h4 class="item-price">
              {{
                parseInt(
                  item.product.price -
                    (item.product.price * item.product.discount) / 100
                )
              }}
              E£
            </h4>
            <p v-if="item.product.hasFreeShipping" class="card-text shipping">
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
  <div class="checkout-items" v-else>
    <b-card
      v-for="product in getAllCheckoutLocal"
      :key="product._id"
      class="ecommerce-card"
      no-body
    >
      <!-- Product Image -->
      <div class="item-img">
        <b-link>
          <b-img
            :src="`${$config.NODE_URL_images}/products/${product.imageCover}`"
            :alt="`${product.name}-${product.id}`"
          />
        </b-link>
      </div>

      <!-- Product Details: Card Body -->
      <b-card-body>
        <div class="item-name">
          <h6 class="mb-0">
            <b-link class="text-body">
              {{ product.name }}
            </b-link>
          </h6>
          <span class="item-company">
            By
            <b-link class="company-name">Lako House</b-link>
          </span>
        </div>
        <span class="">
          {{
            parseInt(product.price - (product.price * product.discount) / 100)
          }}
          E£
        </span>
        <span class="text-success mb-1">In Stock</span>
        <div class="item-quantity">
          <span class="quantity-title">Qty:</span>
          <b-form-spinbutton
            :value="product.buyNumber"
            size="sm"
            class="ms-2 border-1 border"
            inline
            @change="changeProductNumber($event, product)"
          />
        </div>
        <span class="delivery-date text-muted">
          Delivery by
          {{ $moment().add(product.shippingDate, "day").format("llll") }}
        </span>
        <span class="text-success">
          {{ product.discount }} % Discount Available From
          {{ product.price }}
        </span>
      </b-card-body>

      <!-- Product Options/Actions -->
      <div class="item-options text-center">
        <div class="item-wrapper">
          <div class="item-cost">
            <h4 class="item-price">
              {{ product.total }}
              E£
            </h4>
            <p v-if="product.hasFreeShipping" class="card-text shipping">
              <b-badge pill variant="light-success"> Free Shipping </b-badge>
            </p>
          </div>
        </div>
        <b-button
          variant="light"
          class="mt-1 remove-wishlist"
          @click="removeProductFromCartClick(product)"
        >
          <x-icon size="1x" class="custom-class me-2"></x-icon>
          <span>Remove</span>
        </b-button>
        <b-button
          variant="primary"
          class="btn-cart move-cart"
          :disabled="!$auth.loggedIn"
          @click="toggleProductInWishlist(product)"
        >
          <heart-icon size="1x" class="custom-class me-2"></heart-icon>
          <span class="text-nowrap">Wishlist</span>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  XIcon,
} from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  methods: {
    changeProductNumber(value, product) {
      this.$store.dispatch(`${this.module}/changeProductNumber`, {
        value,
        product,
      });
    },
    removeProductFromCartClick(product) {
      this.$store.dispatch(
        `${this.module}/removeProductFromCartClick`,
        product
      );
    },
    async toggleProductInWishlist(data) {
      await this.$store.dispatch(`landing/products/toggleProductInWishlist`, {
        id: data.product._id,
        action: false,
      });
      await this.removeProductFromCartClick(data);
    },
  },

  components: {
    HeartIcon,
    ShoppingCartIcon,
    StarIcon,
    XIcon,
  },
};
</script>

<style lang="scss" scoped>
.quantity-title {
  margin-inline-end: 8px;
}
</style>
