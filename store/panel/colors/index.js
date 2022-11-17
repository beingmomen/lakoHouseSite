const reset = () => ({
  color: "#607C8A",
});

export const state = () => ({
  module: "/colors",
  allData: [],
  totalItems: null,
  data: {
    color: "#607C8A",
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  color(state) {
    return state.data.color;
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
    commit("color", { key: "color", value: payload.color });
  },

  async addDataToDB({ state, dispatch }) {
    return this.$axios.$post(state.module, state.data);
  },

  async updateDataInDB({ state, dispatch }, payload) {
    return this.$axios.$patch(`${state.module}/${payload}`, state.data);
  },

  resetData({ commit }, payload) {
    commit("setData", reset());
  },

  deleteFromDB({ state }, payload) {
    return this.$axios.$delete(`${state.module}/${payload}`);
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },

  setData(state, val) {
    state.data = val;
  },
  setTotalItems(state, val) {
    state.totalItems = val;
  },
  color(state, val) {
    state.data[val.key] = val.value;
  },
};
