<template>
  <div>
    <LandingSettingsNavbarHeader />

    <LandingSettingsNavbarLayout>
      <template #items>
        <LandingSettingsNavbarHeaderLink :title="$t('navbar.home')" route="/">
          <template #icon>
            <home-icon
              size="1.5x"
              class="custom-class icon-style me-2"
            ></home-icon>
          </template>
        </LandingSettingsNavbarHeaderLink>
        <LandingSettingsNavbarHeaderGroup>
          <template #content>
            <b-link class="nav-link dropdown-toggle d-flex align-items-center">
              <list-icon
                size="1.5x"
                class="custom-class icon-style me-2"
              ></list-icon>
              <span class="menu-title fs-5 menu-title-style">{{
                $t("navbar.categories")
              }}</span>
            </b-link>
            <ul class="dropdown-menu" v-if="getAllCategories.length">
              <li class="" v-for="cat in getAllCategories" :key="cat._id">
                <b-link
                  :to="localePath(`/categories/${cat.slug}-${cat._id}`)"
                  class="dropdown-item"
                >
                  <circle-icon
                    size="1.5x"
                    class="custom-class me-2"
                  ></circle-icon>
                  <span class="menu-title">{{
                    dashDir == "rtl" ? cat.arabicName : cat.englishName
                  }}</span>
                </b-link>
              </li>
              <!-- <LandingSettingsNavbarMenuGroup>
                    <template #icon>
                      <home-icon
                        size="1.5x"
                        class="custom-class me-2"
                      ></home-icon>
                    </template>
                  </LandingSettingsNavbarMenuGroup> -->
            </ul>
          </template>
        </LandingSettingsNavbarHeaderGroup>
        <LandingSettingsNavbarHeaderLink
          :title="$t('navbar.wishlist')"
          route="/wishlist"
        >
          <template #icon>
            <heart-icon
              size="1.5x"
              class="custom-class icon-style me-2"
            ></heart-icon>
          </template>
        </LandingSettingsNavbarHeaderLink>
        <LandingSettingsNavbarHeaderLink
          :title="$t('navbar.cart')"
          route="/checkout"
        >
          <template #icon>
            <shopping-cart-icon
              size="1.5x"
              class="custom-class icon-style me-2"
            ></shopping-cart-icon>
          </template>
        </LandingSettingsNavbarHeaderLink>
      </template>

      <template #user>
        <LandingSettingsNavbarUser />
      </template>
    </LandingSettingsNavbarLayout>
  </div>
</template>

<script>
import {
  CircleIcon,
  HomeIcon,
  ListIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "vue-feather-icons";
export default {
  components: {
    CircleIcon,
    HomeIcon,
    ListIcon,

    HeartIcon,
    ShoppingCartIcon,
  },
};
</script>

<style lang="scss" scoped>
.navbar-header {
  position: absolute;
  left: 50% !important;
  transform: translateX(-50%);
}

.icon-style {
  height: 18px !important;
  width: 20px !important;
}
</style>
