export const state = () => ({
  module: "/messages",
  allData: [],
  totalItems: null,
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
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

  deleteFromDB({ state }, payload) {
    return this.$axios.$delete(`${state.module}/${payload}`);
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
  setTotalItems(state, val) {
    state.totalItems = val;
  },
};
