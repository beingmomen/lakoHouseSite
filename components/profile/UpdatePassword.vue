<template>
  <b-card class="text-start card-style" :title="$t(`cards.updatePass`)">
    <b-form class="vh-50" @submit.prevent="$emit('updatePass')">
      <b-row>
        <FormPasswordInput
          :label="$t('inputs.passwordCurrent')"
          storeKey="passwordCurrent"
          :module="module"
          lg="4"
          md="12"
        >
          <template #icon>
            <lock-icon size="1.5x" class="custom-class"></lock-icon>
          </template>
        </FormPasswordInput>

        <FormPasswordInput
          :label="$t('inputs.password')"
          storeKey="password"
          :module="module"
          lg="4"
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
          lg="4"
          md="12"
        >
          <template #icon>
            <lock-icon size="1.5x" class="custom-class"></lock-icon>
          </template>
        </FormPasswordInput>

        <b-col cols="12" class="text-end">
          <b-button type="reset" variant="outline-secondary" class="fs-5">
            {{ $t("buttons.reset") }}
          </b-button>
          <b-button type="submit" variant="primary" class="ms-1 fs-5">
            {{ $t("buttons.update") }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import { LockIcon } from "vue-feather-icons";
export default {
  props: {
    module: String,
  },
  components: {
    LockIcon,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
