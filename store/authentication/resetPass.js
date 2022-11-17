const reset = () => ({
  password: null,
  passwordConfirm: null,
});

export const state = () => ({
  data: {
    password: null,
    passwordConfirm: null,
  },
});

export const getters = {
  password(state) {
    return state.data.password;
  },
  passwordConfirm(state) {
    return state.data.passwordConfirm;
  },
};

export const actions = {
  async submit({ state, dispatch }) {
    const token = this.$router.history.current.params.token;
    this.$axios
      .$patch(`/users/resetPassword/${token}`, state.data)
      .then((res) => {
        this.$toast.success(res.status);
        this.$router.push("/login");
      });
  },
};

export const mutations = {
  password(state, val) {
    state.data[val.key] = val.value;
  },
  passwordConfirm(state, val) {
    state.data[val.key] = val.value;
  },
};
