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
            <b-link class="company-name ms-2">Lako House</b-link>
          </span>
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

        <span class="item-company mt-2">
          {{ $t("cards.colorProduct") }} :
          <span
            class="ms-3"
            style="width: 20px; height: 20px; border-radius: 4px"
            :style="{ 'background-color': item.color }"
          ></span>
        </span>
        <span class="item-company mt-2">
          {{ $t("cards.dimension") }} :
          <span class="ms-3">{{ item.dimension }}</span>
        </span>
        <span class="delivery-date text-muted">
          {{ $t("cards.deliveryBy") }}
          {{ $moment().add(item.product.shippingDate, "day").format("llll") }}
        </span>
        <span class="text-success">
          {{ item.product.discount }} % {{ $t("cards.discount") }}
          {{ item.dimensionPrice }}
        </span>
      </b-card-body>

      <!-- Product Options/Actions -->
      <div class="item-options text-center">
        <div class="item-wrapper">
          <div class="item-cost">
            <h4 class="item-price">
              {{
                parseInt(
                  item.dimensionPrice -
                    (item.dimensionPrice * item.product.discount) / 100
                )
              }}
              E£
            </h4>
            <h5
              v-if="item.product.discount"
              class="item-price text-danger text-decoration-line-through"
            >
              {{ item.dimensionPrice }}
              E£
            </h5>
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
  <div class="checkout-items text-start" v-else>
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
            {{ $t("cards.by") }}
            <b-link class="company-name ms-2">Lako House</b-link></span
          >
        </div>

        <span class="text-success mb-1 text-danger">
          {{ product.store }}
        </span>
        <div class="item-quantity">
          <span class="quantity-title">{{ $t("cards.qty") }} : </span>
          <b-form-spinbutton
            :value="product.buyNumber"
            size="sm"
            class="ms-2 border-1 border"
            inline
            @change="changeProductNumber($event, product)"
          />
        </div>
        <div class="item-quantity mt-2">
          <span class="quantity-title">{{ $t("cards.colorProduct") }} : </span>
          <!-- <div
            style="height: 20px; width: 20px"
            :style="{ 'background-color': product.chooseColor }"
            class="rounded-2"
          ></div> -->
          <b-avatar
            :style="{
              backgroundColor: product.chooseColor,
              color: product.chooseColor,
            }"
            :src="`${$config.NODE_URL_images}/woodColors/${product.chooseColor}`"
          ></b-avatar>
          <!-- <b-avatar-group size="32px">
            <b-avatar
              :style="{
                backgroundColor: product.chooseColor,
                color: product.chooseColor,
              }"
              :src="`${$config.NODE_URL_images}/woodColors/${product.chooseColor}`"
              class="pull-up w-100"
            />
          </b-avatar-group> -->
        </div>
        <span class="delivery-date text-muted">
          {{ $t("cards.deliveryBy") }}
          {{ $moment().add(product.shippingDate, "day").format("llll") }}
        </span>
        <span class="text-success">
          {{ product.discount }} % {{ $t("cards.discount") }}
          {{ product.chooseDimension.price }}
        </span>
      </b-card-body>

      <!-- Product Options/Actions -->
      <div class="item-options text-center">
        <div class="item-wrapper">
          <div class="item-cost">
            <h4 class="item-price">
              {{
                parseInt(
                  product.chooseDimension.price -
                    (product.chooseDimension.price * product.discount) / 100
                )
              }}
              E£
            </h4>
            <h5
              v-if="product.discount"
              class="item-price text-danger text-decoration-line-through"
            >
              {{ product.chooseDimension.price }}
              E£
            </h5>
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
          <span>{{ $t("buttons.remove") }}</span>
        </b-button>
        <b-button
          variant="primary"
          class="btn-cart move-cart"
          :disabled="!$auth.loggedIn"
          @click="toggleProductInWishlist(product)"
        >
          <heart-icon size="1x" class="custom-class me-2"></heart-icon>
          <span class="text-nowrap">{{ $t("buttons.wishlist") }}</span>
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
        data: data.product,
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
