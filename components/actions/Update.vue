<template>
  <b-card-code
    class="text-capitalize"
    :title="$t('cards.update') + ' ' + title"
  >
    <b-form class="vh-50" @submit.prevent="updateDataInDB">
      <b-row>
        <slot name="update"></slot>
        <!-- reset and submit -->
        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary">
            {{ $t("buttons.reset") }}
          </b-button>
          <b-button type="submit" variant="primary" class="mr-1">
            {{ $t("buttons.update") }}
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
    id: String,
  },
  methods: {
    updateDataInDB() {
      this.$store
        .dispatch(`${this.module}/updateDataInDB`, this.id)
        .then(() => {
          this.$toast.success(this.$t("msg.edit"));
          this.$store.dispatch(`${this.module}/resetData`);
          this.$router.push(this.localePath("/" + this.module));
        });
    },
  },
  components: {
    BCardCode,
  },
};
</script>
