<template>
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
          :src="require(`/assets/images/flags/${currentLang || lang}.png`)"
          height="14px"
          width="22px"
          alt="English"
        />
        <span class="ms-2 text-body ttttttttttt">{{
          currentLang || lang | languageName
        }}</span>
      </template>
      <b-dropdown-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click.native="switchLang(locale.code), $i18n.setLocale(locale.code)"
      >
        <b-link
          class="
            lang-name
            d-flex
            align-items-center
            cursor-pointer
            text-secondary
          "
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
          </p>
        </b-link>
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </li>
</template>

<script>
export default {
  data() {
    return {
      currentLang: "",
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    lang() {
      return (this.currentLang = this.$cookies.get(this.$config.i18nKey));
    },
  },
  methods: {
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
};
</script>

<style lang="scss" scoped>
</style>
