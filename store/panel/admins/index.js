const reset = () => ({
  name: null,
  email: null,
  password: null,
  passwordConfirm: null,
});

export const state = () => ({
  module: "/users",
  allData: [],
  data: {
    name: null,
    email: null,
    password: null,
    passwordConfirm: null,
    role: "admin",
  },
});

export const getters = {
  getAllData(state) {
    return state.allData;
  },
  name(state) {
    return state.data.name;
  },
  email(state) {
    return state.data.email;
  },
  password(state) {
    return state.data.password;
  },
  passwordConfirm(state) {
    return state.data.passwordConfirm;
  },
};

export const actions = {
  getAllDataFromApi({ commit, state }, payload) {
    let filter = payload.filter((x) => x.email != "admin@softmagic.com");
    commit("setAllData", filter);
  },

  getDataByQuery({ state, commit }, payload) {
    this.$axios
      .$get(state.module, {
        params: {
          role: "admin",
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
    commit("email", { key: "email", value: payload.email });
    commit("password", { key: "password", value: payload.password });
    commit("passwordConfirm", {
      key: "passwordConfirm",
      value: payload.passwordConfirm,
    });
  },

  async addDataToDB({ state }) {
    return this.$axios.$post(`${state.module}/admin`, state.data);
  },

  async updateDataInDB({ state, dispatch }, payload) {
    return this.$axios.$patch(`${state.module}/${payload}`, state.data);
  },

  deleteFromDB({ dispatch }, payload) {
    return this.$axios.$delete(`/users/${payload}`);
  },

  resetData({ commit }, payload) {
    commit("setData", reset());
  },
};

export const mutations = {
  setAllData(state, val) {
    state.allData = val;
  },
  setData(state, val) {
    state.data = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  email(state, val) {
    state.data[val.key] = val.value;
  },
  password(state, val) {
    state.data[val.key] = val.value;
  },
  passwordConfirm(state, val) {
    state.data[val.key] = val.value;
  },
};
