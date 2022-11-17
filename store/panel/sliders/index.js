const reset = () => ({
  imageCover: null,
});

export const state = () => ({
  module: "/sliders",
  allData: [],
  totalItems: null,
  data: {
    imageCover: null,
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  imageCover(state) {
    return state.data.imageCover;
  },
};

export const actions = {
  getAllDataFromApi({ commit }, payload) {
    commit("setAllData", payload.data.data);
    commit("setTotalItems", payload.total);
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
    commit("setPreviewImages", payload.imageCover);
  },

  async addDataToDB({ state, dispatch, rootState }) {
    let data = await dispatch(
      "handleFormData",
      { ...state.data },
      {
        root: true,
      }
    );
    return this.$axios.$post(state.module, data);
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
  setData(state, val) {
    state.data = val;
  },
  imageCover(state, val) {
    state.data[val.key] = val.value;
  },
};
