const reset = () => ({
  name: null,
  email: null,
  country: null,
  state: null,
  city: null,
  street: null,
  phone: null,
  phoneCode: "000",
  password: null,
  passwordConfirm: null,
});

export const state = () => ({
  module: "/activities",
  countryIso: null,
  data: {
    name: null,
    email: null,
    country: null,
    state: null,
    city: null,
    street: null,
    phone: null,
    phoneCode: "000",
    password: null,
    passwordConfirm: null,
  },
});

export const getters = {
  name(state) {
    return state.data.name;
  },
  email(state) {
    return state.data.email;
  },
  country(state) {
    return state.data.country;
  },
  state(state) {
    return state.data.state;
  },
  city(state) {
    return state.data.city;
  },
  street(state) {
    return state.data.street;
  },
  phone(state) {
    return state.data.phone;
  },
  phoneCode(state) {
    return state.data.phoneCode;
  },
  password(state) {
    return state.data.password;
  },
  passwordConfirm(state) {
    return state.data.passwordConfirm;
  },
};

export const actions = {
  async submit({ state, dispatch }) {
    this.$axios.$post("/users/signup", state.data).then((res) => {
      if (res.status == "success") {
        this.$toast.success(this.$t("msg.accessLogin"));
        this.$router.push("/login");
      }
    });
  },
  async countryChange({ dispatch, commit, state }, payload) {
    this.$axios
      .$get(
        `https://api.countrystatecity.in/v1/countries/${payload.iso2}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
          },
        }
      )
      .then((res) => {
        dispatch("global/updateStatesByCountryList", res, { root: true });
        commit("countryIso", payload.iso2);
        return payload.iso2;
      })
      .then((data) => {
        this.$axios
          .$get(`https://api.countrystatecity.in/v1/countries/${data}`, {
            headers: {
              "X-CSCAPI-KEY":
                "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
            },
          })
          .then((res) => {
            commit("phoneCode", { key: "phoneCode", value: res.phonecode });
          });
      });
  },
  async stateChange({ dispatch, commit, state }, payload) {
    this.$axios
      .$get(
        `https://api.countrystatecity.in/v1/countries/${state.countryIso}/states/${payload.iso2}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
          },
        }
      )
      .then((res) => {
        dispatch("global/updateCitiesByStatesList", res, { root: true });
      });
  },
};

export const mutations = {
  countryIso(state, val) {
    state.countryIso = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  email(state, val) {
    state.data[val.key] = val.value;
  },
  country(state, val) {
    state.data[val.key] = val.value.name;
    state.data.state = null;
    state.data.city = null;
  },
  state(state, val) {
    state.data[val.key] = val.value.name;
    state.data.city = null;
  },
  city(state, val) {
    state.data[val.key] = val.value.name;
  },
  street(state, val) {
    state.data[val.key] = val.value;
  },
  phone(state, val) {
    state.data[val.key] = val.value;
  },
  phoneCode(state, val) {
    state.data.phoneCode = `${val.value}`;
  },
  password(state, val) {
    state.data[val.key] = val.value;
  },
  passwordConfirm(state, val) {
    state.data[val.key] = val.value;
  },
};
