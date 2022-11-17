export const state = () => ({
  layoutCollapsed: true,
  sidebar: false,
  mode: true,
  logoWidth: true,
  dashDir: "ltr",
  productsFilters: false,
  productStyle: "grid-view",
});

export const getters = {
  getLayoutCollapsed(state) {
    return state.layoutCollapsed;
  },
  getSidebar(state) {
    return state.sidebar;
  },
  getMode(state) {
    return state.mode;
  },
  getLogoWidth(state) {
    return state.logoWidth;
  },
  getDashDir(state) {
    return state.dashDir;
  },
  getProductsFilters(state) {
    return state.productsFilters;
  },
  getProductStyle(state) {
    return state.productStyle;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await this.$axios.$get(`/categories`).then((res) => {
      dispatch("landing/getAllCategories", res.data.dataPopulated);
    });
    // &discount[gte]=50
    await this.$axios.$get(`/products?sort=-discount`).then((res) => {
      dispatch("landing/getTopProducts", res.data.data);
    });
    await this.$axios.$get(`/colors`).then((res) => {
      dispatch("global/getAllColors", res.data.data);
    });
    // await this.$axios
    //   .$get("https://api.countrystatecity.in/v1/countries", {
    //     headers: {
    //       "X-CSCAPI-KEY":
    //         "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
    //     },
    //   })
    //   .then((res) => {
    //     console.warn("res", res);
    //     // dispatch("global/getAllColors", res);
    //   });
  },
  toggleLayoutCollapsed({ dispatch, commit, state }, payload) {
    if (payload > 1200) {
      commit("setLayoutCollapsed", state.layoutCollapsed ? false : true);
    } else {
      dispatch("hideSidebar");
    }
  },
  toggleProductsFilters({ dispatch, commit, state }, payload) {
    commit("setProductsFilters", payload);
  },
  hideSidebar({ commit, state }) {
    commit("setSidebar", state.sidebar ? false : true);
  },
  layoutMode({ commit }, payload) {
    commit("setMode", payload == "light" ? true : false);
  },
  changeDashDir({ commit }, payload) {
    if (payload == "ar") {
      commit("setDashDir", "rtl");
    } else {
      commit("setDashDir", "ltr");
    }
  },
  showSuccessMsg({}, payload) {
    this.$toast.success(payload);
  },
  logoWidth({ state, commit }, payload) {
    const width = state.logoWidth ? false : true;
    commit("setLogoWidth", width);
  },
  handleFormData({}, payload) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((x, i) => {
            formData.append(key, x);
          });
        } else {
          formData.append(key, value);
        }
      }
    }
    return formData;
  },
  handleError({ state }, payload) {
    let errors = [];
    for (const [key, value] of Object.entries(payload)) {
      errors.push(...value);
    }
    errors.forEach((el) => {
      // console.warn("error", el.split("#&&"));
      if (state.dashDir == "ltr") {
        this.$toast.error(el.split("#&&")[0].toString());
      } else {
        this.$toast.error(el.split("#&&")[1].toString());
      }
    });
  },
};

export const mutations = {
  setLayoutCollapsed(state, val) {
    state.layoutCollapsed = val;
  },
  setSidebar(state, val) {
    state.sidebar = val;
  },
  setMode(state, val) {
    state.mode = val;
  },
  setLogoWidth(state, val) {
    state.logoWidth = val;
  },
  setDashDir(state, val) {
    state.dashDir = val;
  },
  setProductsFilters(state, val) {
    state.productsFilters = val;
  },
  setProductStyle(state, val) {
    state.productStyle = val;
  },
};
