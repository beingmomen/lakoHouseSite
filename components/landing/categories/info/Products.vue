<template>
  <section :class="itemView">
    <b-card
      class="ecommerce-card text-start"
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
            :alt="`${product.arabicName}-${product._id}`"
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
              {{ product.dimensions[0].price }} E£
            </h6>
            <h6 class="item-price fs-5" v-else>
              {{ product.dimensions[0].price }} E£
            </h6>
            <h6 class="item-price fs-5" v-if="product.discount">
              {{
                parseInt(
                  product.dimensions[0].price -
                    (product.dimensions[0].price * product.discount) / 100
                )
              }}
              E£
            </h6>
            <h6 class="item-price fs-5" style="height: 21px" v-else></h6>
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
            {{ dashDir == "rtl" ? product.arabicName : product.englishName }}
          </b-link>
          <b-card-text class="item-company">
            {{ $t("cards.by") }}
            <b-link class="ms-1 fs-6"> Lako House </b-link>
          </b-card-text>
        </h6>
        <!-- <b-card-text
          class="item-description"
          v-html="
            dashDir == 'rtl'
              ? product.arabicDescription
              : product.englishDescription
          "
        >
        </b-card-text> -->
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
          v-b-modal="`modal-${product._id}`"
        >
          <!-- @click="handleCartActionClick(product, product.wishList)" -->
          <shopping-cart-icon
            size="1.5x"
            class="custom-class"
          ></shopping-cart-icon>
          <span class="ms-2"> {{ $t("buttons.addToCart") }} </span>
        </b-button>
      </div>
      <b-modal
        :id="`modal-${product._id}`"
        size="lg"
        :ok-title="$t('buttons.confirm')"
        :cancel-title="$t('buttons.cancel')"
        :title="$t('cards.chooseColor&Dimension')"
        no-close-on-backdrop
        @hide="hideModal"
        :ok-disabled="
          product.colors.length
            ? !chooseColor || !chooseDimension
            : !chooseDimension
        "
        @ok="handleCartActionClick(product, product.wishList)"
      >
        <b-row>
          <b-col lg="12" md="12" class="mb-1 custom-form">
            <b-form-group
              v-if="product.colors.length"
              class="mt-2 mb-4"
              :label="$t('inputs.chooseColor')"
            >
              <b-input-group class="input-group-merge">
                <v-select
                  class="h-35 w-100"
                  v-model="chooseColor"
                  :reduce="(item) => item"
                  label="color"
                  :dir="dashDir"
                  :clearable="true"
                  :options="product.colors"
                  :placeholder="$t('inputs.chooseColor')"
                >
                  <template #option="{ color }">
                    <div class="d-flex justify-content-start">
                      <div
                        class="show-color"
                        :style="{ backgroundColor: color }"
                      ></div>
                      <span class="ms-4"> {{ color }}</span>
                    </div>
                  </template>
                </v-select>
              </b-input-group>
            </b-form-group>
            <!-- <b-form-group v-else class="mt-2" :label="$t('inputs.chooseColor')">
              <b-input-group class="input-group-merge">
                <v-select
                  class="h-35 w-100"
                  v-model="chooseColor"
                  :reduce="(item) => item"
                  label="color"
                  :dir="dashDir"
                  :clearable="true"
                  :options="product.colors"
                  :placeholder="$t('inputs.chooseColor')"
                >
                  <template #option="{ color }">
                    <div class="d-flex justify-content-start">
                      <div
                        class="show-color"
                        :style="{ backgroundColor: color }"
                      ></div>
                      <span class="ms-4"> {{ color }}</span>
                    </div>
                  </template>
                </v-select>
              </b-input-group>
            </b-form-group> -->

            <b-form-group :label="$t('inputs.chooseDimension')">
              <b-input-group class="input-group-merge">
                <v-select
                  class="h-35 w-100"
                  v-model="chooseDimension"
                  :reduce="(item) => item"
                  label="price"
                  :dir="dashDir"
                  :clearable="true"
                  :options="[...product.dimensions]"
                  :placeholder="$t('inputs.chooseDimension')"
                >
                  <template
                    #option="{ price, arabicDimension, englishDimension }"
                  >
                    <div class="d-flex justify-content-start">
                      <font-awesome-icon icon="fa-solid fa-ruler" />
                      <span class="ms-4">
                        {{
                          dashDir == "rtl"
                            ? arabicDimension.split("\r\n")[0]
                            : englishDimension.split("\r\n")[0]
                        }}</span
                      >
                      {{ dashDir == "rtl" ? "⬅️ " : "➡️ " }}
                      <span class="ms-4"> {{ price }} E£</span>
                    </div>
                  </template>
                </v-select>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-modal>
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
  data() {
    return {
      chooseColor: null,
      chooseDimension: null,
    };
  },
  computed: {
    itemView() {
      return this.$store.getters["getProductStyle"];
    },
  },

  methods: {
    toggleProductInWishlist(data, action) {
      this.$store.dispatch(`${this.module}/toggleProductInWishlist`, {
        data,
        action,
      });
    },
    async handleCartActionClick(data, action) {
      // if (!this.chooseColor)
      //   return this.$toast.error("يجب عليك اختيار لون للمنتج");
      // if (!this.chooseDimension)
      //   return this.$toast.error("يجب عليك اختيار مقاس للمنتج");
      if (action) {
        await this.toggleProductInWishlist(data, action);
      }
      await this.$store.dispatch(`${this.module}/handleCartActionClick`, {
        data,
        color: this.chooseColor,
        dimension: this.chooseDimension,
      });
    },
    hideModal() {
      this.chooseColor = null;
      this.chooseDimension = null;
    },
  },
  components: {
    HeartIcon,
    ShoppingCartIcon,
    StarIcon,
    PercentIcon,
  },
  watch: {
    chooseDimension(newValue, oldValue) {
      // console.warn("newValue", newValue);
    },
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
