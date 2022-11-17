export const state = () => ({
  categories: [],
  topProducts: [],
});

export const getters = {
  getCategories(state) {
    return state.categories;
  },
  getTopProducts(state) {
    return state.topProducts;
  },
};

export const actions = {
  getAllCategories({ dispatch, commit, state }, payload) {
    commit("setCategories", payload);
  },
  getTopProducts({ dispatch, commit, state }, payload) {
    commit("setTopProducts", payload);
  },
};

export const mutations = {
  setCategories(state, val) {
    state.categories = val;
  },
  setTopProducts(state, val) {
    state.topProducts = val;
  },
};
