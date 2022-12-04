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
                    md="6"
                    class="
                      d-flex
                      align-items-center
                      justify-content-center
                      mb-2 mb-md-0
                    "
                  >
                    <!-- <div
                      class="d-flex align-items-center justify-content-center"
                    >
                      <b-img
                        :src="`${$config.NODE_URL_images}/products/${product.imageCover}`"
                        :alt="`Image of ${product.name}`"
                        class="product-img"
                        fluid
                      />
                    </div> -->
                    <LandingProductSlider2 />
                  </b-col>

                  <!-- Right: Product Details -->
                  <b-col cols="12" md="6">
                    <!-- Product Name -->
                    <h2>
                      {{
                        dashDir == "rtl"
                          ? product.arabicName
                          : product.englishName
                      }}
                    </h2>

                    <!-- Product Brand -->
                    <b-card-text class="item-company mb-5 fs-6">
                      <span>{{ $t("cards.by") }}</span>
                      <b-link class="company-name ms-2"> Lako House </b-link>
                    </b-card-text>

                    <hr />

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
                      <h4
                        class="item-discount text-danger me-1 fs-5"
                        v-if="product.discount"
                      >
                        ( % {{ product.discount }} )
                      </h4>
                    </div>

                    <!-- Avability -->
                    <b-card-text class="mb-5">
                      {{ $t("cards.available") }} -
                      <span class="text-success text-capitalize">
                        {{ product.store }}
                      </span>
                    </b-card-text>

                    <hr />

                    <!-- Colors -->
                    <div class="product-color-options mb-5">
                      <h6>{{ $t("cards.selectColor") }}</h6>
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
                              borderColor:
                                selectedColor === color.color
                                  ? color.color
                                  : '',
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

              <LandingProductTabs />

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
  async asyncData({ $axios, store, params, route }) {
    const id = params.slug.split("-").at(-1);
    let category = null;
    await $axios.$get(`/products/${id}`).then((res) => {
      category = res.data.data.category._id;
      store.dispatch("landing/products/showSingleData", res.data.data);
    });
    await $axios.$get(`/categories/${category}/products`).then((res) => {
      store.dispatch("landing/products/related", res.data.data);
    });
    return {};
  },
  data() {
    return {
      selectedColor: "",
      settings: {
        dots: true,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
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
