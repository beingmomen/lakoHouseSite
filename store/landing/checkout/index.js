export const state = () => ({
  module: "/checkout",
  allData: [],
  checkoutDataLocal: [],
  checkoutData: [],
  subTotalPrice: 0,
  totalPrice: 0,
  countryIso: null,
  data: {
    name: null,
    email: null,
    country: null,
    state: null,
    city: null,
    street: null,
    phone: null,
    phoneCode: "(000)",
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  checkoutDataLocal(state) {
    let uniqueArray = [...new Set(state.checkoutDataLocal)];
    return uniqueArray;
  },
  checkoutData(state) {
    let uniqueArray = [...new Set(state.checkoutData)];
    return uniqueArray;
  },
  subTotalPrice(state) {
    return state.subTotalPrice;
  },
  totalPrice(state) {
    return state.totalPrice;
  },
  name(state) {
    return state.data.name;
  },
  email(state) {
    return state.data.email;
  },
  country(state) {
    return state.data.country;
  },
  state(state) {
    return state.data.state;
  },
  city(state) {
    return state.data.city;
  },
  street(state) {
    return state.data.street;
  },
  phone(state) {
    return state.data.phone;
  },
  phoneCode(state) {
    return state.data.phoneCode;
  },
};

export const actions = {
  async getAllCartsByUserId({ rootState, dispatch }, payload) {
    let id = await rootState.auth.user._id;
    await this.$axios.$get(`/users/${id}/carts`).then((res) => {
      dispatch("getAllProductsInCheckout", res.data.data);
    });
  },

  async getManyProductsByIds({ dispatch }, payload) {
    let ids = [];
    await payload.forEach((x) => ids.push(x.id));
    await this.$axios.$post(`/products/getMany`, { ids }).then((res) => {
      dispatch("calcProductNumberInLocalDB", res.data.data);
      // dispatch("getAllProductsInCheckoutLocal", res.data.data);
    });
  },

  async getAllProductsInCheckout({ commit, dispatch, rootState }, payload) {
    if (!rootState.auth.loggedIn) return;
    await commit("checkoutData", payload);
    await dispatch("calcAllProductsPrice");
    // await commit("setTotalItems", payload.total);
  },

  async pushToCheckoutData({ commit, dispatch }, payload) {
    await commit("pushCheckoutData", payload);
    await dispatch("calcAllProductsPrice");
  },

  async calcAllProductsPrice({ state, commit }, payload) {
    let checkoutData = await JSON.parse(JSON.stringify(state.checkoutData));

    if (!checkoutData.length) return;

    let subTotalPrice = [];
    let totalPrice = [];

    await checkoutData.forEach((x) => {
      let number = x.productNumber;
      let price = parseInt(
        x.product.price - (x.product.price * x.product.discount) / 100
      );
      let subTotal = number * x.product.price;
      let total = number * price;
      x.subTotal = subTotal;
      x.total = total;

      subTotalPrice.push(+x.subTotal);
      totalPrice.push(+total);
    });

    let sumSubTotalPrice = await subTotalPrice.reduce((x, y) => x + y);
    let sumTotalPrice = await totalPrice.reduce((x, y) => x + y);

    await commit("subTotalPrice", sumSubTotalPrice);
    await commit("totalPrice", sumTotalPrice);
    await commit("checkoutData", checkoutData || []);
  },

  async calcProductNumberInLocalDB({ dispatch }, payload) {
    let cookieData = this.$cookies.get("lakoHouseCart");

    await payload.forEach((x) => {
      cookieData.forEach((y) => {
        if (x._id == y.id) {
          x.buyNumber = y.number;
        }
      });
    });

    await dispatch("getAllProductsInCheckoutLocal", payload);
  },

  getAllProductsInCheckoutLocal({ commit, rootState }, payload) {
    if (rootState.auth.loggedIn) return;

    if (payload.length) {
      let subTotalPrice = [];
      let totalPrice = [];

      payload.forEach((x) => {
        let number = x.buyNumber;
        let price = parseInt(x.price - (x.price * x.discount) / 100);
        let subTotal = number * x.price;
        let total = number * price;
        x.subTotal = subTotal;
        x.total = total;

        subTotalPrice.push(+x.subTotal);
        totalPrice.push(+total);
      });

      let sumSubTotalPrice = subTotalPrice.reduce((x, y) => x + y);
      let sumTotalPrice = totalPrice.reduce((x, y) => x + y);

      commit("subTotalPrice", sumSubTotalPrice);
      commit("totalPrice", sumTotalPrice);
    }

    commit("checkoutDataLocal", payload || []);
  },

  async changeProductNumber({ commit, state, dispatch, rootState }, payload) {
    if (rootState.auth.loggedIn) {
      dispatch("changeProductNumberInServerDB", payload);
    } else {
      dispatch("changeProductNumberInLocalDB", payload);
    }
  },

  async changeProductNumberInServerDB({ state, dispatch }, payload) {
    let allData = JSON.parse(JSON.stringify(state.checkoutData));
    await allData.forEach((x) => {
      if (x._id == payload.product._id) {
        x.productNumber = payload.value;
      }
    });
    await dispatch("getAllProductsInCheckout", allData);
    await this.$axios.$patch(`/carts/${payload.product._id}`, {
      productNumber: payload.value,
    });
  },

  async changeProductNumberInLocalDB({ state, dispatch }, payload) {
    // Change In DB
    let cookieData = this.$cookies.get("lakoHouseCart");
    let find = cookieData.find((x) => x.id == payload.product._id);
    find.number = payload.value;
    this.$cookies.set("lakoHouseCart", cookieData);

    // Current Change In Store
    let allData = JSON.parse(JSON.stringify(state.checkoutDataLocal));
    let findInStore = allData.find((x) => x._id == payload.product._id);
    findInStore.buyNumber = payload.value;
    dispatch("getAllProductsInCheckoutLocal", allData);
  },

  saveOrderInDB({ state, commit, rootState }, payload) {
    let data = {};
    let products = [];
    if (rootState.auth.loggedIn) {
      let ids = [];
      state.checkoutData.forEach((x) => {
        console.warn("x", x);
        products.push({
          item: x.product._id,
          quantity: x.productNumber,
          orderPrice: x.product.price,
          orderDiscount: x.product.discount,
          orderPriceDiscount: parseInt(
            x.product.price - (x.product.price * x.product.discount) / 100
          ),
        });
      });
      state.checkoutData.forEach((x) => ids.push(x._id));

      data = {
        ...state.data,
        products,
        total: state.totalPrice,
        subTotal: state.subTotalPrice,
      };

      console.warn("data login", data);

      this.$axios
        .$post(`orders`, data)
        .then((res) => {
          this.$toast.success(
            rootState.dashDir == "ltr"
              ? "The order has been saved and sent"
              : "تم حفظ وارسال الطلب"
          );
          commit("checkoutData", []);
          this.$router.push(this.localePath("/"));
        })
        .then(() => {
          this.$axios.$patch(`carts`, ids);
        });
    } else {
      state.checkoutDataLocal.forEach((x) =>
        products.push({
          item: x._id,
          quantity: x.buyNumber,
          orderPrice: x.price,
          orderPriceDiscount: parseInt(x.price - (x.price * x.discount) / 100),
        })
      );

      data = {
        ...state.data,
        products,
        total: state.totalPrice,
        subTotal: state.subTotalPrice,
      };

      this.$axios.$post(`orders`, data).then((res) => {
        this.$toast.success(
          rootState.dashDir == "ltr"
            ? "The order has been saved and sent"
            : "تم حفظ وارسال الطلب"
        );
        this.$cookies.remove("lakoHouseCart");
        commit("checkoutDataLocal", []);
        this.$router.push(this.localePath("/"));
      });
    }
  },

  saveMainAddressOrderInDB({ state, commit, rootState }, payload) {
    let obj = JSON.parse(JSON.stringify(payload));
    let del = ["_id", "__v"];

    del.forEach((x) => delete obj[x]);

    let data = {};
    let products = [];
    let ids = [];
    state.checkoutData.forEach((x) =>
      products.push({
        item: x.product._id,
        quantity: x.productNumber,
        orderPrice: x.product.price,
        orderDiscount: x.product.discount,
        orderPriceDiscount: parseInt(
          x.product.price - (x.product.price * x.product.discount) / 100
        ),
      })
    );
    state.checkoutData.forEach((x) => ids.push(x._id));

    data = {
      ...obj,
      products,
      total: state.totalPrice,
      subTotal: state.subTotalPrice,
    };

    this.$axios
      .$post(`orders`, data)
      .then((res) => {
        this.$toast.success(
          rootState.dashDir == "ltr"
            ? "The order has been saved and sent"
            : "تم حفظ وارسال الطلب"
        );
        commit("checkoutData", []);
        this.$router.push(this.localePath("/"));
      })
      .then(() => {
        this.$axios.$patch(`carts`, ids);
      });
  },

  async removeProductFromCartClick(
    { dispatch, state, commit, rootState },
    payload
  ) {
    if (rootState.auth.loggedIn) {
      let allData = JSON.parse(JSON.stringify(state.checkoutData));
      let filter = allData.filter((x) => x._id != payload._id);
      commit("checkoutData", filter);

      await this.$axios.$delete(`/carts/${payload._id}`);
      await dispatch("getAllCartsByUserId");
    } else {
      dispatch("removeCheckoutFromLocalDB", payload);
    }
  },

  async removeCheckoutFromLocalDB({ dispatch }, payload) {
    let cookieData = this.$cookies.get("lakoHouseCart");
    let filter = cookieData.filter((x) => x.id !== payload._id);
    this.$cookies.set("lakoHouseCart", filter);
    await dispatch("getManyProductsByIds", filter);
  },

  async countryChange({ dispatch, commit, state }, payload) {
    this.$axios
      .$get(
        `https://api.countrystatecity.in/v1/countries/${payload.iso2}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
          },
        }
      )
      .then((res) => {
        dispatch("global/updateStatesByCountryList", res, { root: true });
        commit("countryIso", payload.iso2);
        return payload.iso2;
      })
      .then((data) => {
        this.$axios
          .$get(`https://api.countrystatecity.in/v1/countries/${data}`, {
            headers: {
              "X-CSCAPI-KEY":
                "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
            },
          })
          .then((res) => {
            commit("phoneCode", { key: "phoneCode", value: res.phonecode });
          });
      });
  },
  async stateChange({ dispatch, commit, state }, payload) {
    this.$axios
      .$get(
        `https://api.countrystatecity.in/v1/countries/${state.countryIso}/states/${payload.iso2}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
          },
        }
      )
      .then((res) => {
        dispatch("global/updateCitiesByStatesList", res, { root: true });
      });
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
  // setTotalItems(state, val) {
  //   state.totalItems = val;
  // },
  checkoutDataLocal(state, val) {
    state.checkoutDataLocal = val;
  },
  checkoutData(state, val) {
    state.checkoutData = val;
  },
  pushCheckoutData(state, val) {
    state.checkoutData.push(val);
  },
  subTotalPrice(state, val) {
    state.subTotalPrice = val;
  },
  totalPrice(state, val) {
    state.totalPrice = val;
  },
  countryIso(state, val) {
    state.countryIso = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  email(state, val) {
    state.data[val.key] = val.value;
  },
  currentCountry(state, val) {
    state.data[val.key] = val.value;
  },
  country(state, val) {
    state.data[val.key] = val.value.name;
    state.data.state = null;
    state.data.city = null;
  },
  currentState(state, val) {
    state.data[val.key] = val.value;
  },
  state(state, val) {
    state.data[val.key] = val.value.name;
    state.data.city = null;
  },
  currentCity(state, val) {
    state.data[val.key] = val.value;
  },
  city(state, val) {
    state.data[val.key] = val.value.name;
  },
  street(state, val) {
    state.data[val.key] = val.value;
  },
  phone(state, val) {
    state.data[val.key] = val.value;
  },
  phoneCode(state, val) {
    state.data[val.key] = val.value;
  },
};
