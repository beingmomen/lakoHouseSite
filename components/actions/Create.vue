<template>
  <b-card-code
    class="text-capitalize"
    :title="$t('cards.create') + ' ' + title"
  >
    <b-form class="vh-50" @submit.prevent="addDataToDB">
      <b-row>
        <slot name="create"></slot>
        <!-- reset and submit -->
        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary">
            {{ $t("buttons.reset") }}
          </b-button>
          <b-button type="submit" variant="primary" class="mr-1">
            {{ $t("buttons.create") }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card-code>
</template>

<script>
import BCardCode from "~/@core/components/b-card-code/BCardCode.vue";
export default {
  props: {
    title: String,
    module: String,
  },
  methods: {
    addDataToDB() {
      this.$store.dispatch(`${this.module}/addDataToDB`).then(() => {
        this.$toast.success(this.$t("msg.add"));
        this.$router.push(this.$route.path.replace("/create", ""));
        this.$store.dispatch(`${this.module}/resetData`);
      });
    },
  },
  components: {
    BCardCode,
  },
};
</script>
