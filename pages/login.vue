<template>
  <ActionsAuth
    :img="img"
    :welcome="`${$t('login.welcome')} ${this.$config.SITE_TITLE}! 👋`"
    :please="$t('login.please')"
    :first="$t('login.new_platform')"
    :second="$t('login.new_account')"
    :btn="$t('buttons.login')"
    :module="module"
    :forget="true"
    url="/auth/register"
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

      <FormPasswordInput
        :label="$t('inputs.password')"
        storeKey="password"
        :module="module"
        :forget="true"
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
import { MailIcon, LockIcon } from "vue-feather-icons";

export default {
  name: "login",
  layout: "auth",
  data() {
    return {
      module: "authentication/login",
      img: "login-v2.svg",
      btnDisabled: false,
    };
  },
  components: {
    MailIcon,
    LockIcon,
  },
};
</script>
