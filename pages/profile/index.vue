<template>
  <div class="landing-page">
    <div class="container">
      <!-- Alert: No item found -->
      <b-alert variant="danger" :show="userData === undefined">
        <h4 class="alert-heading">Error fetching user data</h4>
        <div class="alert-body">
          No user found with this user id. Check
          <b-link class="alert-link" :to="{ name: 'apps-users-list' }">
            User List
          </b-link>
          for other users.
        </div>
      </b-alert>

      <template v-if="userData">
        <!-- First Row -->
        <b-row>
          <b-col cols="12">
            <ProfileInfo :module="module" />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <ProfileUpdateInfo :module="module" @updateMe="updateMe" />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12">
            <ProfileUpdatePassword :module="module" @updatePass="updatePass" />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" lg="6">
            <!-- <PanelProfileTimeLine /> -->
          </b-col>
        </b-row>

        <!-- <PanelProfileTable /> -->
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  async asyncData({ $axios, store, $toast, $auth }) {
    store.dispatch("profile/getAllDataFromApi", $auth.user);
    return {};
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
  data() {
    return {
      userData: true,
      module: "profile",
    };
  },
  methods: {
    updateMe() {
      this.$store.dispatch(`${this.module}/updateMe`).then(() => {});
    },
    updatePass() {
      this.$store.dispatch(`${this.module}/updatePass`).then(() => {
        this.$nuxt.refresh();
        this.$toast.success(this.$t("msg.edit"));
        this.$store.dispatch(`${this.module}/resetSecret`);
        this.$auth.logout();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
