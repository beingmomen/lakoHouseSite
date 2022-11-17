<template>
  <ActionsAuth
    :img="img"
    :welcome="$t('register.welcome')"
    :please="$t('register.please')"
    :first="$t('register.already')"
    :second="$t('register.signIn')"
    :btn="$t('buttons.signUp')"
    :module="module"
    url="/login"
  >
    <template #auth>
      <FormInputIcon
        :label="$t('inputs.name')"
        storeKey="name"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <user-icon size="1.5x" class="custom-class"></user-icon>
        </template>
      </FormInputIcon>

      <FormInputIcon
        :label="$t('inputs.email')"
        storeKey="email"
        type="email"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <mail-icon size="1.5x" class="custom-class"></mail-icon>
        </template>
      </FormInputIcon>

      <FormSelect
        :label="$t('inputs.country')"
        labelSelect="name"
        storeKey="country"
        listKey="countriesList"
        global
        lg="12"
        md="12"
        :change="true"
        :notId="true"
        :module="module"
      >
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-globe" />
        </template>
      </FormSelect>

      <FormSelect
        :label="$t('inputs.state')"
        labelSelect="name"
        storeKey="state"
        listKey="statesByCountryList"
        global
        lg="12"
        md="12"
        :change="true"
        :notId="true"
        :module="module"
      >
        <template #icon>
          <flag-icon size="1.5x" class="custom-class"></flag-icon>
        </template>
      </FormSelect>

      <FormSelect
        :label="$t('inputs.city')"
        labelSelect="name"
        storeKey="city"
        listKey="citiesByStatesList"
        global
        lg="12"
        md="12"
        :notId="true"
        :module="module"
      >
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-city" />
        </template>
      </FormSelect>

      <FormInputIcon
        :label="$t('inputs.street')"
        storeKey="street"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <font-awesome-icon
            icon="fa-solid fa-location-dot"
            class="fa-lg"
            style="width: 21px"
          />
        </template>
      </FormInputIcon>

      <FormInputIcon
        :label="$t('inputs.phone')"
        storeKey="phone"
        type="tel"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <phone-icon size="1.5x" class="custom-class"></phone-icon>
        </template>
        <template #phoneCode>
          <span style="margin-inline-start: 10px">{{ `${getPhoneCode}` }}</span>
        </template>
      </FormInputIcon>

      <FormPasswordInput
        :label="$t('inputs.password')"
        storeKey="password"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <lock-icon size="1.5x" class="custom-class"></lock-icon>
        </template>
      </FormPasswordInput>

      <FormPasswordInput
        :label="$t('inputs.passwordConfirm')"
        storeKey="passwordConfirm"
        :module="module"
        lg="12"
        md="12"
      >
        <template #icon>
          <lock-icon size="1.5x" class="custom-class"></lock-icon>
        </template>
      </FormPasswordInput>
    </template>
  </ActionsAuth>
</template>

<script>
import {
  UserIcon,
  MailIcon,
  FlagIcon,
  PhoneIcon,
  LockIcon,
} from "vue-feather-icons";
export default {
  name: "register",
  layout: "auth",
  // async asyncData({ $axios, store, $toast }) {
  //   await $axios
  //     .$get(`https://api.countrystatecity.in/v1/countries`, {
  //       headers: {
  //         "X-CSCAPI-KEY":
  //           "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
  //       },
  //     })
  //     .then((res) => {
  //       store.dispatch("global/updateCountriesList", res);
  //     });
  //   return {};
  // },
  data() {
    return {
      module: "authentication/register",
      img: "register-v2-dark.svg",
      btnDisabled: false,
    };
  },
  computed: {
    getPhoneCode() {
      return this.$store.getters[`${this.module}/phoneCode`];
    },
  },
  async mounted() {
    await this.$axios
      .$get(`https://api.countrystatecity.in/v1/countries`, {
        headers: {
          "X-CSCAPI-KEY":
            "OWU4b3JhZXF2bzJUNnZDbFc0TzFXZEphNVlqdEpLR0Z3dnR1bk9sVg==",
        },
      })
      .then((res) => {
        this.$store.dispatch("global/updateCountriesList", res);
      });
  },
  components: {
    UserIcon,
    MailIcon,
    FlagIcon,
    PhoneIcon,
    LockIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
