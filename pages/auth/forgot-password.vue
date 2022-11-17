<template>
  <ActionsAuth
    :img="img"
    :welcome="$t('forgetPass.welcome')"
    :please="$t('forgetPass.please')"
    :second="$t('forgetPass.back')"
    :btn="$t('buttons.forgetPass')"
    :module="module"
    url="/login"
  >
    <template #auth>
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
    </template>
  </ActionsAuth>
</template>

<script>
import { MailIcon } from "vue-feather-icons";
export default {
  name: "forgot-password",
  layout: "auth",
  data() {
    return {
      module: "authentication/forgetPass",
      img: "forgot-password-v2-dark.svg",
      btnDisabled: false,
    };
  },
  components: {
    MailIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
