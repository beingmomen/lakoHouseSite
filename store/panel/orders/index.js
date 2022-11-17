export const state = () => ({
  module: "/orders",
  allData: [],
  totalItems: null,
  singleOrder: null,
  selectStatus: null,
  orderId: null,
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  getTotalItems(state) {
    return state.totalItems;
  },
  singleOrder(state) {
    return state.singleOrder;
  },
  selectStatus(state) {
    return state.selectStatus;
  },
};

export const actions = {
  getAllDataFromApi({ commit }, payload) {
    commit("setAllData", payload.data.data);
    commit("setTotalItems", payload.total);
  },

  getDataByQuery({ state, commit }, payload) {
    console.warn("payload", payload);
    this.$axios
      .$get(state.module, {
        params: {
          page: payload.page,
          search: payload.search,
          status: payload.status,
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
    await commit("singleOrder", payload);
  },

  changeStatus({ state }, payload) {
    return this.$axios.$patch(`${state.module}/${state.orderId}`, {
      status: state.selectStatus,
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
  singleOrder(state, val) {
    state.singleOrder = val;
  },
  selectStatus(state, val) {
    state[val.key] = val.value;
  },
  orderId(state, val) {
    state.orderId = val;
  },
};
