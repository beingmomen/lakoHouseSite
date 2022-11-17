const reset = () => ({
  name: null,
  email: null,
  country: null,
  state: null,
  city: null,
  street: null,
  phone: null,
  phoneCode: null,
});

const secret = () => ({
  passwordCurrent: null,
  password: null,
  passwordConfirm: null,
});

export const state = () => ({
  module: "/profile",
  countryIso: null,
  data: {
    name: null,
    email: null,
    country: null,
    state: null,
    city: null,
    street: null,
    phone: null,
    phoneCode: null,
  },
  secret: {
    passwordCurrent: null,
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
  passwordCurrent(state) {
    return state.secret.passwordCurrent;
  },
  password(state) {
    return state.secret.password;
  },
  passwordConfirm(state) {
    return state.secret.passwordConfirm;
  },
};

export const actions = {
  getAllDataFromApi({ commit, dispatch }, payload) {
    commit("name", { key: "name", value: payload.name });
    commit("email", { key: "email", value: payload.email });
    commit("currentCountry", { key: "country", value: payload.country });
    commit("currentState", { key: "state", value: payload.state });
    commit("currentCity", { key: "city", value: payload.city });
    commit("street", { key: "street", value: payload.street });
    commit("phone", { key: "phone", value: payload.phone });
    commit("phoneCode", { key: "phoneCode", value: payload.phoneCode });
  },
  async me({ state, dispatch }, payload) {
    this.$axios.$get("/users/me").then((res) => {
      this.$auth.setUser(res.data.data);
    });
  },
  async updateMe({ state, dispatch, rootState }, payload) {
    let data = await dispatch("handleFormData", payload || state.data, {
      root: true,
    });
    await this.$axios.$patch("/users/updateMe", data);
    await this.$auth.fetchUser();
    await this.$toast.success(
      rootState.dashDir == "ltr" ? "Updated Successfully" : "تم التعديل بنجاح"
    );
  },
  async updatePass({ state, dispatch }, payload) {
    return this.$axios.$patch("/users/updateMyPassword", state.secret);
  },
  resetSecret({ commit, dispatch }, payload) {
    commit("setSecret", secret());
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
  setSecret(state, val) {
    state.secret = val;
  },
  name(state, val) {
    state.data[val.key] = val.value;
  },
  email(state, val) {
    state.data[val.key] = val.value;
  },
  currentCountry(state, val) {
    state.data[val.key] = val.value;
  },
  country(state, val) {
    state.data[val.key] = val.value.name;
    state.data.state = null;
    state.data.city = null;
  },
  currentState(state, val) {
    state.data[val.key] = val.value;
  },
  state(state, val) {
    state.data[val.key] = val.value.name;
    state.data.city = null;
  },
  currentCity(state, val) {
    state.data[val.key] = val.value;
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
    state.data[val.key] = val.value;
  },
  passwordCurrent(state, val) {
    state.secret[val.key] = val.value;
  },
  password(state, val) {
    state.secret[val.key] = val.value;
  },
  passwordConfirm(state, val) {
    state.secret[val.key] = val.value;
  },
};
