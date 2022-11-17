<template>
  <div>
    <div
      class="
        navbar
        header-navbar
        navbar-shadow
        align-items-center
        navbar-brand-center navbar-fixed navbar-light navbar-expand
      "
    >
      <div
        class="
          navbar-container
          d-flex
          content
          align-items-center
          justify-content-between
        "
        style="height: 80px"
      >
        <nuxt-link
          v-b-toggle.sidebar-1
          to=""
          class="nav-link modern-nav-toggle text-secondary d-xl-none"
        >
          <align-justify-icon size="1.5x" class=""></align-justify-icon>
        </nuxt-link>
        <div>
          <b-sidebar
            id="sidebar-1"
            shadow
            :right="dashDir == 'rtl'"
            no-header
            aria-label="Sidebar with custom footer"
            backdrop
          >
            <LandingSettingsSidebar />
          </b-sidebar>
        </div>
        <!-- <div class="navbar-header d-xl-block d-none"> -->
        <div class="navbar-header">
          <MainLogo style="width: 170px" />
        </div>
      </div>
    </div>
    <div class="horizontal-menu-wrapper">
      <div
        class="
          header-navbar
          mx-2
          rounded-3
          navbar-expand-sm navbar navbar-horizontal navbar-light navbar-shadow
          menu-border
          d-none d-xl-block
        "
      >
        <div
          class="
            navbar-container
            main-menu-content
            d-flex
            justify-content-between
            align-items-star
          "
        >
          <ul id="main-menu-navigation" class="nav navbar-nav">
            <LandingSettingsNavbarHeaderLink
              :title="$t('navbar.home')"
              route="/"
            >
              <template #icon>
                <home-icon size="1.5x" class="custom-class me-2"></home-icon>
              </template>
            </LandingSettingsNavbarHeaderLink>
            <!-- <LandingSettingsNavbarHeaderLink
              :title="$t('navbar.panel')"
              route="/panel"
            >
              <template #icon>
                <home-icon size="1.5x" class="custom-class me-2"></home-icon>
              </template>
            </LandingSettingsNavbarHeaderLink> -->
            <LandingSettingsNavbarHeaderGroup>
              <template #content>
                <b-link
                  class="nav-link dropdown-toggle d-flex align-items-center"
                >
                  <list-icon size="1.5x" class="custom-class me-2"></list-icon>
                  <span class="menu-title menu-title-style">{{
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
                      <span class="menu-title">{{ cat.name }}</span>
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
                <heart-icon size="1.5x" class="custom-class me-2"></heart-icon>
              </template>
            </LandingSettingsNavbarHeaderLink>
            <LandingSettingsNavbarHeaderLink
              :title="$t('navbar.cart')"
              route="/checkout"
            >
              <template #icon>
                <shopping-cart-icon
                  size="1.5x"
                  class="custom-class me-2"
                ></shopping-cart-icon>
              </template>
            </LandingSettingsNavbarHeaderLink>
          </ul>
          <ul class="navbar-nav nav align-items-center flex-nowrap">
            <LandingSettingsNavbarUser />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CircleIcon,
  HomeIcon,
  AlignJustifyIcon,
  ListIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "vue-feather-icons";
export default {
  components: {
    CircleIcon,
    HomeIcon,
    ListIcon,
    AlignJustifyIcon,
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
</style>
