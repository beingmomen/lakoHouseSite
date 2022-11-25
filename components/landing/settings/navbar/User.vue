<template>
  <li class="nav-item b-nav-dropdown dropdown dropdown-user">
    <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
    >
      <template #button-content>
        <div class="d-sm-flex d-none user-nav">
          <p class="user-name font-weight-bolder ms-3 mb-0">
            <span v-if="$auth.user" class="fs-4">{{ $auth.user.name }}</span>
            <!-- <span v-else>Lako House</span> -->
          </p>
          <span v-if="$auth.user" class="user-status ms-3 fs-5">
            {{ $auth.user.role }}
          </span>
        </div>
        <!-- :src="url" -->
        <!-- :src="url" -->
        <b-avatar
          v-if="$auth.loggedIn"
          size="60"
          :src="url"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
        >
          <!-- <user-icon v-if="!url" size="1.5x" class=""></user-icon> -->
        </b-avatar>
        <b-avatar
          v-else
          size="40"
          variant="light-primary"
          :src="require('/assets/images/lako.svg')"
          badge
          class="badge-minimal badge-minimal-style"
          badge-variant="success"
        >
          <!-- <user-icon size="1.5x" class=""></user-icon> -->
        </b-avatar>
      </template>

      <b-dropdown-item
        v-if="$auth.loggedIn"
        :to="localePath('/profile')"
        link-class="d-flex align-items-center"
      >
        <user-icon size="1.5x" class="ms-2 icon-style"></user-icon>
        <span class="fs-5">{{ $t("navbar.profile") }}</span>
      </b-dropdown-item>

      <b-dropdown-divider v-if="$auth.loggedIn" />

      <!-- <b-dropdown-item to="/settings" link-class="d-flex align-items-center">
        <settings-icon size="1.5x" class="ms-2"></settings-icon>
        <span>{{ $t("navbar.setting") }}</span>
      </b-dropdown-item> -->

      <b-dropdown-item
        link-class="d-flex align-items-center"
        v-if="dashboardMode"
        @click="toggleMode('dark')"
      >
        <moon-icon size="1.5x" class="ms-2 icon-style"></moon-icon>
        <span class="fs-5">{{ $t("navbar.dark") }}</span>
      </b-dropdown-item>
      <b-dropdown-item
        link-class="d-flex align-items-center"
        v-else
        @click="toggleMode('light')"
      >
        <sun-icon size="1.5x" class="ms-2 icon-style"></sun-icon>
        <span class="fs-5">{{ $t("navbar.light") }}</span>
      </b-dropdown-item>

      <!-- <b-dropdown-item
        v-if="dashDir == 'ltr'"
        link-class="d-flex align-items-center"
        @click="switchLang('ar'), $i18n.setLocale('ar')"
      >
        <globe-icon size="1.5x" class="ms-2 icon-style"></globe-icon>
        <span class="fs-5">{{
          dashDir == "ltr" ? "Arabic" : "الإنجليزية"
        }}</span>
      </b-dropdown-item>
      <b-dropdown-item
        v-else
        link-class="d-flex align-items-center"
        @click="switchLang('en'), $i18n.setLocale('en')"
      >
        <globe-icon size="1.5x" class="ms-2 icon-style"></globe-icon>
        <span class="fs-5">{{
          dashDir == "ltr" ? "Arabic" : "الإنجليزية"
        }}</span>
      </b-dropdown-item> -->

      <b-dropdown-item
        v-if="$auth.$state.user"
        link-class="d-flex align-items-center"
        @click="$auth.logout()"
      >
        <log-out-icon size="1.5x" class="ms-2 icon-style"></log-out-icon>
        <span class="fs-5">{{ $t("navbar.logout") }}</span>
      </b-dropdown-item>
      <b-dropdown-item
        v-else
        :to="localePath('/login')"
        link-class="d-flex align-items-center"
      >
        <log-in-icon size="1.5x" class="ms-2 icon-style"></log-in-icon>
        <span class="fs-5">{{ $t("navbar.login") }}</span>
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </li>
</template>

<script>
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  GlobeIcon,
  LogInIcon,
} from "vue-feather-icons";
export default {
  data() {
    return {
      currentLang: "",
    };
  },
  computed: {
    url() {
      let url = `${this.$config.NODE_URL_images}/users/${this.$auth.user.photo}`;
      return url;
    },
    lang() {
      return (this.currentLang = this.$cookies.get(this.$config.i18nKey));
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
    UserIcon,
    SettingsIcon,
    LogOutIcon,
    MoonIcon,
    SunIcon,
    GlobeIcon,
    LogInIcon,
  },
};
</script>

<style lang="scss" scoped>
.icon-style {
  height: 20px !important;
  width: 22px !important;
}
</style>
