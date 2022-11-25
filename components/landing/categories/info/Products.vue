<template>
  <section :class="itemView">
    <b-card
      class="ecommerce-card"
      v-for="product in productsOfCategories"
      :key="product._id"
      no-body
    >
      <b-badge
        v-if="product.discount"
        variant="danger"
        class="position-absolute badge"
      >
        <span class="fs-6">{{ product.discount }}</span>
        <percent-icon size="1x" class="custom-class"></percent-icon>
      </b-badge>
      <div class="item-img text-center">
        <b-link
          :to="
            localePath(`${$route.path}/product/${product.slug}-${product._id}`)
          "
        >
          <b-img
            :alt="`${product.name}-${product._id}`"
            fluid
            class="card-img-top"
            :src="`${$config.NODE_URL_images}/products/${product.imageCover}`"
          />
        </b-link>
      </div>
      <!-- Product Details -->
      <b-card-body>
        <div class="item-wrapper">
          <div class="fs-6" v-if="itemView == 'grid-view'">
            {{ $t("cards.by") }}
            <b-link class="ms-1 fw-bold"> Lako House </b-link>
          </div>
          <div>
            <h6
              class="item-price fs-6 text-decoration-line-through text-danger"
              v-if="product.discount"
            >
              {{ product.price }} E£
            </h6>
            <h6 class="item-price fs-5" v-else>{{ product.price }} E£</h6>
            <h6 class="item-price fs-5" v-if="product.discount">
              {{
                parseInt(
                  product.price - (product.price * product.discount) / 100
                )
              }}
              E£
            </h6>
          </div>
        </div>
        <h6 class="item-name">
          <b-link
            class="text-body fs-5"
            :to="
              localePath(
                `${$route.path}/product/${product.slug}-${product._id}`
              )
            "
          >
            {{ product.name }}
          </b-link>
          <b-card-text class="item-company">
            {{ $t("cards.by") }}
            <b-link class="ms-1 fs-6"> Lako House </b-link>
          </b-card-text>
        </h6>
        <b-card-text class="item-description">
          {{ product.description }}
        </b-card-text>
      </b-card-body>

      <!-- Product Actions -->
      <div class="item-options text-center">
        <div class="item-wrapper">
          <div class="item-cost">
            <h4
              class="item-price fs-6 text-decoration-line-through text-danger"
              v-if="product.discount"
            >
              {{ product.price }} E£
            </h4>
            <h4 class="item-price fs-5" v-else>{{ product.price }} E£</h4>
            <h4 class="item-price fs-5" v-if="product.discount">
              {{
                parseInt(
                  product.price - (product.price * product.discount) / 100
                )
              }}
              E£
            </h4>
          </div>
        </div>
        <b-button
          v-if="$auth.loggedIn"
          variant="light"
          tag="a"
          class="btn-wishlist d-flex justify-content-center align-items-center"
          @click="toggleProductInWishlist(product, product.wishList)"
        >
          <heart-icon
            size="1.5x"
            class="custom-class"
            :class="{ 'text-danger': product.wishList }"
          ></heart-icon>
          <span class="ms-2">{{ $t("buttons.wishlist") }}</span>
        </b-button>
        <b-button
          v-else
          variant="light"
          tag="a"
          :to="localePath('/wishlist')"
          class="btn-wishlist d-flex justify-content-center align-items-center"
        >
          <heart-icon
            size="1.5x"
            class="custom-class"
            :class="{ 'text-danger': product.wishList }"
          ></heart-icon>
          <span class="ms-2">{{ $t("buttons.wishlist") }}</span>
        </b-button>
        <b-button
          v-if="product.checkout"
          :to="localePath('/checkout')"
          variant="primary"
          tag="a"
          class="btn-cart d-flex justify-content-center align-items-center"
        >
          <shopping-cart-icon
            size="1.5x"
            class="custom-class"
          ></shopping-cart-icon>
          <span class="ms-2"> {{ $t("buttons.viewInCart") }} </span>
        </b-button>
        <b-button
          v-else
          variant="primary"
          tag="a"
          class="btn-cart d-flex justify-content-center align-items-center"
          @click="handleCartActionClick(product, product.wishList)"
        >
          <shopping-cart-icon
            size="1.5x"
            class="custom-class"
          ></shopping-cart-icon>
          <span class="ms-2"> {{ $t("buttons.addToCart") }} </span>
        </b-button>
      </div>
    </b-card>
  </section>
</template>

<script>
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  PercentIcon,
} from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  computed: {
    itemView() {
      return this.$store.getters["getProductStyle"];
    },
  },

  methods: {
    toggleProductInWishlist(data, action) {
      this.$store.dispatch(`${this.module}/toggleProductInWishlist`, {
        id: data._id,
        action,
      });
    },
    async handleCartActionClick(data, action) {
      if (action) {
        await this.toggleProductInWishlist(data, action);
      }
      await this.$store.dispatch(`${this.module}/handleCartActionClick`, data);
    },
  },
  components: {
    HeartIcon,
    ShoppingCartIcon,
    StarIcon,
    PercentIcon,
  },
};
</script>

<style lang="scss" scoped>
.badge {
  top: 20px;
  border-radius: 2px;
  &:dir(ltr) {
    left: 0px;
  }
  &:dir(rtl) {
    right: 0px;
  }
}
</style>
