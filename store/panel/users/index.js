export const state = () => ({
  module: "/users",
  allData: [],
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
};

export const actions = {
  getAllDataFromApi({ commit, state }, payload) {
    commit("setAllData", payload);
  },

  getDataByQuery({ state, commit }, payload) {
    this.$axios
      .$get(state.module, {
        params: {
          role: "user",
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

  deleteFromDB({ dispatch }, payload) {
    return this.$axios.$delete(`/users/${payload}`);
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
};
