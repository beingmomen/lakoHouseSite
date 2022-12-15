<template>
  <ValidationObserver ref="formMsg">
    <b-form
      class="msg-online-style"
      :class="{ 'list-view product-checkout': $auth.loggedIn }"
    >
      <!-- Left Form -->
      <b-card no-body class="text-start">
        <b-card-header class="flex-column align-items-start">
          <b-card-title>{{ $t("cards.addNewAddress") }}</b-card-title>
        </b-card-header>
        <b-card-body>
          <b-row>
            <FormInputIcon
              :label="$t('inputs.name')"
              storeKey="name"
              :module="module"
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
              :placeHolder="$t('inputs.select')"
              :change="true"
              :notId="true"
              :module="module"
            >
              <template #icon>
                <font-awesome-icon
                  icon="fa-solid fa-globe"
                  class="fa-lg"
                  style="width: 21px"
                />
              </template>
            </FormSelect>

            <FormSelect
              :label="$t('inputs.city')"
              labelSelect="name"
              storeKey="city"
              listKey="shippingPriceList"
              global
              :notId="true"
              :placeHolder="$t('inputs.select')"
              :module="module"
            >
              <template #icon>
                <font-awesome-icon
                  icon="fa-solid fa-city"
                  class="fa-lg"
                  style="width: 21px"
                />
              </template>
            </FormSelect>

            <!-- <FormSelect
              :label="$t('inputs.state')"
              labelSelect="name"
              storeKey="state"
              listKey="statesByCountryList"
              global
              :placeHolder="$t('inputs.select')"
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
              :placeHolder="$t('inputs.select')"
              :notId="true"
              :module="module"
            >
              <template #icon>
                <font-awesome-icon
                  icon="fa-solid fa-city"
                  class="fa-lg"
                  style="width: 21px"
                />
              </template>
            </FormSelect> -->

            <FormInputIcon
              :label="$t('inputs.street')"
              storeKey="street"
              :module="module"
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
              :phoneCode="true"
              :module="module"
            >
              <template #icon>
                <phone-icon size="1.5x" class="custom-class"></phone-icon>
              </template>
              <template #phoneCode> </template>
            </FormInputIcon>

            <b-col cols="12" class="text-end">
              <b-button type="reset" variant="outline-secondary">
                {{ $t("buttons.reset") }}
              </b-button>
              <b-button
                type="submit"
                variant="primary"
                class="ms-1"
                @click.prevent="sendMsg"
              >
                {{ $t("buttons.saveAndDeliverHere") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>

      <!-- Right Col -->
      <div class="customer-card text-start" v-if="$auth.loggedIn">
        <b-card :title="$auth.user.name">
          <b-card-text>
            {{ $auth.user.email }}
          </b-card-text>
          <b-card-text class="mb-0">
            {{ $auth.user.country }}
          </b-card-text>
          <b-card-text>
            {{ $auth.user.state }}, {{ $auth.user.city }}
          </b-card-text>
          <b-card-text>{{ $auth.user.street }}</b-card-text>
          <b-card-text>
            ( {{ $auth.user.phoneCode }} ) {{ $auth.user.phone }}
          </b-card-text>
          <b-button variant="primary" block @click="saveMainAddressOrderInDB">
            {{ $t("buttons.deliverHere") }}
          </b-button>
        </b-card>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { UserIcon, MailIcon, FlagIcon, PhoneIcon } from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  methods: {
    sendMsg() {
      this.$store.dispatch(`${this.module}/saveOrderInDB`);
    },
    saveMainAddressOrderInDB() {
      this.$store.dispatch(
        `${this.module}/saveMainAddressOrderInDB`,
        this.$auth.user
      );
    },
  },
  components: {
    UserIcon,
    MailIcon,
    FlagIcon,
    PhoneIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
