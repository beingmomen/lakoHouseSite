const reset = () => ({
  name: null,
  description: null,
  price: null,
  discount: null,
  imageCover: null,
  images: null,
  category: null,
  colors: null,
  store: null,
});

export const state = () => ({
  module: "/products",
  allData: [],
  totalItems: null,
  previewImageCover: null,
  previewImages: null,
  data: {
    name: null,
    description: null,
    price: null,
    discount: null,
    imageCover: null,
    images: null,
    category: null,
    shippingDate: null,
    colors: null,
    store: null,
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  getPreviewImageCover(state) {
    return state.previewImageCover;
  },
  getPreviewImages(state) {
    return state.previewImages;
  },
  name(state) {
    return state.data.name;
  },
  description(state) {
    return state.data.description;
  },
  price(state) {
    return state.data.price;
  },
  discount(state) {
    return state.data.discount;
  },
  imageCover(state) {
    return state.data.imageCover;
  },
  images(state) {
    return state.data.images;
  },
  category(state) {
    return state.data.category;
  },
  shippingDate(state) {
    return state.data.shippingDate;
  },
  colors(state) {
    return state.data.colors;
  },
  store(state) {
    return state.data.store;
  },
};

export const actions = {
  getAllDataFromApi({ commit }, payload) {
    commit("setAllData", payload.data.data);
    commit("setTotalItems", payload.total);
  },

  getDataByQuery({ state, commit }, payload) {
    this.$axios
      .$get(state.module, {
        params: {
          page: payload.page,
          search: payload.search,
        },
      })
      .then((res) => {
        if (res.data.data.length) {
          commit("setAllData", res.data.data);
          commit("setTotalItems", res.total);
        } else {
          this.$toast.info("No data to show");
        }
      });
  },

  async showSingleData({ commit }, payload) {
    commit("name", { key: "name", value: payload.name });
    commit("description", { key: "description", value: payload.description });
    commit("price", { key: "price", value: payload.price });
    commit("discount", { key: "discount", value: payload.discount });
    commit("category", { key: "category", value: payload.category._id });
    commit("colors", { key: "colors", value: payload.colors });
    commit("store", { key: "store", value: payload.store });
    commit("shippingDate", {
      key: "shippingDate",
      value: payload.shippingDate,
    });
    commit("setPreviewImageCover", payload.imageCover);
    commit("setPreviewImages", payload.images);
  },

  async addDataToDB({ state, dispatch, rootState }) {
    const user = rootState.auth.user._id;
    let data = await dispatch(
      "handleFormData",
      { ...state.data, user },
      {
        root: true,
      }
    );
    return this.$axios.$post(state.module, data);
  },

  async updateDataInDB({ state, dispatch }, payload) {
    let del = ["colors"];
    let colors = [];
    state.data.colors.forEach((x) => colors.push(x._id));
    del.forEach((x) => delete state.data[x]);
    let data = await dispatch(
      "handleFormData",
      { ...state.data, colors },
      {
        root: true,
      }
    );
    return this.$axios.$patch(`${state.module}/${payload}`, data);
  },

  colorChange({ state, dispatch }, payload) {
    console.warn("payload color", payload);
  },

  deleteFromDB({ state }, payload) {
    return this.$axios.$delete(`${state.module}/${payload}`);
  },

  resetData({ commit }, payload) {
    commit("setData", reset());
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
  setTotalItems(state, val) {
    state.totalItems = val;
  },
  setPreviewImageCover(state, val) {
    state.previewImageCover = val;
  },
  setPreviewImages(state, val) {
    state.previewImages = val;
  },
  setData(state, val) {
    state.data = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  description(state, val) {
    state.data[val.key] = val.value;
  },
  price(state, val) {
    state.data[val.key] = val.value;
  },
  discount(state, val) {
    state.data[val.key] = val.value;
  },
  imageCover(state, val) {
    state.data[val.key] = val.value;
  },
  images(state, val) {
    state.data[val.key] = val.value;
  },
  category(state, val) {
    state.data[val.key] = val.value;
  },
  shippingDate(state, val) {
    state.data[val.key] = val.value;
  },
  colors(state, val) {
    state.data[val.key] = val.value;
  },
  store(state, val) {
    state.data[val.key] = val.value;
  },
};
