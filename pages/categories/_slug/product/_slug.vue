<template>
  <div class="landing-page">
    <div class="app-content content ecommerce-application">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-body">
          <section class="app-ecommerce-details text-start">
            <!-- Content -->
            <b-card v-if="product" no-body>
              <b-card-body>
                <b-row class="my-2">
                  <!-- Left: Product Image Container -->
                  <b-col
                    cols="12"
                    md="5"
                    class="
                      d-flex
                      align-items-center
                      justify-content-center
                      mb-2 mb-md-0
                    "
                  >
                    <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-img
                        :src="`${$config.NODE_URL_images}/products/${product.imageCover}`"
                        :alt="`Image of ${product.name}`"
                        class="product-img"
                        fluid
                      />
                    </div>
                  </b-col>

                  <!-- Right: Product Details -->
                  <b-col cols="12" md="7">
                    <!-- Product Name -->
                    <h2>{{ product.name }}</h2>

                    <!-- Product Brand -->
                    <b-card-text class="item-company mb-0 fs-6">
                      <span>{{ $t("cards.by") }}</span>
                      <b-link class="company-name ms-2"> Lako House </b-link>
                    </b-card-text>

                    <!-- Price And Ratings -->
                    <div class="ecommerce-details-price d-flex flex-wrap mt-1">
                      <h4
                        class="
                          item-price
                          me-1
                          text-danger text-decoration-line-through
                          fs-5
                        "
                        v-if="product.discount"
                      >
                        {{ product.price }} E£
                      </h4>
                      <h4 class="item-price me-1 fs-5" v-else>
                        {{ product.price }} E£
                      </h4>
                      <h4 class="item-price me-1 fs-5" v-if="product.discount">
                        {{
                          parseInt(
                            product.price -
                              (product.price * product.discount) / 100
                          )
                        }}
                        E£
                      </h4>
                    </div>

                    <!-- Avability -->
                    <b-card-text>
                      {{ $t("cards.available") }} -
                      <span class="text-success text-capitalize">
                        {{ product.store }}
                      </span>
                    </b-card-text>

                    <!-- Product Description -->
                    <b-card-text>{{ product.description }}</b-card-text>
                    <b-card-text>
                      سرير: عرض 185 سم ، طول 254 سم ، ارتفاع 106 سم
                    </b-card-text>
                    <b-card-text>
                      كمود: عرض 61 سم ، عمق 46 سم ، ارتفاع 47 سم
                    </b-card-text>
                    <b-card-text>
                      تسريحة: عرض 127 سم ، عمق 46 سم ، ارتفاع 134 سم
                    </b-card-text>

                    <!-- Product Meta [Free shpping, EMI, etc.] -->
                    <!-- <ul class="product-features list-unstyled">
                      <li v-if="product.hasFreeShipping">
                        <feather-icon icon="ShoppingCartIcon" />
                        <span>Free Shipping</span>
                      </li>
                      <li>
                        <feather-icon icon="DollarSignIcon" />
                        <span>EMI options available</span>
                      </li>
                    </ul> -->

                    <hr />

                    <!-- Colors -->
                    <div class="product-color-options">
                      <h6>{{ $t("cards.colors") }}</h6>
                      <ul class="list-unstyled mb-0">
                        <li
                          v-for="color in product.colors"
                          :key="color._id"
                          class="d-inline-block"
                          :class="{ selected: selectedColor === color.color }"
                          @click="selectedColor = color.color"
                        >
                          <div
                            class="color-option"
                            :style="{
                              color: color.color,
                              // borderColor:
                              //   selectedColor === color.color
                              //     ? color.color
                              //     : '',
                            }"
                          >
                            <div
                              class="filloption"
                              :style="{
                                backgroundColor: color.color,
                                color: color.color,
                              }"
                            ></div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <hr />

                    <div class="d-flex flex-column flex-sm-row pt-1">
                      <b-button
                        v-if="product.checkout"
                        :to="localePath('/checkout')"
                        variant="primary"
                        tag="a"
                        class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0"
                      >
                        <shopping-cart-icon
                          size="1x"
                          class="custom-class"
                        ></shopping-cart-icon>
                        <span class="ms-2">
                          {{ $t("buttons.viewInCart") }}
                        </span>
                      </b-button>
                      <!-- @click="
                          handleCartActionClick(product, product.wishList)
                        " -->
                      <b-button
                        v-else
                        variant="primary"
                        tag="a"
                        class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0"
                      >
                        <shopping-cart-icon
                          size="1x"
                          class="custom-class"
                        ></shopping-cart-icon>
                        <span class="ms-2">
                          {{ $t("buttons.addToCart") }}
                        </span>
                      </b-button>
                      <!-- @click="toggleProductInWishlist(product)" -->
                      <b-button
                        v-if="$auth.loggedIn"
                        variant="outline-secondary"
                        class="btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0"
                      >
                        <heart-icon
                          size="1x"
                          class="custom-class"
                          :class="{ 'text-danger': product.wishList }"
                        ></heart-icon>
                        <span>{{ $t("buttons.wishlist") }}</span>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-card-body>

              <!-- Static Content -->
              <!-- <LandingProductFeatures /> -->

              <!-- Static Content -->
              <!-- Slider: Related Products -->
              <LandingProductSlider />
            </b-card>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  PercentIcon,
} from "vue-feather-icons";
export default {
  name: "product",
  async asyncData({ $axios, store, params }) {
    const id = params.slug.split("-").at(-1);
    await $axios.$get(`/products/${id}`).then((res) => {
      store.dispatch("landing/products/showSingleData", res.data.data);
    });
    return {};
  },
  data() {
    return {
      selectedColor: "",
    };
  },
  components: {
    HeartIcon,
    ShoppingCartIcon,
    StarIcon,
    PercentIcon,
  },
  computed: {
    product() {
      return this.$store.getters["landing/products/singleData"];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
