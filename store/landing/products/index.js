export const state = () => ({
  module: "/categories",
  singleData: {},
  allData: [],
  related: [],
  totalItems: null,
  topProductPrice: null,
  page: 1,
  priceRange: null,
  color: null,
  search: null,
});

export const getters = {
  singleData(state) {
    return state.singleData;
  },
  getAllData(state) {
    return state.allData;
  },
  related(state) {
    return state.related;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  getTopProductPrice: (state) => {
    return state.topProductPrice;
  },
  color: (state) => {
    return state.color;
  },
  search: (state) => {
    return state.search;
  },
};

export const actions = {
  async showSingleData({ commit, dispatch }, payload) {
    await commit("singleData", payload);
  },

  async related({ commit, dispatch }, payload) {
    await commit("related", payload);
  },

  async getAllDataFromApi({ commit, dispatch }, payload) {
    await commit("setAllData", payload.data.data);
    await commit("setTotalItems", payload.total);
    await dispatch("activeWishList");
    await dispatch("activeCheckout");
  },

  getTopProductPrice({ commit }, payload) {
    if (payload.results) {
      commit("updateTopProductPrice", payload.data.data[0].price);
    }
  },

  async getDataByQuery({ state, commit, dispatch }, payload) {
    await this.$axios
      .$get(
        `${state.module}/${payload}/products?price[lte]=${
          state.priceRange || state.topProductPrice
        }`,
        {
          params: {
            page: state.page,
            limit: 9,
            colors: state.color,
            search: state.search,
            sort: "-createdAt",
          },
        }
      )
      .then((res) => {
        commit("setAllData", res.data.data);
        commit("setTotalItems", res.total);
      });
    await dispatch("activeWishList");
    await dispatch("activeCheckout");
  },

  async toggleProductInWishlist({ commit, dispatch }, payload) {
    let data = { wishList: payload.id };
    if (!payload.action) {
      await this.$axios.$patch(`/users/updateWishList`, data);
    } else {
      await this.$axios.$patch(`/users/removeFromWishList`, data);
    }
    await this.$auth.fetchUser();
    await dispatch("activeWishList");
  },

  async activeWishList({ state, commit, dispatch, rootState }, payload) {
    if (!rootState.auth.loggedIn) return;
    const wishList = rootState.auth.user.wishList;
    let allData = JSON.parse(JSON.stringify(state.allData));

    allData.forEach((x) => (x.wishList = false));

    function getInWishlist(array1, array2) {
      return array1.filter((object1) => {
        return array2.some((object2) => {
          return object1._id === object2._id;
        });
      });
    }

    let exist = getInWishlist(allData, wishList);

    exist.forEach((x) => (x.wishList = true));

    allData.map((x) => exist.find((y) => y._id === x._id) || x);

    await commit("setAllData", allData);
  },

  async handleCartActionClick({ state, commit, dispatch, rootState }, payload) {
    if (rootState.auth.loggedIn) {
      let user = rootState.auth.user._id;
      let product = payload._id;
      await this.$axios.$post(`/carts`, { user, product });
      await dispatch("landing/checkout/getAllCartsByUserId", "", {
        root: true,
      });
      await dispatch("activeCheckout");
    } else {
      let val = this.$auth.$storage.getCookie("lakoHouseCart") || [];

      if (val.length == "2") {
        this.$toast.error(
          rootState.dashDir == "ltr"
            ? "You can not add more than 2 product in cart"
            : " قم بتسجيل الدخول لتتمكن من إضافة منتجات أكثر"
        );
        return;
      }
      val = [...val, payload];

      await this.$auth.$storage.setCookie("lakoHouseCart", val, true);
      await dispatch("activeCheckout");
    }
  },

  async activeCheckout({ state, commit, rootState, dispatch }, payload) {
    // let id = rootState.auth.user._id;
    let checkout = null;
    let allData = JSON.parse(JSON.stringify(state.allData));
    allData.forEach((x) => (x.checkout = false));

    if (rootState.auth.loggedIn) {
      checkout = await rootState.landing.checkout.checkoutData;

      function getInCheckout(array1, array2) {
        return array1.filter((object1) => {
          return array2?.some((object2) => {
            return object1._id === object2.product._id;
          });
        });
      }

      let exist = await getInCheckout(allData, checkout);

      await exist.forEach((x) => (x.checkout = true));

      await allData.map((x) => exist.find((y) => y._id === x._id) || x);
    } else {
      checkout = this.$auth.$storage.getCookie("lakoHouseCart") || [];

      function getInCheckout(array1, array2) {
        return array1.filter((object1) => {
          return array2?.some((object2) => {
            return object1._id === object2._id;
          });
        });
      }

      if (!checkout.length) return;

      let exist = getInCheckout(allData, checkout);

      exist.forEach((x) => (x.checkout = true));

      allData.map((x) => exist.find((y) => y._id === x._id) || x);
    }

    await commit("setAllData", allData);
  },
};

export const mutations = {
  singleData(state, val) {
    state.singleData = val;
  },
  setAllData(state, val) {
    state.allData = val;
  },
  related(state, val) {
    state.related = val;
  },
  setTotalItems(state, val) {
    state.totalItems = val;
  },

  updateTopProductPrice(state, payload) {
    state.topProductPrice = payload;
  },
  page(state, payload) {
    state.page = payload;
  },
  priceRange(state, payload) {
    state.priceRange = payload;
  },
  color(state, payload) {
    state.color = payload;
  },
  search(state, payload) {
    state.search = payload;
  },
};
