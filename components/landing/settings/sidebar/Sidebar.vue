<template>
  <div
    class="
      main-menu
      menu-fixed menu-accordion menu-shadow menu-light
      expanded
      w-100
    "
  >
    <div class="shadow-bottom"></div>
    <div
      class="ps-container main-menu-content scroll-area ps ps--active-y pt-3"
    >
      <div class="text-center">
        <!-- Avatar -->
        <b-avatar v-if="$auth.user" size="72px" class="mr-1" :src="url" />
        <b-avatar
          v-else
          size="72px"
          class="mr-1 badge-minimal-style"
          :src="require('/assets/images/lako.svg')"
        />

        <!-- Name -->
        <b-card-text v-if="$auth.user" class="mt-2 h4 color-inherit text-reset">
          {{ $auth.user.name }}
        </b-card-text>
        <b-card-text v-if="$auth.user" class="h5 color-inherit text-reset">
          {{ $auth.user.role }}
        </b-card-text>
      </div>
      <ul class="navigation navigation-main mt-3">
        <LandingSettingsSidebarLine :title="$t('sidebar.pages')" />
        <MainSidebarLink :name="$t(`navbar.home`)" route="/">
          <template #icon>
            <home-icon size="1.5x" class="custom-class"></home-icon>
          </template>
        </MainSidebarLink>
        <MainSidebarGroupLink :title="$t('navbar.categories')" :child="getData">
          <template #icon>
            <grid-icon size="2x" class="custom-class"></grid-icon>
          </template>
        </MainSidebarGroupLink>
        <MainSidebarLink :name="$t('navbar.wishlist')" route="/wishlist">
          <template #icon>
            <heart-icon size="1.5x" class="custom-class"></heart-icon>
          </template>
        </MainSidebarLink>
        <MainSidebarLink :name="$t('navbar.cart')" route="/checkout">
          <template #icon>
            <shopping-cart-icon
              size="1.5x"
              class="custom-class"
            ></shopping-cart-icon>
          </template>
        </MainSidebarLink>

        <LandingSettingsSidebarLine :title="$t('sidebar.settings')" />
        <li class="nav-item" v-if="dashboardMode" @click="toggleMode('dark')">
          <b-link class="d-flex align-items-center">
            <moon-icon size="1.5x" class="custom-class"></moon-icon>
            <span class="menu-title text-truncate">{{
              $t("navbar.dark")
            }}</span>
          </b-link>
        </li>
        <li class="nav-item" v-else @click="toggleMode('light')">
          <b-link class="d-flex align-items-center">
            <sun-icon size="1.5x" class="custom-class"></sun-icon>
            <span class="menu-title text-truncate">{{
              $t("navbar.light")
            }}</span>
          </b-link>
        </li>

        <li
          class="nav-item"
          v-if="dashDir == 'ltr'"
          @click="switchLang('ar'), $i18n.setLocale('ar')"
        >
          <b-link class="d-flex align-items-center">
            <globe-icon size="1.5x" class="custom-class"></globe-icon>
            <span>{{ dashDir == "ltr" ? "Arabic" : "الإنجليزية" }}</span>
          </b-link>
        </li>
        <li
          class="nav-item"
          v-else
          @click="switchLang('en'), $i18n.setLocale('en')"
        >
          <b-link class="d-flex align-items-center">
            <globe-icon size="1.5x" class="custom-class"></globe-icon>
            <span>{{ dashDir == "ltr" ? "Arabic" : "الإنجليزية" }}</span>
          </b-link>
        </li>
      </ul>
      <div
        v-if="$auth.user"
        class="
          p-2
          border-top
          text-danger
          cursor-pointer
          position-absolute
          w-100
          bottom-0
          text-start
        "
        @click="$auth.logout()"
      >
        <log-out-icon size="1.5x" class="ms-2"></log-out-icon>
        <span class="ml-1">{{ $t("buttons.logout") }}</span>
      </div>
      <div
        v-else
        class="
          p-2
          border-top
          text-danger
          cursor-pointer
          position-absolute
          w-100
          bottom-0
          text-start
        "
        @click="$auth.logout()"
      >
        <b-link :to="localePath('/login')" class="text-danger">
          <log-in-icon size="1.5x" class="ms-2"></log-in-icon>
          <span class="ml-1">{{ $t("buttons.login") }}</span>
        </b-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  XIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  ShoppingCartIcon,
  ListIcon,
  GridIcon,
  UserCheckIcon,
  LogOutIcon,
  LogInIcon,
  MoonIcon,
  SunIcon,
  HeartIcon,
  GlobeIcon,
} from "vue-feather-icons";
export default {
  computed: {
    returnDashboardChild() {
      let arr = [
        { name: this.$t("sidebar.settings"), route: "/panel/eCommerce" },
        { name: this.$t("sidebar.pages"), route: "/panel/analytics" },
      ];
      return arr;
    },
    lang() {
      return (this.currentLang = this.$cookies.get(this.$config.i18nKey));
    },
    getData() {
      return this.$store.getters["landing/getCategories"];
    },
    url() {
      let url = `${this.$config.NODE_URL_images}/users/${this.$auth.user.photo}`;
      return url;
    },
  },
  methods: {
    toggleMode(mode) {
      this.$store.dispatch("layoutMode", mode);
      this.$cookies.set("dashboard-mode", mode);
      if (mode == "dark") {
        document.body.classList.remove("light-layout");
        document.body.classList.add("dark-layout");
      } else {
        document.body.classList.remove("dark-layout");
        document.body.classList.add("light-layout");
      }
    },
    switchLang(lang) {
      this.$store.dispatch("changeDashDir", lang);
      if (lang == "ar") {
        document.documentElement.classList.add("arabic-dir");
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
        document.documentElement.classList.remove("english-dir");
      } else {
        document.documentElement.classList.remove("arabic-dir");
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", "en");
        document.documentElement.classList.add("english-dir");
      }
    },
  },
  filters: {
    languageName(value, dir) {
      if (dir == "ltr") {
        switch (value) {
          case "ar":
            return (value = "English");
            break;
          case "en":
            return (value = "Arabic");
            break;
          default:
            break;
        }
      } else {
        switch (value) {
          case "ar":
            return (value = "الإنجليزية");
            break;
          case "en":
            return (value = "العربية");
            break;
          default:
            break;
        }
      }
    },
  },
  components: {
    XIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
    ShoppingCartIcon,
    ListIcon,
    UserCheckIcon,
    LogOutIcon,
    MoonIcon,
    SunIcon,
    GlobeIcon,
    HeartIcon,
    GridIcon,
    LogInIcon,
  },
};
</script>

<style lang="scss" scoped>
.main-menu {
  transform: none !important;
}

.custom-class {
  width: 20px !important;
  height: 20px !important;
  margin-inline: 1rem;
}

.ps-container {
  height: 100% !important;
}
</style>
