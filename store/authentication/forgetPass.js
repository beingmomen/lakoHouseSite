const reset = () => ({
  email: null,
});

export const state = () => ({
  data: {
    email: null,
  },
});

export const getters = {
  email(state) {
    return state.data.email;
  },
};

export const actions = {
  async submit({ state, dispatch }) {
    this.$axios
      .$post("/users/forgotPassword", { email: state.data.email })
      .then((res) => {
        this.$toast.success(res.message);
      });
  },
};

export const mutations = {
  email(state, val) {
    state.data[val.key] = val.value;
  },
};
