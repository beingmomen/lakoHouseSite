<template>
  <Nuxt />
</template>

<script>
export default {
  name: "auth",
  middleware: ["login", "mode", "lang"],

  // watch: {
  //   $route(newValue, oldValue) {
  //     const html = document.documentElement;
  //     if (newValue.name.includes("__ar")) {
  //       html.classList.add("arabic-dir");
  //       html.classList.remove("english-dir");
  //       html.setAttribute("dir", "rtl");
  //       html.setAttribute("lang", "ar");
  //       this.$store.dispatch("changeDashDir", "ar");
  //     } else {
  //       html.classList.add("english-dir");
  //       html.classList.remove("arabic-dir");
  //       html.setAttribute("dir", "ltr");
  //       html.setAttribute("lang", "en");
  //       this.$store.dispatch("changeDashDir", "en");
  //     }
  //   },
  // },
};
</script>
