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
  async showSingleData({ commit, rootState }, payload) {
    console.warn("payload", payload);
    let allCheckout = await rootState.landing.checkout.checkoutDataLocal;
    let find = await allCheckout.find((x) => x._id == payload._id);
    if (find) {
      payload.checkout = true;
    }
    await commit("singleData", payload);
  },

  async related({ commit, dispatch }, payload) {
    await commit("related", payload);
  },

  async getAllDataFromApi({ commit, dispatch }, payload) {
    await commit("setAllData", payload.data.data);
    await commit("setTotalItems", payload.total);
    await dispatch("activeWishList");
    await dispatch("getCheckoutToActive");
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
    await dispatch("getCheckoutToActive");
  },

  async toggleProductInWishlist({ commit, dispatch, rootState }, payload) {
    const user = await rootState.auth.user;
    let userData = await JSON.parse(JSON.stringify(user));
    let data = { wishList: payload.data._id };

    if (!payload.action) {
      await userData.wishList.push(payload.data);
      await dispatch("toggleProductInUserWishlist", {
        id: data,
        data: userData,
        url: "/users/updateWishList",
      });
    } else {
      let filter = await userData.wishList.filter(
        (x) => x._id != payload.data._id
      );
      userData.wishList = await filter;
      await dispatch("toggleProductInUserWishlist", {
        id: data,
        data: userData,
        url: "/users/removeFromWishList",
      });
    }
  },

  async toggleProductInUserWishlist({ dispatch }, { id, data, url }) {
    await this.$auth.setUser(data);
    await dispatch("activeWishList");
    await this.$axios.$patch(url, id);
    // await this.$auth.fetchUser();
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
    // console.warn("payload with new", payload);
    // return;
    if (rootState.auth.loggedIn) {
      let user = rootState.auth.user._id;
      let product = payload.data._id;
      let data = {
        user,
        product: payload.data,
        productNumber: 1,
        subTotal: "0",
        total: "0",
        color: payload.color.color,
        dimensionId: payload.dimension._id,
        // arabicDimension: payload.dimension.arabicDimension,
        // englishDimension: payload.dimension.englishDimension,
        // dimensionPrice: payload.dimension.price,
      };
      await dispatch("landing/checkout/pushToCheckoutData", data, {
        root: true,
      });
      await dispatch("getCheckoutToActive");
      await this.$axios.$post(`/carts`, {
        user,
        product,
        color: payload.color.color,
        dimensionId: payload.dimension._id,
        // dimension: payload.dimension.dimension,
        // dimensionPrice: payload.dimension.price,
      });
    } else {
      dispatch("storeProductInLocalDB", payload);
    }
  },

  async storeProductInLocalDB({ dispatch }, payload) {
    // console.warn("payload with new local", payload);
    let checkout = [];
    let val = this.$cookies.get("lakoHouseCart") || [];
    val = [
      ...val,
      {
        id: payload.data._id,
        number: 1,
        dimensionId: payload.dimension._id,
        color: payload.color
          ? payload.color.color
          : payload.data.woodColors.image,
      },
    ];
    await this.$cookies.set("lakoHouseCart", val);

    await val.forEach((x) => checkout.push(x.id));
    await dispatch("activeCheckout", checkout);
  },

  async getCheckoutToActive({ state, commit, rootState, dispatch }, payload) {
    let checkout = [];
    if (rootState.auth.loggedIn) {
      await rootState.landing.checkout.checkoutData.forEach((x) =>
        checkout.push(x.product._id)
      );
    } else {
      let data = (await this.$cookies.get("lakoHouseCart")) || [];
      await data.forEach((x) => checkout.push(x.id));
    }
    await dispatch("activeCheckout", checkout);
  },

  async activeCheckout({ state, commit, rootState }, payload) {
    let allData = JSON.parse(JSON.stringify(state.allData));

    function getInCheckout(array1, array2) {
      return array1.filter((object1) => {
        return array2?.some((object2) => {
          return object1._id === object2;
        });
      });
    }

    if (!payload.length) return;

    let exist = await getInCheckout(allData, payload);

    await exist.forEach((x) => (x.checkout = true));

    await allData.map((x) => exist.find((y) => y._id === x._id) || x);
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
