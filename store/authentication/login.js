const reset = () => ({
  email: null,
  password: null,
});

export const state = () => ({
  data: {
    email: "momenmohamed2014@yahoo.com",
    password: "password",
  },
});

export const getters = {
  email(state) {
    return state.data.email;
  },
  password(state) {
    return state.data.password;
  },
};

export const actions = {
  async submit({ state, dispatch }) {
    let res = await this.$auth.loginWith("local", {
      data: state.data,
    });

    let position = this.$i18n.locale == "en" ? "top-right" : "top-left";
    let welcome = this.$i18n.locale == "en" ? "Welcome" : "مرحبا بك ";

    this.$toast(`${welcome} ${this.$auth.user.name}`, {
      timeout: 3000,
      hideProgressBar: false,
      position,
      // icon: CoffeeIcon,
      closeOnClick: false,
      showCloseButtonOnHover: true,
    });
  },
};

export const mutations = {
  email(state, val) {
    state.data[val.key] = val.value;
  },
  password(state, val) {
    state.data[val.key] = val.value;
  },
};
