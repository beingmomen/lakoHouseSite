<template>
  <div class="landing-page">
    <div class="app-content content ecommerce-application">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-body" v-if="$auth.loggedIn">
          <section
            v-if="$auth.user.wishList.length"
            class="grid-view wishlist-items"
          >
            <b-card
              v-for="product in $auth.user.wishList"
              :key="product._id"
              class="ecommerce-card text-start"
              no-body
            >
              <b-badge
                v-if="product.discount"
                variant="danger"
                class="position-absolute badge"
              >
                <span>{{ product.discount }}</span>
                <percent-icon size="1x" class="custom-class"></percent-icon>
              </b-badge>
              <div class="item-img text-center">
                <b-link
                  :to="{
                    name: 'apps-e-commerce-product-details',
                    params: { slug: product.slug },
                  }"
                >
                  <b-img
                    :alt="`${product.name}-${product.id}`"
                    fluid
                    class="card-img-top"
                    :src="`${$config.NODE_URL_images}/products/${product.imageCover}`"
                  />
                </b-link>
              </div>

              <!-- Product Details -->
              <b-card-body>
                <div class="item-wrapper">
                  <div>
                    {{ $t("cards.by") }}
                    <b-link class="ms-1"> Lako House </b-link>
                  </div>
                  <div>
                    <h6
                      class="
                        item-price
                        text-decoration-line-through text-danger
                      "
                      v-if="product.discount"
                    >
                      ${{ product.price }}
                    </h6>
                    <h6 class="item-price" v-else>{{ product.price }} E£</h6>
                    <h6 class="item-price" v-if="product.discount">
                      {{
                        parseInt(
                          product.price -
                            (product.price * product.discount) / 100
                        )
                      }}
                      E£
                    </h6>
                  </div>
                </div>
                <h6 class="item-name">
                  <b-link
                    class="text-body"
                    :to="{
                      name: 'apps-e-commerce-product-details',
                      params: { slug: product.slug },
                    }"
                  >
                    {{ product.name }}
                  </b-link>
                  <b-card-text class="item-company">
                    By
                    <b-link class="ml-25">
                      {{ product.brand }}
                    </b-link>
                  </b-card-text>
                </h6>
                <b-card-text class="item-description">
                  {{ product.description }}
                </b-card-text>
              </b-card-body>

              <!-- Action Buttons -->
              <div class="item-options text-center">
                <b-button
                  variant="light"
                  class="
                    btn-wishlist
                    remove-wishlist
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  @click="removeProductFromWishlistClick(product)"
                >
                  <x-icon size="1.5x" class="custom-class"></x-icon>
                  <span class="ms-2">{{ $t("buttons.remove") }}</span>
                </b-button>
                <b-button
                  variant="primary"
                  class="
                    btn-cart
                    move-cart
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  @click="handleWishlistCartActionClick(product)"
                >
                  <shopping-cart-icon
                    size="1.5x"
                    class="custom-class"
                  ></shopping-cart-icon>
                  <span class="ms-2">{{ $t("buttons.moveToCart") }}</span>
                </b-button>
              </div>
            </b-card>
          </section>
          <div class="d-flex align-items-center justify-content-center" v-else>
            <lottie-player
              src="https://assets2.lottiefiles.com/private_files/lf30_fulewbkv.json"
              class="lottie-container"
              background="transparent"
              speed=".5"
              style="width: 500px; height: 500px"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <CardsNotAuthorized v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon, ShoppingCartIcon, PercentIcon } from "vue-feather-icons";
export default {
  name: "wishlist",
  async asyncData({ $axios, store, params, $auth }) {
    if ($auth.loggedIn) {
      await $auth.fetchUser();
    }
    return {};
  },
  data() {
    return {
      module: "landing/products",
      downImg: require("/assets/images/pages/not-authorized.svg"),
    };
  },
  methods: {
    removeProductFromWishlistClick(data) {
      this.$store.dispatch(`${this.module}/toggleProductInWishlist`, {
        id: data._id,
        action: true,
      });
    },
    async handleWishlistCartActionClick(data) {
      await this.removeProductFromWishlistClick(data);
      await this.$store.dispatch(`${this.module}/handleCartActionClick`, data);
    },
  },
  components: {
    XIcon,
    ShoppingCartIcon,
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
