<template>
  <div
    class="
      navbar
      header-navbar
      navbar navbar-shadow
      align-items-center
      navbar-light navbar-expand
      floating-nav
    "
  >
    <div class="navbar-container d-flex content align-items-center">
      <nuxt-link
        @click.native="toggleLayoutCollapsed"
        to=""
        class="nav-link modern-nav-toggle text-secondary"
      >
        <align-justify-icon size="1.5x" class=""></align-justify-icon>
      </nuxt-link>

      <ul class="navbar-nav nav align-items-center ml-auto">
        <li
          id="dropdown-grouped"
          class="nav-item b-nav-dropdown dropdown dropdown-language"
          variant="link"
        >
          <b-nav-item-dropdown
            id="dropdown-grouped"
            variant="link"
            class="dropdown-language"
            right
          >
            <template #button-content>
              <b-img
                :src="
                  require(`/assets/images/flags/${currentLang || lang}.png`)
                "
                height="14px"
                width="22px"
                alt="English"
              />
              <span class="ms-2 text-body">{{
                currentLang || lang | languageName
              }}</span>
            </template>
            <b-dropdown-item
              v-for="locale in availableLocales"
              :key="locale.code"
              @click.native="
                switchLang(locale.code), $i18n.setLocale(locale.code)
              "
            >
              <nuxt-link
                class="
                  lang-name
                  d-flex
                  align-items-center
                  cursor-pointer
                  text-secondary
                "
                to=""
              >
                <b-img
                  :src="require(`/assets/images/flags/${locale.code}.png`)"
                  height="20px"
                  width="32px"
                  alt=""
                  class="me-1"
                />
                <p class="mb-0 ms-2 cursor-pointer">
                  {{ locale.code | languageName }}
                </p></nuxt-link
              >
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </li>
        <li class="nav-item d-none d-lg-block">
          <nuxt-link to="" class="nav-link">
            <moon-icon
              @click="toggleMode('dark')"
              v-if="dashboardMode"
              size="1.5x"
              class=""
            ></moon-icon>
            <sun-icon
              @click="toggleMode('light')"
              v-else
              size="1.5x"
              class=""
            ></sun-icon>
          </nuxt-link>
        </li>
        <li class="nav-item b-nav-dropdown dropdown dropdown-user">
          <b-nav-item-dropdown
            right
            toggle-class="d-flex align-items-center dropdown-user-link"
            class="dropdown-user"
          >
            <template #button-content>
              <div class="d-sm-flex d-none user-nav">
                <p class="user-name font-weight-bolder mb-0">
                  {{ $auth.user.name }}
                </p>
                <span class="user-status">{{ $auth.user.role }}</span>
                <!-- <span class="user-status">{{ $t("navbar.admin") }}</span> -->
              </div>
              <b-avatar
                size="40"
                :src="url"
                variant="light-primary"
                badge
                class="badge-minimal"
                badge-variant="success"
              >
                <user-icon v-if="!url" size="1.5x" class=""></user-icon>
              </b-avatar>
            </template>

            <b-dropdown-item
              :to="localePath('/panel/profile')"
              link-class="d-flex align-items-center"
            >
              <user-icon size="1.5x" class="ms-2"></user-icon>
              <span>{{ $t("navbar.profile") }}</span>
            </b-dropdown-item>

            <b-dropdown-divider />

            <!-- <b-dropdown-item
              :to="{ name: '' }"
              link-class="d-flex align-items-center"
            >
              <settings-icon size="1.5x" class="ms-2"></settings-icon>
              <span>{{ $t("navbar.setting") }}</span>
            </b-dropdown-item> -->
            <b-dropdown-item
              link-class="d-flex align-items-center"
              @click="$auth.logout()"
            >
              <log-out-icon size="1.5x" class="ms-2"></log-out-icon>
              <span>{{ $t("navbar.logout") }}</span>
            </b-dropdown-item></b-nav-item-dropdown
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  DiscIcon,
  CircleIcon,
  MoreHorizontalIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  AlignJustifyIcon,
} from "vue-feather-icons";
export default {
  props: ["width"],
  data() {
    return {
      view: false,
      currentLang: "",
      locales: [
        {
          locale: "ar",
          img: require("/assets/images/flags/ar.png"),
          name: "Arabic",
        },
        {
          locale: "en",
          img: require("/assets/images/flags/en.png"),
          name: "English",
        },
      ],
    };
  },
  methods: {
    toggleLayoutCollapsed() {
      this.$store.dispatch("toggleLayoutCollapsed", this.width);
      this.$store.dispatch("logoWidth");
    },
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
      this.currentLang = lang;
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
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    lang() {
      return (this.currentLang = this.$cookies.get(this.$config.i18nKey));
    },
    url() {
      let url = `${this.$config.NODE_URL_images}/users/${this.$auth.user.photo}`;
      return url;
    },
  },
  filters: {
    languageName(value) {
      switch (value) {
        case "ar":
          return (value = "Arabic");
          break;
        case "en":
          return (value = "English");
          break;
        default:
          break;
      }
    },
  },
  components: {
    DiscIcon,
    CircleIcon,
    MoreHorizontalIcon,
    HomeIcon,
    MoonIcon,
    SunIcon,
    UserIcon,
    SettingsIcon,
    LogOutIcon,
    AlignJustifyIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
